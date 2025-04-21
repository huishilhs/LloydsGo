import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Provider as PaperProvider,
  Chip,
  Button,
  Title,
  Subheading,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import { supabase } from './../../../lib/supabase';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { Svg } from 'react-native-svg';


// Helper to format a Date as "YYYY-MM-DD"
function formatYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Parse transaction date and time into a Date object */
function parseTransactionDate(dateStr: string, timeStr: string) {
  return new Date(`${dateStr}T${timeStr}`);
}


/** Format a Date as "D MMM" (e.g., "6 Jun") */
function formatDay(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}

/** Get Monday of the given date (assuming week starts on Monday) */
function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - (day === 0 ? 6 : day - 1);
  d.setDate(diff);
  return d;
}

/** Generate last 7 days, most recent first */
function generateDays(): string[] {
  const results: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    results.push(formatDay(d));
  }
  return results;
}

/** Generate last 7 weeks, most recent first */
function generateWeeks(): string[] {
  const results: string[] = [];
  const thisMonday = getMonday(new Date());
  for (let i = 0; i < 7; i++) {
    const d = new Date(thisMonday);
    d.setDate(thisMonday.getDate() - i * 7);
    results.push(`Week of ${formatDay(d)}`);
  }
  return results;
}

/** Generate last 7 months, most recent first */
function generateMonths(): string[] {
  const results: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    results.push(d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }));
  }
  return results;
}

/** Generate last 7 years, most recent first */
function generateYears(): string[] {
  const maxYear = 2024; // Maximum year in your dataset
  const results: string[] = [];
  for (let i = 0; i < 7; i++) {
    results.push(String(maxYear - i));
  }
  return results;
}

/** Return an array of date labels based on the selected timeframe */
function generateChips(timeRange: 'Day' | 'Week' | 'Month' | 'Year'): string[] {
  switch (timeRange) {
    case 'Day':
      return generateDays();
    case 'Week':
      return generateWeeks();
    case 'Month':
      return generateMonths();
    case 'Year':
      return generateYears();
    default:
      return [];
  }
}

// ------------------------------------------------------------------
// 3. PARSING A CHIP INTO A DATE RANGE
// ------------------------------------------------------------------
const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};
const REFERENCE_YEAR = 2024;

// RoundUpPage.tsx (or SpendingInsightsScreen.tsx)
const categoryLimits: Record<string, number> = {
  Food: 100.00,
  Utility: 75.00,
  Transfer: 500.00,
  Leisure: 50.00,
  Shopping: 200.00,
  Saving: 1500,
  Health: 50,
  Gambling: 1000,
  Life_event: 100
};


