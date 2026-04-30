import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue, Easing } from 'react-native-reanimated';

export default function SOSTrigger() {
  const router = useRouter();
  const [holding, setHolding] = useState(false);
  const ringScale = useSharedValue(0.8);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    ringScale.value = withRepeat(withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.exp) }), -1, true);
  }, []);

  const animatedRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
  }));

  const handlePressIn = () => {
    setHolding(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    holdTimer.current = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.push('/(sos)/type');
    }, 2000);
  };

  const handlePressOut = () => {
    setHolding(false);
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-red-600 justify-center items-center">
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} className="mb-8">
        <Animated.View style={[animatedRingStyle, { width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: 'white' }]} />
        <View className="absolute w-48 h-48 rounded-full border-2 border-white justify-center items-center">
          <Text className="text-white text-center font-bold text-sm px-4">HOLD FOR EMERGENCY</Text>
        </View>
      </Pressable>

      <Text className="text-white text-lg font-semibold">Hold for 2 seconds to alert nearby helpers</Text>

      <Pressable onPress={() => router.back()} className="absolute top-12 left-6 p-3">
        <Text className="text-white text-2xl">←</Text>
      </Pressable>
    </SafeAreaView>
  );
}
