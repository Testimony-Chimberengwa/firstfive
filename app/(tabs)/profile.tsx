import { View, Text } from 'react-native';

export default function Profile() {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-xl font-bold">Your Profile</Text>
      <Text className="text-gray-600">Sign in to see your profile</Text>
    </View>
  );
}
