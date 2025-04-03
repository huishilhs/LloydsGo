import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  ProgressBar,
  Button,
  Divider,
  useTheme
} from 'react-native-paper';
import Greeting from '@/components/Greeting';

export default function RewardsScreen() {
  const theme = useTheme();

  // Sample data
  const userName = 'Matthew W';
  const points = 3500;
  const progress = points / 10000; // 10,000 points as an example max
  const redeemOffers = [
    {
      id: 1,
      title: 'Greggs',
      subtitle: 'Get A Free Meal Deal'
    },
    {
      id: 2,
      title: 'Greggs',
      subtitle: 'Get A Free Drink'
    },
    {
      id: 3,
      title: 'Greggs',
      subtitle: 'Get A Free Drink'
    },
    {
      id: 4,
      title: 'Greggs',
      subtitle: 'Get A Free Drink'
    }
  ];
  const moreOffers = [
    {
      id: 3,
      title: 'M&S',
      subtitle: 'Get 5% Cash back with Lloyds Bank'
    },
    {
      id: 4,
      title: 'Boots',
      subtitle: 'Get 10% off with Advantage Card'
    },
    {
      id: 5,
      title: 'Coach',
      subtitle: 'Up to 60% off + Extra 20% Off Almost Everything'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Greeting username='John' avatarUrl='' />
        {/* Points Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.pointsText}>
              {points} points
            </Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={progress}
                color={theme.colors.primary}
                style={styles.progressBar}
              />
              <View style={styles.progressLabels}>
                <Text style={styles.smallLabel}>Redeemed</Text>
                <Text style={styles.smallLabel}>5000 points</Text>
                <Text style={styles.smallLabel}>10000 points</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Set Learning Goals */}
        <Card style={styles.card}>
          <Card.Title title="Set Learning Goals" />
          <Card.Content>
            <Text style={styles.bodyText}>
              Plan your learning journey and track progress!
            </Text>
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Add your goal
            </Button>
          </Card.Content>
        </Card>

        {/* Redeem Offers */}
        <Card style={styles.card}>
          <Card.Title title="Redeem Offers" />
          
          <Card.Content>
          <View style={styles.offersRow}>
            {redeemOffers.map((offer) => (
              <Card style={[styles.card, styles.offerCard]} key={offer.id}>
                <Card.Title title={offer.title} subtitle={offer.subtitle} />
              </Card>
            ))}
          </View>
          </Card.Content>
        </Card>
        {/* More Offers */}
        <Card style={styles.card}>
        <Card.Title title="More Offers" />
        <Card.Content>
        {moreOffers.map((offer) => (
          <Card style={styles.card} key={offer.id}>
            <Card.Title title={offer.title} subtitle={offer.subtitle} />
          </Card>
        ))}
        </Card.Content>
        </Card>
        {/* Add any additional sections or components below */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF'
  },
  pointsText: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  progressContainer: {
    marginTop: 8
  },
  progressBar: {
    height: 8,
    borderRadius: 4
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4
  },
  smallLabel: {
    fontSize: 12,
    color: 'gray'
  },
  bodyText: {
    marginBottom: 8
  },
  button: {
    marginTop: 8,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  buttonLabel: {
    paddingHorizontal: 8
  },
  sectionTitle: {
    marginBottom: 8,
    marginTop: 16
  },
  offersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  offerCard: {
    width: '48%'
  }
});
