import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  ProgressBar,
  Button,
  Divider,
  useTheme
} from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';
import Greeting from '@/components/Greeting';
import { router, useLocalSearchParams } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

type Course = {
  key: string;
  label: string;
  progress: number; // progress value between 0 and 1
};

export default function RewardsScreen() {
  const params = useLocalSearchParams<{ selectedGoals?: string }>();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (params.selectedGoals) {
      try {
        const parsed = JSON.parse(params.selectedGoals);
        // Convert parsed object to an array of courses.
        let coursesArray: Course[] = [];
        if (Array.isArray(parsed)) {
          coursesArray = parsed;
        } else {
          coursesArray = Object.keys(parsed).map((key) => ({
            key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
            progress: typeof parsed[key] === 'number' ? parsed[key] : 0, // use the numeric value if available
          }));
        }
        setCourses(coursesArray);
      } catch (error) {
        console.error('Error parsing selectedGoals JSON:', error);
      }
    }
  }, [params.selectedGoals]);

  // Sample data
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
          <Card.Title title="Lloyds points" />
            <Card.Content>
              <Text variant="headlineMedium" style={styles.pointsText}>
                {points} points
              </Text>
              <View style={styles.progressContainer}>
                <ProgressBar
                  progress={progress}
                  style={styles.progressBar}
                  color='#18B67C'
                />
                <View style={styles.progressLabels}>
                  <Text style={styles.smallLabel}>1000 points</Text>
                  <Text style={styles.smallLabel}>5000 points</Text>
                  <Text style={styles.smallLabel}>10000 points</Text>
                </View>
              </View>
            </Card.Content>
        </Card>

        {/* Set Learning Goals */}
        <Card style={styles.card}>
          <Card.Title title="Set Learning Goals"         
          right={() => (
              <View style={styles.strikeBox}>
                <Text style={styles.strikeCount}>1</Text>
                <Text style={styles.flameIcon}>🔥</Text>
              </View>
            )} 
          />
          <Card.Content>
            {params.selectedGoals == undefined && 
            <Text style={styles.bodyText}>
              Plan your learning journey and track progress!
            </Text> 
            }    
            {params.selectedGoals !== undefined && 
            <TouchableOpacity onPress={() => router.push('/rewards/select-learning-goals')}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            }
              {params.selectedGoals == undefined ? (
            <Button
              mode="contained"
              onPress={() => router.push('/rewards/select-learning-goals')}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Add your courses
            </Button>) : ( <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.coursesScroll}
            >
              {courses.map((course) => (
                <View key={course.key} style={styles.courseCard}>
                  <Text style={styles.courseTitle}>{course.label}</Text>
                  <AnimatedCircularProgress
                    size={80}
                    width={6}
                    fill={course.progress * 100} // convert 0-1 value to percentage
                    tintColor="#4CAF50"
                    backgroundColor="#E0E0E0"
                    rotation={0}
                    lineCap="round"
                    style={styles.circularProgress}
                  >
                    {(fill) => (
                      <Text style={styles.progressText}>
                        {Math.round(fill)}%
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                  <Text style={styles.completedText}>
                    {Math.round(course.progress * 100)}% Completed
                  </Text>
                  <Button
                    mode="contained"
                    style = {styles.courseButton}
                    onPress={() =>
                      router.push({
                        pathname: '/rewards/[quiz]',
                        params: { quiz: course.label }
                      })
                    }
                  >
                    Continue
                  </Button>
                </View>
              ))}
            </ScrollView> )}
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
  cardTitle :{
    fontWeight: 'bold',
    fontSize: 16
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
    borderRadius: 4,    
    color: "#18B67C",
    backgroundColor: "#E8E8E8"
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
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
    backgroundColor: "#18B67C",
  },
  buttonLabel: {
    paddingHorizontal: 8,
    fontWeight: "bold",
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
  },
  coursesScroll: {
    marginTop: 20,
  },
  courseCard: {
    width: 140,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseTitle: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  circularProgress: {
    marginVertical: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#000',
  },
  completedText: {
    fontSize: 12,
    color: '#888',
  },
  strikeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1', // a light gray box color
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 16, // some extra space on the right if needed
  },
  strikeCount: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  flameIcon: {
    fontSize: 20,
  },
  courseButton: {
    marginTop: 8,
    backgroundColor: '#18B67C'
  },
  editText: {
    position: 'absolute',
    right: 8,
    color: '#1C4733',
  },
});
