import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface SOSPayload {
  type: 'cardiac_arrest' | 'epipen' | 'narcan' | 'aed' | 'general';
  lat: number;
  lng: number;
  victim_description?: string;
  is_bystander: boolean;
  user_id?: string;
}

interface RespondersResult {
  id: string;
  push_token: string;
  full_name: string;
  distance_m: number;
  skills: string[];
}

serve(async (req: Request) => {
  // Only POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload: SOSPayload = await req.json();

    // Validate required fields
    if (!payload.type || payload.lat === undefined || payload.lng === undefined) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: type, lat, lng' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[SOS] Emergency triggered: ${payload.type} at (${payload.lat}, ${payload.lng})`);

    // Step 1: Create incident in database
    const { data: incident, error: incidentError } = await supabase
      .from('incidents')
      .insert([
        {
          triggered_by: payload.user_id || null,
          type: payload.type,
          is_bystander: payload.is_bystander,
          victim_description: payload.victim_description,
          location: `POINT(${payload.lng} ${payload.lat})`,
          address_text: 'Pending reverse geocoding',
          status: 'active',
          ems_called: false,
        },
      ])
      .select('id')
      .single();

    if (incidentError || !incident) {
      console.error('[SOS] Failed to create incident:', incidentError);
      return new Response(
        JSON.stringify({ error: 'Failed to create incident', details: incidentError }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[SOS] Incident created: ${incident.id}`);

    // Step 2: Query responders within 500m radius using PostGIS
    const { data: responders, error: responderError } = await supabase.rpc(
      'get_nearby_responders',
      {
        lat: payload.lat,
        lng: payload.lng,
        radius_m: 500,
        skill_needed: payload.type === 'cardiac_arrest' || payload.type === 'aed' ? 'cpr' : payload.type === 'epipen' ? 'epipen' : 'narcan',
      }
    ) as { data: RespondersResult[]; error: any };

    if (responderError) {
      console.error('[SOS] Failed to query responders:', responderError);
      // Continue anyway - create alert records manually
    }

    const responderList = responders || [];
    console.log(`[SOS] Found ${responderList.length} responders within 500m`);

    // Step 3: Create incident_responder records for each matched responder
    if (responderList.length > 0) {
      const incidentResponders = responderList.map((r) => ({
        incident_id: incident.id,
        responder_id: r.id,
        status: 'alerted',
        distance_at_alert: r.distance_m,
      }));

      const { error: alertError } = await supabase
        .from('incident_responders')
        .insert(incidentResponders);

      if (alertError) {
        console.error('[SOS] Failed to create responder alerts:', alertError);
      }
    }

    // Step 4: Dispatch push notifications
    // (In a production environment, integrate with Expo Push Notifications API)
    // For hackathon: Log for now, implement real push later
    console.log(`[SOS] Push notifications would be sent to ${responderList.length} responders`);

    // Step 5: Return success response
    return new Response(
      JSON.stringify({
        success: true,
        incident_id: incident.id,
        responders_alerted: responderList.length,
        responders: responderList.map((r) => ({
          id: r.id,
          name: r.full_name,
          distance_m: r.distance_m,
        })),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[SOS] Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
