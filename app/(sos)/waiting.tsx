import { View, Text, TouchableOpacity, Linking, Animated } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { GUIDANCE } from '@/lib/guidance';

export default function Waiting() {
  const { id } = useSearchParams();
  const router = useRouter();
  const [incident, setIncident] = useState<any>(null);
  const [responderCount, setResponderCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    // Subscribe to incident updates
    const channel = supabase
      .channel(`incident:${id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents', filter: `id=eq.${id}` }, (payload) => {
        setIncident(payload.new);
        setResponderCount(payload.new.responder_count_alerted || 0);
        setAcceptedCount(payload.new.responder_count_accepted || 0);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const guideSteps = incident ? GUIDANCE[incident.type] || [] : [];

  return (
    <View className="flex-1 bg-white p-6 pt-16">
      {/* Animated circles */}
      <View className="items-center mb-8">
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 2,
            borderColor: '#C0392B',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text className="text-4xl">📍</Text>
        </Animated.View>
      </View>

      {/* Responder stats */}
      <View className="bg-gray-100 rounded-lg p-4 mb-4">
        <Text className="text-2xl font-bold text-red-600">{responderCount} responders alerted</Text>
        <Text className="text-lg text-green-600 font-semibold">{acceptedCount} on their way</Text>
      </View>

      {/* Call 999 banner */}
      <TouchableOpacity onPress={() => Linking.openURL('tel:999')} className="bg-red-600 p-4 rounded-lg mb-4 flex-row justify-between items-center">
        <Text className="text-white font-bold">Have you called 999 / 112?</Text>
        <TouchableOpacity className="bg-white px-4 py-2 rounded-lg">
          <Text className="text-red-600 font-bold">Call</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* First aid guide preview */}
      {guideSteps.length > 0 && (
        <View className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <Text className="font-bold text-gray-900 mb-2">{guideSteps[0].title}</Text>
          <Text className="text-gray-700 mb-2">{guideSteps[0].instruction}</Text>
          <TouchableOpacity className="bg-blue-600 py-2 rounded items-center">
            <Text className="text-white font-semibold">View Full Guide</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Chat button */}
      <TouchableOpacity className="bg-gray-200 py-3 rounded-lg items-center mb-4">
        <Text className="font-bold text-gray-900">💬 Chat with Responders</Text>
      </TouchableOpacity>

      <Text className="text-center text-xs text-gray-600 mt-auto">Responders are en route. Stay calm.</Text>
    </View>
  );
}
