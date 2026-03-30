import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './constants/theme';

import HomeScreen from './screens/HomeScreen';
import FacultyScreen from './screens/FacultyScreen';
import CourseScreen from './screens/CourseScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import QuizScreen from './screens/QuizScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Faculties"
          component={FacultyScreen}
          options={{ title: 'Faculties' }}
        />
        <Stack.Screen
          name="Courses"
          component={CourseScreen}
          options={({ route }) => ({ title: route.params?.faculty?.name || 'Courses' })}
        />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={{ title: 'Course Details' }}
        />
        <Stack.Screen
          name="Career Quiz"
          component={QuizScreen}
          options={{ title: 'Career Quiz' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Search Courses' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
