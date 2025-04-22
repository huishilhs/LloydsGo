import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="spending-insights/index"
        options={{ title: 'Spending Insights', headerBackTitle: 'Home' }}
      />
      <Stack.Screen
        name="spending-score/index"
        options={{ title: 'Spending Score', headerBackTitle: 'Home'}}
      />
      <Stack.Screen
        name="profile/index"
        options={{ title: 'Profile', headerBackTitle: 'Home'}}
      />
      <Stack.Screen
        name="manage-loan/index"
        options={{ title: 'Manage Loans', headerBackTitle: 'Home'}}
      />
    </Stack>
  );
}
