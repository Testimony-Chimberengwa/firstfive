import { View, Text } from 'react-native';

export default function Impact() {
  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-4">Impact Dashboard</Text>
      <View className="bg-red-50 p-4 rounded-lg mb-4">
        <Text className="text-red-600 font-bold text-2xl">0 alerts sent</Text>
        <Text className="text-gray-600">Since launch</Text>
      </View>
    </View>
  );
}
