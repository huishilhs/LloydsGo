import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Greeting from '@/components/Greeting';

const AiPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Greeting */}
      <Greeting username="Matthew.W" avatarUrl=''/>

      {/* Additional Content for AI Page */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the AI Screen!</Text>
        <Text style={styles.subtitle}>Explore the latest updates and features.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

export default AiPage;