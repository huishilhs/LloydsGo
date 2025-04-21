// components/RoundUpCard.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

interface RoundUpCardProps {
  /** Amount saved this month, e.g. "11.46" */
  totalSavedMonth: string;
  /** Amount saved this year, e.g. "137.52" */
  totalSavedYear: string;
  /** Optional callback if you want to override navigation */
  onPress?: () => void;
}

export default function RoundUpCard({
  totalSavedMonth,
  totalSavedYear,
  onPress,
}: RoundUpCardProps) {
  const router = useRouter();
  const handlePress = onPress ?? (() => router.push('/invest/round-up'));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.title}>Round‑Up Saving:</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.savedText}>So far, you've saved</Text>

      <View style={styles.amountsContainer}>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>£{totalSavedMonth}</Text>
          <Text style={styles.periodText}>This month</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.amountBox}>
          <Text style={styles.amountText}>£{totalSavedYear}</Text>
          <Text style={styles.periodText}>This year</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    // Elevation (Android)
    elevation: 1,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 60,
    height: 60,
  },
  savedText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  amountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  amountBox: {
    alignItems: 'center',
    flex: 1,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  periodText: {
    fontSize: 14,
    color: '#444',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#CCC',
  },
});
