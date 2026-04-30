import { View, Text } from 'react-native';

export default function Alert() {
  return (
    <View className="flex-1 bg-red-900 justify-center items-center">
      <Text className="text-white text-2xl font-bold">🚨 Emergency Alert</Text>
    </View>
  );
}
