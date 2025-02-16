import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#6CF478',
    }}>
      <Tabs.Screen
        name="home/index" // Maps to app/(tabs)/home/index.tsx
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards/index" // Maps to app/(tabs)/rewards/index.tsx
        options={{
          title: 'Rewards',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="lifego/index" // Maps to app/(tabs)/lifego/index.tsx
        options={{
          title: 'LifeGo',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai/index" // Maps to app/(tabs)/ai/index.tsx
        options={{
          title: 'AI',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="invest/index" // Maps to app/(tabs)/invest/index.tsx
        options={{
          title: 'Invest',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}