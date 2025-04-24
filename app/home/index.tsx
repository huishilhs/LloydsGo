import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button
} from 'react-native';
import { Carousel, Colors } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import Greeting from '@/components/Greeting';
import BalanceCard from '@/components/BalanceCard';
import SpendInsightsCard from '@/components/SpendInsightsCard';
import MilestoneFundsCard from '@/components/MilestoneFundsCard';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

type Product = {
  product_name: string;
  product_type: string;
};

type Account = {
  account_id: string;
  customer_id: string | number;
  product_id: number;
  starting_balance: number;
  since: string;
  products?: Product;
};


const HomePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError || !user) {
        console.error('Auth error:', userError?.message || 'User is null');
        return;
      }
  
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('customer_id, name')
        .eq('user_id', user.id)
        .single();
  
      // console.log('CUSTOMER:', customer);
  
      if (customerError || !customer) {
        console.error('Customer fetch error:', customerError?.message || 'Customer not found');
        return;
      }
  
      setUserName(customer.name);
  
      const { data: accountList, error: accountError } = await supabase
      .from('accounts')
      .select(`
        account_id,
        customer_id,
        product_id,
        starting_balance,
        since,
        products:product_id (
          product_name,
          product_type
        )
      `)
      .eq('customer_id', String(customer.customer_id));    
    
      console.log('ACCOUNTS:', accountList);
  
      if (accountError) {
        console.error('Account fetch error:', accountError.message);
      } else {
        setAccounts(accountList as unknown as Account[]);
      }
    };
  
    fetchData();
  }, []);
  

  const renderCards = () =>
    accounts.map((account) => (
      <BalanceCard
        key={account.account_id}
        balance={account.starting_balance}
        last4={String(account.product_id).slice(-4)}
        userName={userName || 'User'}
        productName={account.products?.product_name || 'Unknown Product'}
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}>
        <Greeting username={userName || '...'} avatarUrl="" />
        {/* <Button title="Sign Out" onPress={() => supabase.auth.signOut()} /> */}

        <View style={styles.spendingScoreContainer}>
          <Text style={styles.spendingScoreTitle}>Spending Score:</Text>
          <View style={styles.spendingScoreRow}>
            <Text style={styles.spendingScoreValue}>Great job managing money!</Text>
            <TouchableOpacity onPress={() => router.push('/home/spending-score')}>
              <Text style={styles.linkText}>View score</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Carousel
          itemSpacings={16}
          containerStyle={{ height: 240, marginVertical: 16, width: '100%' }}
          pageControlPosition={Carousel.pageControlPositions.UNDER}
          pageControlProps={{
            size: 8,
            spacing: 12,
            color: Colors.green30,
            inactiveColor: Colors.grey50,
            containerStyle: { marginTop: 8 },
          }}
        >
          {renderCards()}
        </Carousel>

        <SpendInsightsCard />
        <MilestoneFundsCard />

        <View style={styles.container}>
          <TouchableOpacity style={styles.card} onPress={() => router.navigate('/home/manage-loan')}>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>Manage Loans</Text>
              <Text style={styles.subtitle}>Analyse your Debts in One Place</Text>
            </View>
            <View style={styles.iconRow}>
              <Ionicons name="pie-chart-outline" size={40} color="#333" style={styles.mainIcon} />
              <Ionicons name="arrow-forward" size={24} color="#333" />
            </View>
          </TouchableOpacity>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  spendingScoreContainer: {
    marginTop: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  spendingScoreTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  spendingScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendingScoreValue: { fontSize: 16, fontWeight: '400', color: '#E67E22' },
  linkText: { fontSize: 14, color: '#3498DB' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  textWrapper: { flex: 1, marginRight: 12 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666' },
  iconRow: { flexDirection: 'row', alignItems: 'center' },
  mainIcon: { marginRight: 8 },
});

export default HomePage;
