// app/rewards/[rewardId].tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Button,
  useTheme,
} from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function RedeemRewardScreen() {
  const router = useRouter();
  const { rewardId } = useLocalSearchParams<{ rewardId: string }>();
  const theme = useTheme();

  // TODO: replace this stub with a real fetch by rewardId
  const reward = {
    id: rewardId,
    storeLogo: require('../../../assets/images/greggs_logo.jpg'),
    title: 'Get A Free Meal Deal',
    code: 'GREGGS-FREE-MEAL-24MD-GFD9-X7WQ-ENJOY2025',
    qrImage: require('../../../assets/images/greggs_qr.png'),
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(reward.code);
    Alert.alert('Copied!', 'Your code has been copied to the clipboard.');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Card style={styles.card} elevation={2}>
          <Card.Content style={styles.content}>
            <View style={styles.topRow}>
              <Image source={reward.storeLogo} style={styles.logo} />
              <Text variant="titleMedium" style={styles.title}>
                {reward.title}
              </Text>
            </View>

            <Text style={styles.code}>{reward.code}</Text>

            <Button
              mode="contained"
              onPress={handleCopy}
              style={[
                styles.copyButton,
                { backgroundColor: '#18B67C' },
              ]}
              labelStyle={styles.copyLabel}
            >
              Copy
            </Button>

            <View style={styles.qrContainer}>
              <Image
                source={reward.qrImage}
                style={styles.qrImage}
                resizeMode="contain"
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF'
  },
  content: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 8,
  },
  logo: {
    width: 80,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontWeight: '600',
  },
  code: {
    fontSize: 14,
    letterSpacing: 1,
    textAlign: 'center',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  copyButton: {
    borderRadius: 24,
    paddingHorizontal: 30,
    paddingVertical: Platform.select({ ios: 6, android: 4 }),
    marginBottom: 10,
  },
  copyLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  qrContainer: {
    marginTop: 4,
    alignItems: 'center',
  },
  qrImage: {
    width: 200,
    height: 200,
  },
});
