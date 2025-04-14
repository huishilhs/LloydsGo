import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SpendInsightsCard() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  return (
    <View style={styles.card}>
      {/* Title and Subtitle */}
      <Text style={styles.title}>Spend insights</Text>
      <Text style={styles.subtitle}>$29.62 in {currentMonth}</Text>

      {/* Chart Row */}
      <View style={styles.chartRow}>
        {/* First Column */}
        <View style={styles.columnWrapper}>
          {/* Wider column with custom height */}
          <View style={[styles.iconBlock, { height: 30}]}>
            <Ionicons name="briefcase-outline" size={24} color="#333" />
          </View>
          <View style={[styles.columnBlock, { height: 60 }]}>
            <Text style={styles.columnLabel}>2</Text>
          </View>
          
        </View>

        {/* Second Column */}
        <View style={styles.columnWrapper}>
        <View style={[styles.iconBlock, { height: 30 }]}>
            <Ionicons name="airplane-outline" size={40} color="#333" />
          </View>
          <View style={[styles.columnBlock, { height: 80 }]}>
            <Text style={styles.columnLabel}>1</Text>
          </View>
        </View>

        {/* Third Column */}
        <View style={styles.columnWrapper}>
        <View style={[styles.iconBlock, { height: 30 }]}>
            <Ionicons name="car-outline" size={24} color="#333" />
          </View>
          <View style={[styles.columnBlock, { height: 50 }]}>
                <Text style={styles.columnLabel}>3</Text>
          </View>
        </View>
      </View>

      {/* Separator line */}
      <View style={styles.separator} />

      {/* Footer Link: text + arrow on the same row */}
      <TouchableOpacity style={styles.footerLink} onPress={() => router.navigate('/home/spending-insights')}>
        <Text style={styles.footerLinkText}>View my spending</Text>
        <Ionicons
          name="arrow-forward"
          size={16}
          color="#000"
          style={styles.footerLinkIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },

  // Chart Row
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  columnWrapper: {
    alignItems: 'center',
  },
  columnBlock: {
    // Increased width for a wider column
    width: 100,
    backgroundColor: '#E3E3E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBlock: {
    width: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  columnLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  // Separator line above the footer link
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },

  // Footer link row
  footerLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#306A54',
    marginRight: 6,
  },
  footerLinkIcon: {
    marginLeft: 'auto'
  },
});
