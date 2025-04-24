import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  RadioButton,
} from 'react-native-paper';


const titleOptions = ['Mr', 'Mrs', 'Miss', 'Dr', 'Other'];
const occupationOptions = ['Full-time employed', 'Part-time employed', 'Student', 'Pensioner'];

export default function ProfileScreen() {
  const [form, setForm] = useState({
    title: 'Mr',
    firstName: 'Benjamin',
    lastName: 'Ahmed',
    dob: '04/03/1986',
    city: '3 Paula mission South Justin LL3 7XE',
    income: '3,837.85',
    budget: '1,423.00',
    occupation: 'Full-time employed',
  });

  return (
    <ScrollView style={styles.container}>
      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Please fill out your financial profile below:</Text>

        {/* Title Radio Group */}
        <Text style={styles.label}>Title</Text>
        <RadioButton.Group
          onValueChange={(value) => setForm({ ...form, title: value })}
          value={form.title}
        >
          <View style={styles.radioGroup}>
            {titleOptions.map((option) => (
              <View style={styles.radioItem} key={option}>
                <RadioButton value={option} color='#18B67C'/>
                <Text>{option}</Text>
              </View>
            ))}
          </View>
        </RadioButton.Group>

        {/* Text Inputs */}
        <TextInput
          label="First Name"
          mode="outlined"
          style={styles.input}
          value={form.firstName}
          activeOutlineColor='#18B67C'
          onChangeText={(text) => setForm({ ...form, firstName: text })}
        />
        <TextInput
          label="Last Name"
          mode="outlined"
          style={styles.input}
          value={form.lastName}
          activeOutlineColor='#18B67C'
          onChangeText={(text) => setForm({ ...form, lastName: text })}
        />
        <TextInput
          label="Date of Birth"
          mode="outlined"
          style={styles.input}
          value={form.dob}
          placeholder='dd/mm/yyyy'
          placeholderTextColor='#CFCFCF'
          activeOutlineColor='#18B67C'
          onChangeText={(text) => setForm({ ...form, dob: text })}
        />
        <TextInput
          label="Address"
          mode="outlined"
          style={styles.input}
          value={form.city}
          activeOutlineColor='#18B67C'
          onChangeText={(text) => setForm({ ...form, city: text })}
        />
        <TextInput
          label="Monthly Income"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          value={form.income}
          activeOutlineColor='#18B67C'
          onChangeText={(text) => setForm({ ...form, income: text })}
        />
        <TextInput
          label="Monthly Budget"
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          value={form.budget}
          activeOutlineColor='#18B67C'
          onChangeText={(text) => setForm({ ...form, budget: text })}
        />

        {/* Occupation Radio Group */}
        <Text style={styles.label}>Occupation</Text>
        <RadioButton.Group
          onValueChange={(value) => setForm({ ...form, occupation: value })}
          value={form.occupation}
        >
          <View style={styles.radioGroup}>
            {occupationOptions.map((option) => (
              <View style={styles.radioItem} key={option}>
                <RadioButton value={option} color='#18B67C'/>
                <Text>{option}</Text>
              </View>
            ))}
          </View>
        </RadioButton.Group>

        {/* Save Button */}
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Saved profile:', form)}
        >
          Save
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 16,
    marginTop:15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    backgroundColor: '#fff'
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 6,
    backgroundColor: "#18B67C",
  },
});
