import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Harare',
    country: 'Zimbabwe',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from('users').insert([
          {
            id: data.user.id,
            email: formData.email,
            full_name: formData.fullName,
            phone: formData.phone,
            city: formData.city,
            country: formData.country,
            is_responder: false,
          },
        ]);

        router.push('/auth/skills');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-4xl font-bold text-gray-900 mb-2">Create Account</Text>
        <Text className="text-gray-600 mb-8">Register to respond to emergencies</Text>

        {error && (
          <View className="bg-red-100 border border-red-400 rounded-lg p-3 mb-6">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        )}

        <TextInput
          placeholder="Full Name *"
          value={formData.fullName}
          onChangeText={(val) => setFormData({ ...formData, fullName: val })}
          className="border border-gray-300 rounded-lg p-4 mb-4"
          editable={!loading}
        />

        <TextInput
          placeholder="Email *"
          value={formData.email}
          onChangeText={(val) => setFormData({ ...formData, email: val })}
          keyboardType="email-address"
          className="border border-gray-300 rounded-lg p-4 mb-4"
          editable={!loading}
        />

        <TextInput
          placeholder="Phone"
          value={formData.phone}
          onChangeText={(val) => setFormData({ ...formData, phone: val })}
          className="border border-gray-300 rounded-lg p-4 mb-4"
          editable={!loading}
        />

        <TextInput
          placeholder="Password *"
          value={formData.password}
          onChangeText={(val) => setFormData({ ...formData, password: val })}
          secureTextEntry
          className="border border-gray-300 rounded-lg p-4 mb-8"
          editable={!loading}
        />

        <TouchableOpacity onPress={handleRegister} disabled={loading} className="bg-red-600 py-4 rounded-lg items-center mb-4">
          <Text className="text-white font-bold text-lg">{loading ? 'Creating...' : 'Continue →'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-center text-blue-600 font-semibold">Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
