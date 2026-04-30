import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/lib/store';

const SKILLS = [
  { id: 'cpr', label: 'CPR Certified', emoji: '❤️', description: 'Trained in CPR' },
  { id: 'epipen', label: 'Carries EpiPen', emoji: '💉', description: 'Allergy responder' },
  { id: 'narcan', label: 'Carries Narcan', emoji: '💊', description: 'Overdose responder' },
  { id: 'first_aid', label: 'First Aid Trained', emoji: '🏥', description: 'First aid trained' },
  { id: 'medical_pro', label: 'Medical Professional', emoji: '👨‍⚕️', description: 'Doctor/Nurse' },
];

export default function Skills() {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useStore((state) => state.user);

  const toggleSkill = (skillId: string) => {
    setSelected((prev) => (prev.includes(skillId) ? prev.filter((s) => s !== skillId) : [...prev, skillId]));
  };

  const handleComplete = async () => {
    if (!user || selected.length === 0) {
      return;
    }

    setLoading(true);
    try {
      await supabase.from('users').update({ skills: selected, is_responder: true, responder_status: 'active' }).eq('id', user.id);

      router.replace('/(tabs)/home');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-8">
        <Text className="text-4xl font-bold text-gray-900 mb-2">Your Skills</Text>
        <Text className="text-gray-600 mb-8">Select the emergencies you can respond to</Text>

        <View className="gap-3 mb-8">
          {SKILLS.map((skill) => (
            <TouchableOpacity
              key={skill.id}
              onPress={() => toggleSkill(skill.id)}
              className={`border-2 rounded-2xl p-4 ${selected.includes(skill.id) ? 'border-red-600 bg-red-50' : 'border-gray-300 bg-white'}`}
            >
              <View className="flex-row items-start">
                <Text className="text-3xl mr-3">{skill.emoji}</Text>
                <View className="flex-1">
                  <Text className="font-bold text-lg text-gray-900">{skill.label}</Text>
                  <Text className="text-sm text-gray-600">{skill.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={handleComplete} disabled={loading || selected.length === 0} className="bg-red-600 py-4 rounded-lg items-center">
          <Text className="text-white font-bold text-lg">{loading ? 'Completing...' : 'Complete Registration'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
