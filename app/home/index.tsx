import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Greeting from '@/components/Greeting';
import BalanceCard from '../../components/BalanceCard';
import SpendInsightsCard from '@/components/SpendInsightsCard';
import MilestoneFundsCard from '@/components/MilestoneFundsCard';
import SpendingInsights from './spending-insights';
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router';

const HomePage = () => {
  const userName = 'Matthew. W';
  const balance = 1657;
  const currency = '£'; // or '$' if needed
  const monthlySavings = 101.46;
  const yearlySavings = 1307.52;
  const router = useRouter();
  return (
     <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {/* Header / Greeting */}
      <Greeting username='John' avatarUrl='' />
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />

      {/* Spending Score */}
      <View style={styles.spendingScoreContainer}>
        <Text style={styles.spendingScoreTitle}>Spending Score:</Text>
        <View style={styles.spendingScoreRow}>
          <Text style={styles.spendingScoreValue}>You Can Do Better!</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>What Can I Do?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance Card */}
      <BalanceCard />

      {/* Spend Insights */}
      <SpendInsightsCard />

      {/* Milestone Funds */}
      <MilestoneFundsCard />

      <View style={styles.container}>
      {/* Debt Controls Card */}
      <TouchableOpacity style={styles.card} onPress={() => router.navigate('/home/spending-insights')}>
        {/* Left side: title + subtitle */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Debt Controls</Text>
          <Text style={styles.subtitle}>Analyse your Debts in One Place</Text>
        </View>
        {/* Right side: icon + arrow */}
        <View style={styles.iconRow}>
          <Ionicons name="pie-chart-outline" size={40} color="#333" style={styles.mainIcon} />
          <Ionicons name="arrow-forward" size={24} color="#333" />
        </View>
      </TouchableOpacity>

      {/* Earn Rewards Card */}
      <TouchableOpacity style={styles.card} onPress={() => router.navigate('/rewards')}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Earn Rewards!</Text>
          <Text style={styles.subtitle}>Start saving Money Today!</Text>
        </View>
        <View style={styles.iconRow}>
          <Ionicons name="gift-outline" size={40} color="#333" style={styles.mainIcon} />
          <Ionicons name="arrow-forward" size={24} color="#333" />
        </View>
      </TouchableOpacity>
    </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // or your choice of background
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 16,
    color: '#555',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },

  // Spending Score
  spendingScoreContainer: {
    marginTop: 24,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  spendingScoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  spendingScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendingScoreValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E67E22', // e.g., orange text
  },
  linkText: {
    fontSize: 14,
    color: '#3498DB', // e.g., blue link
  },

  // Balance Card
  balanceCard: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden', // ensures corners stay rounded
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceCardImage: {
    resizeMode: 'cover', // or 'contain', etc.
    borderRadius: 12,    // so the image corners match
  },
  balanceTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  balanceValue: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cardSuffix: {
    color: '#FFF',
    fontSize: 16,
  },

  // Spend Insights
  spendInsightsCard: {
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  spendInsightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendInsightsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  spendInsightsSub: {
    fontSize: 14,
    color: '#777',
  },
  chartPlaceholder: {
    marginVertical: 16,
    height: 80,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewSpendingBtn: {
    alignSelf: 'flex-start',
  },
  viewSpendingText: {
    color: '#3498DB',
    fontWeight: '500',
  },

  // Milestone Funds
  milestoneContainer: {
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  milestoneSubtitle: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  fundGoalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  fundGoalLabel: {
    fontSize: 14,
    color: '#333',
  },
  fundGoalValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textWrapper: {
    flex: 1, // ensures text takes available space on the left
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainIcon: {
    marginRight: 8,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    // optional shadow/elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default HomePage;