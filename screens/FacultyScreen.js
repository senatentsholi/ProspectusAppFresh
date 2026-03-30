import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { faculties } from '../data/faculties';
import Icon from '@expo/vector-icons/MaterialIcons';

// Color mapping for each faculty
const facultyColors = {
  'Faculty of Information and Communication Technology': '#4A90E2',
  'Faculty of Business and Globalization': '#50E3C2',
  'Faculty of Design Innovation': '#F5A623',
  'Faculty of Communication, Media and Broadcasting': '#7ED321',
  'Faculty of Architecture and the Built Environment': '#BD10E0',
};

// Icon mapping
const facultyIcons = {
  'Faculty of Information and Communication Technology': 'computer',
  'Faculty of Business and Globalization': 'business',
  'Faculty of Design Innovation': 'brush',
  'Faculty of Communication, Media and Broadcasting': 'mic',
  'Faculty of Architecture and the Built Environment': 'apartment',
};

export default function FacultyScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const filteredFaculties = faculties.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: facultyColors[item.name] || COLORS.accent }]}
      onPress={() => navigation.navigate('Courses', { faculty: item })}
    >
      <Icon name={facultyIcons[item.name] || 'school'} size={50} color="#fff" />
      <Text style={styles.facultyName} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search faculties..."
            placeholderTextColor={COLORS.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={filteredFaculties}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  imageStyle: { opacity: 0.55 },
  container: { flex: 1, padding: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.accent,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    paddingVertical: 12,
    fontSize: 16,
    marginLeft: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    ...SIZES.shadow,
  },
  facultyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
});
