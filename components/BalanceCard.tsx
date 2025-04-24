// BalanceCard.tsx
import React from 'react';
import { ImageBackground, View, Text, StyleSheet, Dimensions } from 'react-native';

// Your card background image
const CARD_BG = require('../assets/images/card_bg.png');

const { width } = Dimensions.get('window');
// Match the carousel’s pageWidth (screen width minus container padding)
const PAGE_WIDTH = width - 32;
const CARD_HEIGHT = 220;

export interface BalanceCardProps {
  balance: number;
  last4: string;
  userName: string;
  productName: string;
}

export default function BalanceCard({ balance, last4, userName, productName }: BalanceCardProps) {
  console.log('BalanceCard props:', { balance, last4, userName, productName });
  return (
    <ImageBackground
      source={CARD_BG}
      style={styles.cardContainer}
      imageStyle={styles.cardImageStyle}
    >
      <View style={styles.textContainer}>
        <Text style={styles.balanceLabel}>{productName}</Text>
        <Text style={styles.balanceValue}>£{balance.toLocaleString()}</Text>
        <Text style={styles.cardNumber}>**** **** **** {last4}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardImageStyle: {
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  balanceLabel: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 50,
  },
  cardNumber: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    color: '#FFF',
  },
});
