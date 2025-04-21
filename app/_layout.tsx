import React, { useState, useEffect } from 'react';
import { Stack, Tabs, Redirect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Session } from '@supabase/supabase-js';
import Auth from '../components/Auth'; // your login screen component
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // On first mount, check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for future auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Periodically check session validity (every minute)
    const interval = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Clear session if the token is expired or session is invalid
        setSession(null);
      }
    }, 60000);

    // Clean up listener and interval on unmount
    return () => {
      authListener?.subscription?.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  // Show loading indicator while checking authentication
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#6CF478" />
  //     </View>
  //   );
  // }

  // Redirect to auth page if no session
  if (!session) {
    // Use Redirect component for Expo Router navigation
    return <Auth />;
  }


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#18B67C',
      }}
    >
      <Tabs.Screen
        name="home" // Maps to app/(tabs)/home/index.tsx
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards" // Maps to app/(tabs)/rewards/index.tsx
        options={{
          title: 'Rewards',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ai" // Maps to app/(tabs)/ai/index.tsx
        options={{
          title: 'AI',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="invest" // Maps to app/(tabs)/invest/index.tsx
        options={{
          title: 'Invest',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Hides the tab
        }}
      />
    </Tabs>
  );
}
