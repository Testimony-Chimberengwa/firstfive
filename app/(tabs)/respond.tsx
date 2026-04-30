import { View, Text } from 'react-native';

export default function Respond() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-xl font-bold">Active Incidents</Text>
      <Text className="text-gray-600">No active incidents nearby</Text>
    </View>
  );
}
