import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  Card,
  Text,
  ProgressBar,
  Button,
} from 'react-native-paper';
import Greeting from '@/components/Greeting';
import { router, useLocalSearchParams } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
      title: 'Sainsbury',
      subtitle: 'Get A Free Meal Deal',
      image: require('../../assets/images/sainsbury_logo.png'),
    },
    {
      id: 2,
      title: 'Greggs',
      subtitle: 'Get A Free Drink',
      image: require('../../assets/images/greggs_logo.jpg'),
    },
  ];
  
  
  const moreOffers = [
    {
      id: 1,
      title: 'M&S',
      subtitle: 'Get 5% Cash back with Lloyds Bank',
      image: require('../../assets/images/ms_logo.png'),
    },
    {
      id: 2,
      title: 'Boots',
      subtitle: 'Get 10% off with Advantage Card',
      image: require('../../assets/images/boots_logo.png'),
    },
    {
      id: 3,
      title: 'The North Face',
      subtitle: 'Get 30% off on orders over £200',
      image: require('../../assets/images/the_north_face_logo.png'),
    },
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
        <View style={styles.offerRow}>
          {redeemOffers.map((offer) => (
            <View key={offer.id} style={styles.offerItem}>
              {/* Left: Logo Image */}
              <Image source={offer.image} style={styles.logoImage} />
              {/* Middle: Offer Subtitle */}
              <View style={styles.textContainer}>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
              </View>
              {/* Right: Tick Icon */}
              <FontAwesome6 name="check" size={24} color="#4CAF50" style={styles.lockIcon} />
            </View>
          ))}
        </View>
      </Card.Content>
        </Card>

        {/* More Offers */}
        <Card style={styles.card}>
        <Card.Title title="More Offers" />
          <Card.Content>
          <View style={styles.offerRow}>
            {moreOffers.map((offer) => (
              <View key={offer.id} style={styles.offerItem}>
                {/* Left: Logo Image */}
                <Image source={offer.image} style={styles.logoImage} />
                {/* Middle: Offer Subtitle */}
                <View style={styles.textContainer}>
                  <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                </View>
                {/* Right: Tick Icon */}
                <AntDesign name="lock1" size={24} style={styles.lockIcon} />
              </View>
            ))}
          </View>
        </Card.Content>
        </Card>
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
  offerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  offerCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    padding: 8,
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
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', // Adjust for 2 columns (or modify as needed)
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 12,
    marginVertical: 8,
    // Optionally add shadow/elevation for a card-like effect:
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  offerSubtitle: {
    fontSize: 14,
    color: '#000',
  },
  lockIcon: {
    // Additional styling if needed (e.g., margin)
    marginLeft: 8,
  },
});
