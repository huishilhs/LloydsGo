import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function LandingPage() {
  return (
    <View>
      <Text>Welcome to the App!</Text>
      <Link href="/(tabs)">Go to Tabs</Link>
    </View>
  );
}