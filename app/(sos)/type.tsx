import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { sendSOS } from '@/lib/sos';

const EMERGENCY_TYPES = [
  { id: 'cardiac_arrest', label: 'Cardiac Arrest', emoji: '❤️', color: 'bg-red-50', borderColor: 'border-red-600' },
  { id: 'epipen', label: 'Severe Allergy', emoji: '💉', color: 'bg-orange-50', borderColor: 'border-orange-600' },
  { id: 'narcan', label: 'Opioid Overdose', emoji: '💊', color: 'bg-blue-50', borderColor: 'border-blue-600' },
  { id: 'aed', label: 'AED Needed', emoji: '⚡', color: 'bg-yellow-50', borderColor: 'border-yellow-600' },
  { id: 'general', label: 'General Emergency', emoji: '🚨', color: 'bg-gray-50', borderColor: 'border-gray-600' },
];

export default function EmergencyType() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isBystander, setIsBystander] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendAlert = async () => {
    if (!selectedType) {
      Alert.alert('Please select an emergency type');
      return;
    }

    setLoading(true);
    try {
      const result = await sendSOS({
        type: selectedType as any,
        description: description || undefined,
        is_bystander: isBystander,
      });

      router.push(`/(sos)/waiting?id=${result.incident_id}`);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 py-6">
      <Text className="text-3xl font-bold text-gray-900 mb-2">What kind of emergency?</Text>
      <Text className="text-gray-600 mb-6">Select the type to alert nearby responders</Text>

      <View className="gap-3 mb-6">
        {EMERGENCY_TYPES.map((type) => (
          <Pressable
            key={type.id}
            onPress={() => setSelectedType(type.id)}
            className={`border-2 rounded-2xl p-4 ${selectedType === type.id ? `${type.color} ${type.borderColor}` : 'border-gray-300 bg-white'}`}
          >
            <View className="flex-row items-center">
              <Text className="text-4xl mr-4">{type.emoji}</Text>
              <Text className="font-bold text-lg text-gray-900">{type.label}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Describe person (optional): age, appearance"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        className="border border-gray-300 rounded-lg p-4 mb-4"
        editable={!loading}
      />

      <View className="flex-row mb-6 gap-2">
        <Pressable onPress={() => setIsBystander(true)} className={`flex-1 py-3 rounded-lg ${isBystander ? 'bg-red-600' : 'bg-gray-200'}`}>
          <Text className={`text-center font-semibold ${isBystander ? 'text-white' : 'text-gray-700'}`}>I am a bystander</Text>
        </Pressable>
        <Pressable onPress={() => setIsBystander(false)} className={`flex-1 py-3 rounded-lg ${!isBystander ? 'bg-red-600' : 'bg-gray-200'}`}>
          <Text className={`text-center font-semibold ${!isBystander ? 'text-white' : 'text-gray-700'}`}>I am the victim</Text>
        </Pressable>
      </View>

      <TouchableOpacity onPress={handleSendAlert} disabled={loading} className="bg-red-600 py-4 rounded-lg items-center">
        <Text className="text-white font-bold text-lg">{loading ? 'Sending...' : '🚨 Send Alert Now'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
