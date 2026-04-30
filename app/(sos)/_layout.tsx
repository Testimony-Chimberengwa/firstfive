import { Stack } from 'expo-router';

export default function SOSLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="trigger" />
      <Stack.Screen name="type" />
      <Stack.Screen name="waiting" />
    </Stack>
  );
}
