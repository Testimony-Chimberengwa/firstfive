import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/lib/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          full_name: '',
          is_responder: false,
          responder_status: 'off_duty',
          skills: [],
          response_count: 0,
          created_at: new Date().toISOString(),
        });
        router.replace('/(tabs)/home');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-12">
        <Text className="text-4xl font-bold text-gray-900 mb-2">Sign In</Text>
        <Text className="text-gray-600 mb-8">Welcome back to FirstFive</Text>

        {error && (
          <View className="bg-red-100 border border-red-400 rounded-lg p-3 mb-6">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        )}

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border border-gray-300 rounded-lg p-4 mb-4"
          keyboardType="email-address"
          editable={!loading}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-lg p-4 mb-8"
          editable={!loading}
        />

        <TouchableOpacity onPress={handleLogin} disabled={loading} className="bg-red-600 py-4 rounded-lg items-center mb-4">
          <Text className="text-white font-bold text-lg">{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text className="text-center text-blue-600 font-semibold">Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
