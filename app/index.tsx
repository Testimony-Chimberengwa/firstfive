import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Splash() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white">
      <LinearGradient colors={['#C0392B', '#A93226']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} className="h-64 justify-center items-center">
        <Text className="text-5xl font-bold text-white tracking-tight">FirstFive</Text>
        <Text className="text-lg text-white mt-2">Help in the first five minutes</Text>
      </LinearGradient>

      <View className="px-6 py-8">
        {/* Stats Row */}
        <View className="flex-row justify-between gap-3 mb-12">
          <View className="flex-1 bg-gray-100 rounded-lg p-4 items-center">
            <Text className="text-2xl font-bold text-red-600">4 min</Text>
            <Text className="text-xs text-gray-600 mt-1">avg EMS</Text>
          </View>
          <View className="flex-1 bg-gray-100 rounded-lg p-4 items-center">
            <Text className="text-2xl font-bold text-green-600">500m</Text>
            <Text className="text-xs text-gray-600 mt-1">radius</Text>
          </View>
          <View className="flex-1 bg-gray-100 rounded-lg p-4 items-center">
            <Text className="text-2xl font-bold text-blue-600">60 sec</Text>
            <Text className="text-xs text-gray-600 mt-1">target</Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <TouchableOpacity
          onPress={() => router.push('/(sos)/trigger')}
          className="bg-red-600 py-4 px-6 rounded-xl mb-4 items-center"
        >
          <Text className="text-white text-lg font-bold">🚨 Trigger Emergency Alert</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/register')}
          className="border-2 border-gray-800 py-4 px-6 rounded-xl items-center mb-4"
        >
          <Text className="text-gray-800 text-lg font-semibold">Register as Responder</Text>
        </TouchableOpacity>

        {/* Auth Link */}
        <TouchableOpacity onPress={() => router.push('/auth/login')} className="py-2">
          <Text className="text-center text-blue-600 text-sm font-semibold">Already registered? Sign in</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="mt-16 pt-6 border-t border-gray-200">
          <Text className="text-center text-xs text-gray-600">In a medical emergency, always call 999 / 112 in Zimbabwe first</Text>
        </View>
      </View>
    </ScrollView>
  );
}