function parseChipToRange(chip: string, timeRange: 'Day' | 'Week' | 'Month' | 'Year'): [Date, Date] {
  // Use REFERENCE_YEAR for Day and Week chips
  if (timeRange === 'Day') {
    // e.g., "1 Apr"
    const [dayStr, monthStr] = chip.split(' ');
    const day = parseInt(dayStr, 10);
    const year = REFERENCE_YEAR; // use fixed year instead of now.getFullYear()
    const monthIndex = monthMap[monthStr];
    if (monthIndex === undefined) {
      console.warn(`Invalid month string: ${monthStr}`);
      return [new Date(), new Date()];
    }
    const start = new Date(year, monthIndex, day, 0, 0, 0);
    const end = new Date(year, monthIndex, day, 23, 59, 59);
    return [start, end];
  }
  
  if (timeRange === 'Week') {
    // e.g., "Week of 1 Apr"
    const label = chip.replace('Week of ', '');
    const [dayStr, monthStr] = label.split(' ');
    const day = parseInt(dayStr, 10);
    const year = REFERENCE_YEAR;
    const monthIndex = monthMap[monthStr];
    if (monthIndex === undefined) {
      console.warn(`Invalid month string: ${monthStr}`);
      return [new Date(), new Date()];
    }
    const monday = new Date(year, monthIndex, day, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return [monday, sunday];
  }
  
  if (timeRange === 'Month') {
    // e.g., "Apr 2024"
    const [monthStr, yearStr] = chip.split(' ');
    const year = parseInt(yearStr, 10);
    const monthIndex = monthMap[monthStr];
    if (isNaN(year) || monthIndex === undefined) {
      console.warn(`Invalid chip: ${chip}`);
      return [new Date(), new Date()];
    }
    const start = new Date(year, monthIndex, 1, 0, 0, 0);
    const end = new Date(year, monthIndex + 1, 0, 23, 59, 59);
    return [start, end];
  }
  
  if (timeRange === 'Year') {
    // e.g., "2024"
    const year = parseInt(chip, 10);
    if (isNaN(year)) {
      console.warn(`Invalid year chip: ${chip}`);
      return [new Date(), new Date()];
    }
    const start = new Date(year, 0, 1, 0, 0, 0);
    const end = new Date(year, 11, 31, 23, 59, 59);
    return [start, end];
  }
  
  return [new Date(), new Date()];
}

// ------------------------------------------------------------------
// 4. MAIN COMPONENT
// ------------------------------------------------------------------
export default function SpendingInsightsScreen() {
  const [timeRange, setTimeRange] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Day');
  const [chips, setChips] = useState<string[]>([]);
  const [selectedChip, setSelectedChip] = useState<string>('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch transactions from Supabase whenever selectedChip or timeRange changes
  useEffect(() => {
    async function fetchTransactions() {
      if (!selectedChip) return; // wait until a chip is selected
      setLoading(true);
      const [startDate, endDate] = parseChipToRange(selectedChip, timeRange);
      
      // Use YYYY-MM-DD strings for filtering date columns
      const fromDate = formatYYYYMMDD(startDate);
      const toDate = formatYYYYMMDD(endDate);
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('account_id', '2033000')
        .gte('transaction_date', startDate)
        .lte('transaction_date', toDate);
      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        setTransactions(data || []);
      }
      setLoading(false);
    }
    fetchTransactions();
  }, [selectedChip, timeRange]);
  
  // Generate the 7 chips on mount or when timeRange changes
  useEffect(() => {
    const newChips = generateChips(timeRange);
    setChips(newChips);
    if (newChips.length > 0) {
      setSelectedChip(newChips[0]); // default to the first (most recent)
    } else {
      setSelectedChip('');
    }
  }, [timeRange]);

  // Calculate total spending for the filtered transactions
  function calculateSpending(): number {
    if (!selectedChip) return 0;
    const [startDate, endDate] = parseChipToRange(selectedChip, timeRange);
    let sum = 0;
    for (const tx of transactions) {
      const txDate = parseTransactionDate(tx.transaction_date, tx.transaction_time);
      if (txDate >= startDate && txDate <= endDate) {
        // Only add negative values, convert to positive sum
        if (tx.transaction_amount < 0) {
          sum += Math.abs(tx.transaction_amount);
        }
      }
    }
    return sum;
  }  
  
  // Build category breakdown (group by transaction_category)
  function buildCategoryBreakdown(): { category: string; in: number; out: number }[] {
    if (!selectedChip) return [];
    const [startDate, endDate] = parseChipToRange(selectedChip, timeRange);
    const map: Record<string, { in: number; out: number }> = {};
    for (const tx of transactions) {
      const txDate = parseTransactionDate(tx.transaction_date, tx.transaction_time);
      if (txDate >= startDate && txDate <= endDate) {
        const cat = tx.transaction_category || 'Uncategorized';
        if (!map[cat]) {
          map[cat] = { in: 0, out: 0 };
        }
        if (tx.transaction_amount >= 0) {
          map[cat].in += tx.transaction_amount;
        } else {
          map[cat].out += Math.abs(tx.transaction_amount);
        }
      }
    }
    return Object.keys(map).map((cat) => ({
      category: cat,
      in: map[cat].in,
      out: map[cat].out,
    }));
  }
  
  const totalSpending = calculateSpending();
  const categoryBreakdown = buildCategoryBreakdown();
  const chartData = categoryBreakdown.map(item => ({
    x: item.category,
    y: Math.abs(item.out)
  }));
  console.log(categoryBreakdown)

  const pastelColors = [
    "#A8E6CF", // Pastel green
    "#DCEDC1", // Light green
    "#FFD3B6", // Pastel orange
    "#FFAAA5", // Pastel red
    "#FF8B94", // Soft red-pink
    "#D1C4E9", // Pastel purple
    "#B3E5FC", // Light blue
    "#C8E6C9", // Pastel mint
    "#FFCCBC", // Pastel peach
    "#F0F4C3", // Soft yellow-green
  ];

  if (loading) {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <ActivityIndicator animating size="large" />
          <Text>Loading transactions...</Text>
        </View>
      </PaperProvider>
    );
  }

  
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Time Range Selection Buttons (Day/Week/Month/Year) */}
        <View style={styles.buttonRow}>
          {(['Day', 'Week', 'Month', 'Year'] as const).map((item) => {
            const isActive = item === timeRange;
            return (
              <Button
                key={item}
                mode={isActive ? 'contained' : 'outlined'}
                onPress={() => setTimeRange(item)}
                style={styles.timeButton}
                labelStyle={styles.timeButtonLabel}
              >
                {item}
              </Button>
            );
          })}
        </View>

        {/* Horizontal Chips (React Native Paper Chip) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {chips.map((chip) => {
            const isSelected = chip === selectedChip;
            return (
              <Chip
                key={chip}
                selected={isSelected}
                onPress={() => setSelectedChip(chip)}
                style={isSelected ? styles.chipActive : styles.chip}
                textStyle={isSelected ? styles.chipTextActive : styles.chipText}
              >
                {chip}
              </Chip>
            );
          })}
        </ScrollView>

        {/* Display Summed Spending */}
        <View style={styles.card}>
          <Title>£{Math.abs(totalSpending).toFixed(2)}</Title>
          <Subheading>
            {timeRange} overview for {selectedChip || 'N/A'}
          </Subheading>

          {/* Chart Placeholder */}
          {categoryBreakdown.length === 0 ? (
            <Text>No chart</Text>
          ) : (
          <View style={styles.chartContainer}>
            <Svg width={300} height={300}>
              <VictoryPie
                standalone={false}
                width={300}
                height={300}
                data={chartData}
                innerRadius={50}
                colorScale={pastelColors}
                labelComponent={
                  <VictoryTooltip
                    renderInPortal={false}
                    flyoutStyle={{ fill: '#1E1B39' }}
                    style={{ fill: 'white' }}
                  />
                }
              />
            </Svg>
          </View>
        )}
            

          {/* Money Out */}
          <Subheading style={styles.subheading}>Money Out</Subheading>
          {categoryBreakdown.length === 0 ? (
            <Text>No transactions found for this period.</Text>
          ) : (
            categoryBreakdown
              .filter(item => item.out > 0)
              .map((item) => {
                const spent = item.out;
                const limit = categoryLimits[item.category] ?? Infinity;
                const isUnder = spent <= limit;
                return (
                  <View key={item.category} style={styles.categoryRow}>
                    {/* Status circle */}
                    <View
                      style={[
                        styles.statusCircle,
                        { backgroundColor: isUnder ? '#18B67C' : '#FF0000' },
                      ]}
                    />
                    <Text style={styles.categoryName}>{item.category}</Text>
                    <Text style={styles.categoryAmount}>-£{spent.toFixed(2)}</Text>
                  </View>
                );
              })
          )}


          <Subheading style={styles.subheading}>Money In</Subheading>
          {categoryBreakdown.length === 0 ? (
            <Text>No transactions found for this period.</Text>
          ) : (
            categoryBreakdown.filter(item => item.in > 0).map((item) => (
              <View key={item.category} style={styles.categoryRow}>
                <Text style={styles.categoryName}>{item.category}</Text>
                <Text style={styles.moneyIn}>
                  +£{Math.abs(item.in).toFixed(2)}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

// ------------------------------------------------------------------
// 5. STYLES
// ------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  timeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  timeButtonLabel: {
    fontSize: 10,
  },
  chipsContainer: {
    alignItems: 'center',
  },
  chip: {
    marginRight: 8,
    backgroundColor: '#FFF',
    borderColor: '#999',
    borderWidth: 1,
  },
  chipActive: {
    marginRight: 8,
    backgroundColor: '#B3EEC2',
    borderColor: '#2F4F2F',
    borderWidth: 1,
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
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    marginLeft: 8,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  categoryAmount: {
    fontSize: 14,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subheading: {
    fontWeight: 'bold',
    fontSize: 16
  },
  moneyIn: {
    fontSize: 14,
    color: '#306A54'
  }
});
