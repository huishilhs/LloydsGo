import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Define types for the data structures
interface Checkpoint {
  complete: boolean;
  position: number;
}

interface Goal {
  name: string;
  progress: number;
  nextGoal: number;
  checkpoints: Checkpoint[];
}

interface MilestoneFundsData {
  totalSavedMonth: number;
  totalSavedYear: number;
  goals: Goal[];
}

const MilestoneFunds: React.FC = () => {
  // Mock data - in a real app you would fetch this or pass as props
  const data: MilestoneFundsData = {
    totalSavedMonth: 101.46,
    totalSavedYear: 1307.52,
    goals: [
      {
        name: 'Travel to Bali',
        progress: 0.6, // 60% progress
        nextGoal: 100,
        checkpoints: [
          { complete: true, position: 0.2 },
          { complete: true, position: 0.4 },
          { complete: false, position: 0.6 },
          { complete: false, position: 0.9 }
        ]
      },
      {
        name: 'Sophie\'s birthday gift',
        progress: 0.3, // 30% progress
        nextGoal: 20,
        checkpoints: [
          { complete: true, position: 0.25 },
          { complete: false, position: 0.5 },
          { complete: false, position: 0.75 }
        ]
      }
    ]
  };

  // Render progress bar for a goal
  const renderProgressBar = (goal: Goal): React.ReactElement => {
    return (
      <View style={styles.progressBarContainer}>
        {/* Base progress bar (gray background) */}
        <View style={styles.progressBarBackground}>
          {/* Filled progress bar (green) */}
          <View style={[styles.progressBarFill, { width: `${goal.progress * 100}%` }]} />
          
          {/* Checkpoints */}
          {goal.checkpoints.map((checkpoint, index) => (
            <View 
              key={index} 
              style={[
                styles.checkpoint,
                { left: `${checkpoint.position * 100}%` },
                checkpoint.complete ? styles.checkpointComplete : styles.checkpointIncomplete
              ]}
            >
              {checkpoint.complete && (
                <View style={styles.checkMark}>
                  <Text style={styles.checkMarkText}>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        
        {/* Next goal label */}
        <View style={[styles.nextGoalContainer, { left: `${goal.progress * 100}%` }]}>
          <Text style={styles.nextGoalText}>next goal: £{goal.nextGoal}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Milestone Funds</Text>
        <TouchableOpacity>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.savedText}>So far, you've saved</Text>

      <View style={styles.amountsContainer}>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>£{data.totalSavedMonth}</Text>
          <Text style={styles.periodText}>This month</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>£{data.totalSavedYear}</Text>
          <Text style={styles.periodText}>This year</Text>
        </View>
      </View>

      <View>
        {data.goals.map((goal, index) => (
          <View key={index} style={styles.goalItem}>
            <Text style={styles.goalName}>{goal.name}</Text>
            {renderProgressBar(goal)}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  editButton: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  logo: {
    width: 80,
    height: 80,
  },
  savedText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  amountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountBox: {
    flex: 1,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  periodText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    width: 1,
    height: 80,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  goalItem: {
    marginBottom: 35,
  },
  goalName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressBarContainer: {
    marginTop: 5,
    height: 40,
    position: 'relative',
  },
  progressBarBackground: {
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#4C8450',
    borderRadius: 8,
  },
  checkpoint: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    top: 0,
    marginLeft: -8,
  },
  checkpointComplete: {
    backgroundColor: '#4C8450',
    zIndex: 2,
  },
  checkpointIncomplete: {
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  checkMark: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  checkMarkText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  nextGoalContainer: {
    position: 'absolute',
    bottom: -30,
    backgroundColor: '#4C8450',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    transform: [{ translateX: -50 }],
  },
  nextGoalText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MilestoneFunds;