// app/quiz.tsx
import React, { useState } from 'react';
import {  Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import questionsData from './../../assets/data/questionsData.json'
import { color } from '@rneui/themed/dist/config';


type Question = {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
  };
  
  type CourseQuestions = {
    course: string;
    questions: Question[];
  };
  
  export default function QuizScreen() {
    // Retrieve the dynamic route parameter (course name)
    // Retrieve route parameters: quiz (course name) and optionally existing progress in selectedGoals
  const params = useLocalSearchParams<{ quiz: string; selectedGoals?: string }>();
  const { quiz } = params;
  
    // Filter the questions data for the selected course (case-insensitive)
    const courseData: CourseQuestions | undefined = questionsData.find(
      (item: CourseQuestions) => item.course.toLowerCase() === quiz.toLowerCase()
    );
  
    const questions: Question[] = courseData?.questions || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const currentQuestion = questions[currentIndex];
  
    if (!currentQuestion) {
      return (
        <View style={styles.container}>
          <Text>No questions available for {quiz}.</Text>
        </View>
      );
    }
  
    const handleAnswerPress = (index: number) => {
      if (index === currentQuestion.correctAnswerIndex) {
        setFeedback('Correct!');
      } else {
        setFeedback(
          `Incorrect! The correct answer is: ${currentQuestion.answers[currentQuestion.correctAnswerIndex]}`
        );
      }
    };
  
    const handleNext = () => {
        setFeedback(null);
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // All questions answered—update progress for this course to 100%
          let existingProgressObj: any = {};
          if (params.selectedGoals) {
            try {
              existingProgressObj = JSON.parse(params.selectedGoals);
            } catch (e) {
              existingProgressObj = {};
            }
          }
          // Normalize all keys to lower-case
          const normalizedProgress: Record<string, number> = {};
          Object.keys(existingProgressObj).forEach((key) => {
            normalizedProgress[key.toLowerCase()] =
              typeof existingProgressObj[key] === 'number'
                ? existingProgressObj[key]
                : 0;
          });
          // Update progress for the current course using the lower-case key
          normalizedProgress[quiz.toLowerCase()] = 1;
          const updatedProgressJSON = JSON.stringify(normalizedProgress);

          router.replace(`/rewards?selectedGoals=${encodeURIComponent(updatedProgressJSON)}`);
        }
      };
      
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Set the header title dynamically */}
        <Stack.Screen options={{ title: quiz }} />
  
        <Card style={styles.card}>
          <Card.Title title={currentQuestion.question} />
          <Card.Content>
            {currentQuestion.answers.map((answer, idx) => (
              <Button
                key={idx}
                mode="contained"
                onPress={() => handleAnswerPress(idx)}
                style={styles.answerButton}
              >
                <Text
                style={styles.answerText}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {answer}
            </Text>
              </Button>
            ))}
            {feedback && <Text 
            style={[
                styles.feedbackText,
                feedback === 'Correct!' ? styles.correctText : styles.incorrectText,
              ]}
            >{feedback}</Text>}
          </Card.Content>
          {feedback && (
            <Card.Actions style={styles.cardActions}>
              <Button mode="contained" onPress={handleNext} style={styles.action}>
                <Text style={styles.actionButton}>Next</Text>
              </Button>
            </Card.Actions>
          )}
        </Card>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      flexGrow: 1,
      justifyContent: 'center',
    },
    card: {
      borderRadius: 8,
      padding: 16,
      backgroundColor: "#FFF",
    },
    answerButton: {
      marginVertical: 10,
      backgroundColor: "#F8F7F7",
      borderRadius: 5
    },
    answerText: {
        fontSize: 16,
        color: '#000000',
        flexShrink: 1,
        textAlign: 'center',
      },
    feedbackText: {
      marginTop: 16,
      fontSize: 18,
      textAlign: 'center',
    },
    cardActions: {
      justifyContent: 'center',
      marginTop: 16,
    },
    action: {
        backgroundColor: '#18B67C'
    },
    actionButton: {
        color: '#1C4733'
    },
    correctText: {
        color: '#1C4733',
      },
      incorrectText: {
        color: 'red',
      },
  });
  