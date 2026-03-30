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

export default function SearchScreen({ route, navigation }) {
  const initialQuery = route.params?.query || '';
  const [search, setSearch] = useState(initialQuery);

  const allCourses = faculties.flatMap(f =>
    f.courses.map(c => ({ ...c, facultyName: f.name }))
  );

  const filtered = search.trim()
    ? allCourses.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
      )
    : allCourses;

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
            placeholder="Search courses..."
            placeholderTextColor={COLORS.textSecondary}
            value={search}
            onChangeText={setSearch}
            autoFocus
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon name="close" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={60} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>No courses found for "{search}"</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('CourseDetail', { course: item })}
              >
                <Text style={styles.courseName}>{item.name}</Text>
                <Text style={styles.courseFaculty}>
                  <Icon name="school" size={13} color={COLORS.accent} /> {item.facultyName}
                </Text>
                <Text style={styles.courseDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.list}
          />
        )}
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
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
    ...SIZES.shadow,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  courseFaculty: {
    fontSize: 13,
    color: COLORS.accent,
    marginBottom: 6,
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
});
