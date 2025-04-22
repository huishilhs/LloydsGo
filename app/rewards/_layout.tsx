import { Stack } from 'expo-router';

export default function RewardsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="select-learning-goals/index"
        options={{ title: 'Set Learning Goals', headerBackTitle: 'Rewards'}}
      />
      <Stack.Screen
        name="redeem-rewards/index"
        options={{ title: 'Redeem Rewards', headerBackTitle: 'Rewards'}}
      />
    </Stack>
  );
}
