import { View, Text } from 'react-native';
import { useSearchParams } from 'expo-router';

export default function Guidance() {
  const { type } = useSearchParams();

  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      <Text className="text-xl font-bold mb-4">📖 First Aid Guide</Text>
      <Text className="text-gray-600">{type} emergency</Text>
    </View>
  );
}
