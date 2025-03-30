import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

// Point this to your actual image path
const CARD_BG = require('../assets/images/card_bg.png');

export default function BalanceCard() {
  const balance = 1657;
  const last4Digits = '1234';
  const userName = 'Matthew. W';

  return (
    <ImageBackground
      source={CARD_BG}
      style={styles.cardContainer}
      imageStyle={styles.cardImageStyle}
    >
      {/* Text container (on top of the background) */}
      <View style={styles.textContainer}>
        <Text style={styles.balanceLabel}>Balance:</Text>
        <Text style={styles.balanceValue}>£{balance.toLocaleString()}</Text>
        <Text style={styles.cardNumber}>**** **** **** {last4Digits}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        marginVertical: 16,
      },
      cardImageStyle: {
        resizeMode: 'cover',
      },
      textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
      },
      // Updated text sizes for Balance label and value
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
