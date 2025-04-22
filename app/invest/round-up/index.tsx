// RoundUpPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import RoundUpCard from '@/components/RoundUpCard';
import { supabase } from '@/lib/supabase'; // adjust path as needed

type Tx = {
  transaction_id: string;
  transaction_date: string;
  transaction_amount: string;
  transaction_category: string;
};

type RowItem = {
  key: string;
  title: string;
  date: string | null;
  amount: string;
  backgroundColor: string;
  textColor: string;
  icon: React.ReactNode;
};

export default function RoundUpPage() {
  const [txs, setTxs] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTxs = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('account_id', '2033000')
        .gte('transaction_date', '2024-04-01')
        .lte('transaction_date', '2024-04-30');

      if (error) {
        console.error('Error loading transactions:', error);
      } else {
        setTxs(data);
      }
      setLoading(false);
    };

    fetchTxs();
  }, []);

  // interleave each tx with its computed round‑up row
  const listData: RowItem[] = useMemo(() => {
    const items: RowItem[] = [];
    txs.forEach((tx) => {
      const amt = parseFloat(tx.transaction_amount);
      const absAmt = Math.abs(amt);

      // original row
      items.push({
        key: tx.transaction_id,
        title: tx.transaction_category,
        date: tx.transaction_date,
        amount: `£${absAmt.toFixed(2)}`,
        backgroundColor: '#FFF',
        textColor: '#333',
        icon: (() => {
          switch (tx.transaction_category.toLowerCase()) {
            case 'food':
              return <FontAwesome5 name="coffee" size={24} color="#333" />;
            case 'utility':
              return <MaterialCommunityIcons name="flash" size={24} color="#333" />;
            case 'interest':
              return <MaterialCommunityIcons name="percent" size={24} color="#333" />;
            default:
              return <FontAwesome5 name="receipt" size={24} color="#333" />;
          }
        })(),
      });

      // compute round‑up for any fractional part
      const roundUp = absAmt % 1 !== 0
        ? Math.ceil(absAmt) - absAmt
        : 0;

      items.push({
        key: `${tx.transaction_id}-roundup`,
        title: 'Round‑Up',
        date: null,
        amount: `+£${roundUp.toFixed(2)}`,
        backgroundColor: '#5EC279',
        textColor: '#FFF',
        icon: <MaterialCommunityIcons name="currency-gbp" size={24} color="#FFF" />,
      });
    });
    return items;
  }, [txs]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Round‑Up summary */}
      <View style={styles.summary}>
        <RoundUpCard totalSavedMonth="11.46" totalSavedYear="137.52" />
      </View>

      {/* Transactions + round‑ups */}
      <FlatList
        data={listData}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View
            style={[
              styles.txRow,
              { backgroundColor: item.backgroundColor },
            ]}
          >
            <View style={styles.icon}>{item.icon}</View>
            <View style={styles.text}>
              <Text style={[styles.title, { color: item.textColor }]}>
                {item.title}
              </Text>
              {item.date && (
                <Text
                  style={[
                    styles.date,
                    {
                      color:
                        item.textColor === '#FFF' ? '#E5F6EA' : '#666',
                    },
                  ]}
                >
                  {item.date}
                </Text>
              )}
            </View>
            <Text style={[styles.amount, { color: item.textColor }]}>
              {item.amount}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F1F1' },
  summary: { paddingHorizontal: 16, paddingTop: 16 },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: { marginRight: 12 },
  text: { flex: 1 },
  title: { fontSize: 16, fontWeight: '500' },
  date: { fontSize: 12, marginTop: 2 },
  amount: { fontSize: 16, fontWeight: '600' },
});
