import React, { useState, useEffect } from 'react';
import { Stack, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Session } from '@supabase/supabase-js';
import Auth from '../components/Auth'; // your login screen component
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../lib/supabase'

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // On first mount, check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for future auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) {
    // If there's no session, show your Auth (login) screen
    // Option A: Return the Auth component directly:
    return <Auth />;
  }
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
