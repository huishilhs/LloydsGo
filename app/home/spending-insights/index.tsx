import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {
  Provider as PaperProvider,
  Card,
  Chip,
  Title,
  Subheading,
  Text,
  ToggleButton,
} from 'react-native-paper';

const { width } = Dimensions.get('window');

// Helper to format a Date object as "D MMM" (e.g., "6 Jun")
function formatDay(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

// Generate chips for "Day" tab: last 30 days
function generateDayChips(): string[] {
  const chips: string[] = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    chips.push(formatDay(d));
  }
  return chips.reverse(); // earliest first
}

// Get Monday for a given date (assuming week starts on Monday)
function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) to 6 (Sat)
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  d.setDate(diff);
  return d;
}

// Generate chips for "Week" tab: last 8 weeks
function generateWeekChips(): string[] {
  const chips: string[] = [];
  const today = new Date();
  let currentMonday = getMonday(today);
  for (let i = 0; i < 8; i++) {
    chips.push(`Week of ${formatDay(currentMonday)}`);
    currentMonday = new Date(currentMonday);
    currentMonday.setDate(currentMonday.getDate() - 7);
  }
  return chips.reverse();
}

// Generate chips for "Month" tab: last 12 months
function generateMonthChips(): string[] {
  const chips: string[] = [];
  const today = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    chips.push(d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }));
  }
  return chips.reverse();
}

// Generate chips for "Year" tab: last 10 years
function generateYearChips(): string[] {
  const chips: string[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 10; i++) {
    chips.push((currentYear - i).toString());
  }
  return chips.reverse();
}

// Return the appropriate chips array based on the selected tab
function generateChips(
  selectedTab: 'Day' | 'Week' | 'Month' | 'Year'
): string[] {
  switch (selectedTab) {
    case 'Day':
      return generateDayChips();
    case 'Week':
      return generateWeekChips();
    case 'Month':
      return generateMonthChips();
    case 'Year':
      return generateYearChips();
    default:
      return [];
  }
}

export default function SpendingInsightsScreen() {
  const [selectedTab, setSelectedTab] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Day');
  const [selectedChip, setSelectedChip] = useState<string>('');

  // Generate chips dynamically based on the selected tab.
  const chips = generateChips(selectedTab);

  // If no chip is selected yet, default to the most recent one.
  if (!selectedChip && chips.length > 0) {
    setSelectedChip(chips[chips.length - 1]);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Header */}
        <Title style={styles.headerTitle}>Spending Insights</Title>

        {/* Tabs using ToggleButton.Group */}
        <ToggleButton.Group
          onValueChange={(value : any) => {
            setSelectedTab(value as 'Day' | 'Week' | 'Month' | 'Year');
            const newChips = generateChips(value as any);
            setSelectedChip(newChips[newChips.length - 1]);
          }}
          value={selectedTab}
        >
          <ToggleButton icon="calendar" value="Day" />
          <ToggleButton icon="calendar-week" value="Week" />
          <ToggleButton icon="calendar-month" value="Month" />
          <ToggleButton icon="calendar-range" value="Year" />
        </ToggleButton.Group>

        {/* Horizontal Chips using Paper's Chip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContainer}
        >
          {chips.map((chip) => (
            <Chip
              key={chip}
              selected={chip === selectedChip}
              onPress={() => setSelectedChip(chip)}
              style={styles.chip}
              textStyle={chip === selectedChip ? styles.chipTextActive : styles.chipText}
            >
              {chip}
            </Chip>
          ))}
        </ScrollView>

        {/* Main Card */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>£1154.38</Title>
            <Subheading>Spend for {selectedChip}</Subheading>

            {/* Pie Chart Placeholder */}
            <View style={styles.chartWrapper}>
              <View style={styles.piePlaceholder}>
                <Text style={{ color: '#fff' }}>Chart</Text>
              </View>
              <View style={styles.floatingLabel}>
                <Text style={styles.floatingLabelText}>Travel £365.66</Text>
              </View>
            </View>

            {/* Category breakdown */}
            <View style={styles.categoryList}>
              {[
                { name: 'Travel', transactions: 7, percentage: 29.3, color: '#3B82F6' },
                { name: 'Grocery', transactions: 25, percentage: 17.8, color: '#F59E0B' },
                { name: 'Transport', transactions: 10, percentage: 14.5, color: '#10B981' },
                { name: 'Bills', transactions: 5, percentage: 10.2, color: '#EF4444' },
                { name: 'Other', transactions: 7, percentage: 9.2, color: '#6366F1' },
              ].map((cat) => (
                <View style={styles.categoryItem} key={cat.name}>
                  <View>
                    <Text style={styles.categoryName}>{cat.name}</Text>
                    <Text style={styles.categoryDetails}>
                      {cat.transactions} transactions • {cat.percentage}%
                    </Text>
                  </View>
                  <View style={[styles.bullet, { backgroundColor: cat.color }]} />
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  chipsScroll: {
    marginVertical: 16,
  },
  chipsContainer: {
    alignItems: 'center',
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#FFF',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  chipTextActive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F4F2F',
  },
  card: {
    marginVertical: 16,
  },
  chartWrapper: {
    alignItems: 'center',
    marginVertical: 16,
    position: 'relative',
  },
  piePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingLabel: {
    position: 'absolute',
    top: 50,
    right: -50,
    backgroundColor: '#2E2E2E',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  floatingLabelText: {
    color: '#FFF',
    fontSize: 12,
  },
  categoryList: {
    marginTop: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  categoryDetails: {
    fontSize: 14,
    color: '#777',
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
