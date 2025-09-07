import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import OnboardingScreen from '../screens/OnboardingScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';

export type RootStackParamList = {
    Onboarding: undefined;
    Quiz: undefined;
    Results: { preferences?: any };
    Recommendations: { recommendations: any[]; preferences?: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Onboarding"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1a1a1a',
                    },
                    headerTintColor: '#e6e1e5',
                    headerTitleStyle: {
                        fontSize: 22,
                        fontWeight: '600',
                    },
                    cardStyle: {
                        backgroundColor: '#121212',
                    },
                }}
            >
                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{
                        title: 'StyleDNA™',
                        headerShown: true
                    }}
                />

                <Stack.Screen
                    name="Quiz"
                    component={QuizScreen}
                    options={{
                        title: 'Style Assessment',
                        headerShown: true
                    }}
                />

                <Stack.Screen
                    name="Results"
                    component={ResultsScreen}
                    options={{
                        title: 'Your Style DNA™',
                        headerShown: true
                    }}
                />

                <Stack.Screen
                    name="Recommendations"
                    component={RecommendationsScreen}
                    options={{
                        title: 'Recommendations',
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
