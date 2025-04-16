// HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Greeting from '@/components/Greeting';
import ScoreGauge from '@/components/ScoreGauge';

/**
 * Sample Data
 */
const POPULAR_STOCKS = [
  { id: '1', name: 'Nvidia', ticker: 'NVDA', logo: require('../../assets/images/stocks/nvidia_logo.png'), change: '+4.01%' },
  { id: '2', name: 'Tesla', ticker: 'TSLA', logo: require('../../assets/images/stocks/tesla.png'), change: '+2.52%' },
  { id: '3', name: 'Apple', ticker: 'AAPL', logo: require('../../assets/images/stocks/apple_logo.png'), change: '-0.31%' },
  { id: '4', name: 'NIO', ticker: 'NIO', logo: require('../../assets/images/stocks/NIO_logo.png'), change: '+1.46%' },
];

const ALL_STOCKS = [
  { id: '1', name: 'Lloyds Banking Group PLC', ticker: 'LLOY', price: '£130.96', change: '+0.42%', logo: require('../../assets/images/stocks/lloyds_logo.png')},
  { id: '2', name: 'Done Jones', ticker: 'DJA', price: '£462.16', change: '+0.97%', logo: require('../../assets/images/stocks/Dow_Jones.png') },
  { id: '3', name: 'Alcoa', ticker: 'AA', price: '£45.81', change: '-1.58%', logo: require('../../assets/images/stocks/alcoa.png') },
  // Add more stocks as needed...
];

// Sample data for round-up amounts
const data = {
  totalSavedMonth: '11.46',
  totalSavedYear: '137.52',
};


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} >
      <ScrollView contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}>
      <Greeting username='John' avatarUrl='' />
        {/* ROUND-UP SAVING */}
        <View style={styles.roundUpCard}>
        <View style={styles.header}>
            <Text style={styles.sectionTitle}>Round-Up Saving:</Text>
          </View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.savedText}>So far, you've saved</Text>

          <View style={styles.amountsContainer}>
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>£{data.totalSavedMonth}</Text>
              <Text style={styles.periodText}>This month</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.amountBox}>
              <Text style={styles.amountText}>£{data.totalSavedYear}</Text>
              <Text style={styles.periodText}>This year</Text>
            </View>
          </View>
        </View>

        {/* TRADE / DISCOVER TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tabButton, { backgroundColor: '#18B67C' }]}>
            <Text style={styles.tabButtonTextActive}>Stocks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>News</Text>
          </TouchableOpacity>
        </View>

        {/* POPULAR STOCKS */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Popular Stocks:</Text>
            <FlatList
              data={POPULAR_STOCKS}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.popularStockItem}>
                  <Image
                    source={item.logo}
                    style={styles.popularStockLogo}
                    resizeMode="contain"
                  />
                  <Text style={styles.popularStockName}>{item.name}</Text>
                  <Text style={styles.popularStockChange}>{item.change}</Text>
                </View>
              )}
            />
          </Card.Content>
        </Card>

        {/* ALL STOCKS */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>All Stocks:</Text>
            {ALL_STOCKS.map((stock) => (
              <View key={stock.id} style={styles.allStockItem}>
                 <Image
                    source={stock.logo}
                    style={styles.allStockLogo}
                    resizeMode="contain"
                  />
                <View style={{ flex: 1 }}>
                  <Text style={styles.allStockName}>{stock.name}</Text>
                  <Text style={styles.allStockTicker}>{stock.ticker}</Text>
                </View>
                <View>
                  <Text style={styles.allStockPrice}>{stock.price}</Text>
                  <Text
                    style={[
                      styles.allStockChange,
                      stock.change.includes('-') ? { color: 'red' } : { color: 'green' },
                    ]}
                  >
                    {stock.change}
                  </Text>
                </View>
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* CONGRATULATIONS CARD */}
        <View style={styles.congratulationsCard}>
      {/* Left: Score Gauge */}
      <View style={styles.gaugeContainer}>
        <ScoreGauge score={90} size={150} />
      </View>
      {/* Center: Text */}
      <View style={styles.textContainer}>
        <Text style={styles.headline}>Congratulations!</Text>
        <Text style={styles.subtitle}>Start investing today</Text>
      </View>
      {/* Right: Arrow Icon */}
      <AntDesign name="arrowright" size={24} color="black" />
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  roundUpCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  amountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  amountBox: {
    alignItems: 'center',
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  tabButtonText: {
    color: '#555',
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  popularStockItem: {
    width: 100,
    height: 100,
    marginRight: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  popularStockLogo: {
    width: 70,
    height: 40,
    marginBottom: 4,
  },
  popularStockName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  popularStockChange: {
    fontSize: 12,
    color: 'green',
  },
  allStockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  allStockName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  allStockTicker: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  allStockPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  allStockLogo: {
    width: 50,
    height: 40,
    marginRight: 10,
    marginBottom: 4,
  },
  allStockChange: {
    marginTop: 2,
    fontSize: 12,
    textAlign: 'right',
  },
  congratulationsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 0,
    // Optional shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    // Optional elevation for Android
    elevation: 2,
  },
  gaugeContainer: {
    marginRight: 0,
  },
  textContainer: {
    flex: 1,
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
