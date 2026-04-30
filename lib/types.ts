export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  city?: string;
  country?: string;
  avatar_url?: string;
  is_responder: boolean;
  responder_status: 'active' | 'off_duty';
  skills: string[];
  credential_url?: string;
  push_token?: string;
  response_count: number;
  created_at: string;
}

export interface Incident {
  id: string;
  triggered_by: string;
  type: 'cardiac_arrest' | 'epipen' | 'narcan' | 'aed' | 'general';
  is_bystander: boolean;
  victim_description?: string;
  location: {
    lat: number;
    lng: number;
  };
  address_text?: string;
  status: 'active' | 'responding' | 'resolved' | 'cancelled';
  responder_count_alerted: number;
  responder_count_accepted: number;
  ems_called: boolean;
  resolved_at?: string;
  outcome?: 'responsive' | 'unresponsive' | 'ems_took_over' | 'false_alarm';
  created_at: string;
}

export interface IncidentResponder {
  id: string;
  incident_id: string;
  responder_id: string;
  status: 'alerted' | 'accepted' | 'declined' | 'arrived' | 'completed';
  alerted_at: string;
  accepted_at?: string;
  arrived_at?: string;
  distance_at_alert?: number;
}

export interface Message {
  id: string;
  incident_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}
