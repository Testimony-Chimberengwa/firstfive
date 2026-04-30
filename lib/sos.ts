import * as Location from 'expo-location';
import { supabase } from './supabase';
import { useStore } from './store';

export async function sendSOS(sosData: {
  type: 'cardiac_arrest' | 'epipen' | 'narcan' | 'aed' | 'general';
  description?: string;
  is_bystander: boolean;
}) {
  try {
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    const { latitude, longitude } = location.coords;

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create incident
    const { data: incident, error: incidentError } = await supabase
      .from('incidents')
      .insert([
        {
          triggered_by: user?.id || null,
          type: sosData.type,
          is_bystander: sosData.is_bystander,
          victim_description: sosData.description,
          location: `POINT(${longitude} ${latitude})`,
          status: 'active',
          ems_called: false,
        },
      ])
      .select('id')
      .single();

    if (incidentError || !incident) {
      throw new Error(incidentError?.message || 'Failed to create incident');
    }

    // Call Edge Function to find nearby responders and send alerts
    const { data: sosResult, error: sosError } = await supabase.functions.invoke('trigger-sos', {
      body: {
        incident_id: incident.id,
        type: sosData.type,
        lat: latitude,
        lng: longitude,
        description: sosData.description,
        is_bystander: sosData.is_bystander,
      },
    });

    if (sosError) {
      throw new Error(sosError.message || 'Failed to trigger SOS');
    }

    // Update store with current incident
    useStore.setState({ currentIncident: incident });

    return {
      incident_id: incident.id,
      responders_alerted: sosResult?.responders_alerted || 0,
    };
  } catch (error: any) {
    console.error('[SOS] Error:', error);
    throw error;
  }
}
