import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/lib/store';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({});
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: '',
          is_responder: false,
          responder_status: 'off_duty',
          skills: [],
          response_count: 0,
          created_at: new Date().toISOString(),
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(sos)" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="(responder)" />
      <Stack.Screen name="(tabs)" options={{ animationEnabled: false }} />
      <Stack.Screen name="(shared)" />
    </Stack>
  );
}
