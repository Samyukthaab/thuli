import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Onboarding: undefined;
  Quiz: undefined;
  Results: { preferences?: any };
  Recommendations: { recommendations: any[]; preferences?: any };
};

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StyleDNA™</Text>
      <Text style={styles.subtitle}>
        Discover your Visual Style Genome™
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={styles.buttonText}>Start Style Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6750A4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OnboardingScreen;
