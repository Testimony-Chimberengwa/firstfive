-- Helper function for nearby responders radius query
-- Called by the trigger-sos Edge Function
create or replace function get_nearby_responders(
  lat double precision,
  lng double precision,
  radius_m int default 500,
  skill_needed text default 'cpr'
)
returns table (
  id uuid,
  full_name text,
  push_token text,
  distance_m float,
  skills text[]
) as $$
begin
  return query
  select 
    u.id,
    u.full_name,
    u.push_token,
    round(st_distance(u.location::geography, st_makepoint(lng, lat)::geography)::numeric, 2)::float as distance_m,
    u.skills
  from public.users u
  where 
    u.is_responder = true
    and u.responder_status = 'active'
    and u.push_token is not null
    and u.skills && array[skill_needed]
    and st_dwithin(u.location::geography, st_makepoint(lng, lat)::geography, radius_m)
  order by distance_m asc;
end;
$$ language plpgsql security definer;

-- Grant execution to anon user so Edge Function can call it
grant execute on function get_nearby_responders to anon, authenticated;
