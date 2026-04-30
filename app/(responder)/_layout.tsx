import { Stack } from 'expo-router';

export default function ResponderLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="alert" />
      <Stack.Screen name="map" />
      <Stack.Screen name="onscene" />
    </Stack>
  );
}
