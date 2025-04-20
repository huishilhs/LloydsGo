import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScoreGauge from '../../../components/ScoreGauge'

export default function SpendingScoreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Score Circle */}
        <View style={styles.scoreContainer}>
          <ScoreGauge score={90} size={150}/>
        </View>

        {/* Tips */}
        <View style={styles.card}>
          <Text style={styles.bullet}>• Well done! You’ve saved on groceries this month.</Text>
          <Text style={styles.bullet}>• Travel costs are up this year—consider budget options!</Text>
          <Text style={styles.bullet}>• Overall well done, carry on with this progress!</Text>
        </View>

        {/* More Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>More Info:</Text>
          <Text style={styles.infoText}>
            Your spending score is determined by analysing your expenses against the targets you've set for each payment. 
            It factors in spending patterns, budget adherence, and overall financial habits to give you a personalized score 
            reflecting how effectively you manage your finances.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '700',
    marginTop: -100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#555',
  },
});
