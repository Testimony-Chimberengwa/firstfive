import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Text className="text-3xl font-bold mb-4">FirstFive Home</Text>
      <TouchableOpacity onPress={() => router.push('/(sos)/trigger')} className="bg-red-600 px-6 py-4 rounded-lg">
        <Text className="text-white font-bold">🚨 Trigger Emergency</Text>
      </TouchableOpacity>
    </View>
  );
}
