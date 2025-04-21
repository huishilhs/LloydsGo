import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  Checkbox,
  Button
} from 'react-native-paper';

// Example list of learning goals
const goalsData = [
  { key: 'budgeting', label: 'Budgeting and Expense Tracking' },
  { key: 'saving', label: 'Saving and emergency fund' },
  { key: 'debt', label: 'Debt Management' },
  { key: 'investment', label: 'Investment Basics' },
  { key: 'retirement', label: 'Retirement Plan' },
  { key: 'taxes', label: 'Taxes' },
  { key: 'frugality', label: 'Smart Spending & Frugality' },
  { key: 'loan', label: 'Education Loan' }
];

  const SelectLearningGoalsScreen = () => {
    const [selectedGoals, setSelectedGoals] = useState<Record<string, boolean>>({});
  
    const handleToggle = (goalKey: string) => {
      setSelectedGoals((prev) => ({
        ...prev,
        [goalKey]: !prev[goalKey],
      }));
    };

    const handleSave = () => {
      // Convert selectedGoals to JSON and pass as a query parameter when navigating back to rewards.
      const selectedGoalsJSON = JSON.stringify(selectedGoals);
      router.push({
        pathname: '/rewards',
        params: { selectedGoals: selectedGoalsJSON },
      });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.card}>
          <Card.Content>
          {goalsData.map((goal) => {
            const isChecked = !!selectedGoals[goal.key];
            return (
              <View key={goal.key} style={styles.goalRow}>
                <Text style={styles.goalLabel}>{goal.label}</Text>
                <Checkbox
                  status={isChecked ? 'checked' : 'unchecked'}
                  onPress={() => handleToggle(goal.key)}
                  color="#18B67C"
                />
              </View>
            );
          })}
        </Card.Content>
          </Card>
          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
            Save
          </Button>
        </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    card: {
      borderRadius: 12,
      paddingVertical: 8,
      backgroundColor: '#FFF'
    },
    goalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    goalLabel: {
      flex: 1,
      marginRight: 8,
    },
    saveButton: {
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: '#18B67C'
    },
  });
  
  export default SelectLearningGoalsScreen;