// ManageLoansScreen.tsx
import React from 'react';
import { ScrollView, View, StyleSheet, Clipboard } from 'react-native';
import { Surface, Text, Divider, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ManageLoansScreen() {
  // (In a real app these would come from your API / props)
  const payment = {
    outstanding: '£5,000',
    nextDue:      '£800',
    currentDue:   '15%',
  };
  const loan = {
    productName:      'HOUSING LOAN',
    outstandingAmount:    '£24,675.98',
    nextDueDate:       '01 May 2025',
    currentAmountDue:   '£0',
    instalmentAmount:   '£3,756',
    originalAmount:     '£66,876.00',
    originalTenure:       '30 Years',
    remainingTenure:  '10 Years 1 month',
    drawdownDate: '01 May 2005',
    expiryDate: '01 May 2035'
  };

  const overdraft = {
    overdraft: '26.30%',
    interest:  '£600',
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* CREDIT CARD */}
      <Text style={styles.sectionHeader}>CREDIT CARD</Text>
      <Surface style={styles.card} elevation={2}>
        {/* Outstanding Amount */}
        <View style={styles.row}>
          <Text style={styles.label}>Available Credit</Text>
          <View style={styles.rowRight}>
            <Text style={styles.value}>{payment.outstanding}</Text>
          </View>
        </View>
        <Divider />
        {/* Next Due Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Amount Payable</Text>
          <Text style={styles.value}>{payment.nextDue}</Text>
        </View>
        <Divider />
        {/* Current Amount Due */}
        <View style={styles.row}>
          <Text style={styles.label}>Annual Percentage</Text>
          <Text style={styles.value}>{payment.currentDue}</Text>
        </View>
      </Surface>

      {/* MORTGAGES */}
      <Text style={[styles.sectionHeader, { marginTop: 24 }]}>MORTGAGES</Text>
      <Surface style={styles.card} elevation={2}>
        {/* Product Name */}
        <View style={styles.row}>
          <Text style={styles.label}>Product Name</Text>
          <Text style={styles.value}>{loan.productName}</Text>
        </View>
        <Divider />
        {/* Account Number */}
        <View style={styles.row}>
          <Text style={styles.label}>Outstanding Amount</Text>
          <View style={styles.rowRight}>
            <Text style={styles.value}>{loan.outstandingAmount}</Text>
          </View>
        </View>
        <Divider />
        {/* Instalment Amount */}
        <View style={styles.row}>
          <Text style={styles.label}>Next Due Date</Text>
          <Text style={styles.value}>{loan.nextDueDate}</Text>
        </View>
        <Divider />
        {/* Original Loan/Facility Amount */}
        <View style={styles.row}>
          <Text style={styles.label}>Current Amount Due</Text>
          <Text style={styles.value}>{loan.currentAmountDue}</Text>
        </View>
        <Divider />
        {/* Original Tenure */}
        <View style={styles.row}>
          <Text style={styles.label}>Instalment Amount</Text>
          <Text style={styles.value}>{loan.instalmentAmount}</Text>
        </View>
        <Divider />
        {/* Loan Drawdown Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Original Amount</Text>
          <Text style={styles.value}>{loan.originalAmount}</Text>
        </View>
        <Divider />
        {/* Loan Expiry Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Original Tenure</Text>
          <Text style={styles.value}>{loan.originalTenure}</Text>
        </View>
        <Divider />
        {/* Remaining Tenure */}
        <View style={styles.row}>
          <Text style={styles.label}>Remaining Tenure</Text>
          <Text style={styles.value}>{loan.remainingTenure}</Text>
        </View>
        <Divider />
        <View style={styles.row}>
          <Text style={styles.label}>Loan Drawdown Date</Text>
          <Text style={styles.value}>{loan.drawdownDate}</Text>
        </View>
        <Divider />
        <View style={styles.row}>
          <Text style={styles.label}>Loan Expiry Date</Text>
          <Text style={styles.value}>{loan.expiryDate}</Text>
        </View>
        <Divider />
      </Surface>

      {/* OVERDRAFTS */}
      <Text style={[styles.sectionHeader, { marginTop: 24 }]}>OVERDRAFTS</Text>
      <Surface style={styles.card} elevation={2}>
        {/* Outstanding Amount */}
        <View style={styles.row}>
          <Text style={styles.label}>Arranged Overdraft</Text>
          <View style={styles.rowRight}>
            <Text style={styles.value}>{overdraft.overdraft}</Text>
          </View>
        </View>
        <Divider />
        {/* Next Due Date */}
        <View style={styles.row}>
          <Text style={styles.label}>Interest Free Limit</Text>
          <Text style={styles.value}>{overdraft.interest}</Text>
        </View>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: '#777',
  },
  value: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
    textAlign: 'right',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
