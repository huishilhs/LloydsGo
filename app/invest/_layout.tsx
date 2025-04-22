import { Stack } from 'expo-router';

export default function InvestLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="round-up/index"
        options={{ title: 'Round-Up Saving', headerBackTitle: 'Invest'}}
      />
    </Stack>
  );
}
