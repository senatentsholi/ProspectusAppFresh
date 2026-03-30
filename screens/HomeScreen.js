import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Icon from '@expo/vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Search', { query: searchQuery });
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        {/* Header with logo and welcome */}
        <View style={styles.header}>
          <Image
            source={require('../assets/icon.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcome}>Welcome to Limkokwing Prospectus</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        {/* Three main buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Faculties')}>
            <Icon name="school" size={40} color="#000" />
            <Text style={styles.buttonLabel}>Faculties</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.squareButton} onPress={() => navigation.navigate('Career Quiz')}>
            <Icon name="quiz" size={40} color="#000" />
            <Text style={styles.buttonLabel}>Career Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.squareButton} onPress={() => setModalVisible(true)}>
            <Icon name="info" size={40} color="#000" />
            <Text style={styles.buttonLabel}>About</Text>
          </TouchableOpacity>
        </View>

        {/* About Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>About the App</Text>
              <ScrollView style={styles.modalScroll}>
                <Text style={styles.modalText}>
                  Welcome to Limkokwing University Prospectus App!{'\n\n'}
                  Explore faculties, watch course videos, rate courses, and take the career quiz for personalised recommendations.{'\n\n'}
                  Navigate through 5 faculties with 25 courses total. Each course includes a description, an embedded YouTube video, and a rating system.{'\n\n'}
                  Built with React Native & Expo for Mobile Device Programming.
                </Text>
              </ScrollView>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  imageStyle: { opacity: 0.55 },
  container: { flex: 1, padding: 24 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 10,
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
    flexWrap: 'wrap',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.accent,
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  searchIcon: { marginRight: 8 },
  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    paddingVertical: 14,
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  squareButton: {
    width: 110,
    height: 110,
    backgroundColor: COLORS.button,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    ...SIZES.shadow,
  },
  buttonLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.card,
    width: '88%',
    borderRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalScroll: { maxHeight: 300 },
  modalText: {
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.textSecondary,
  },
  closeButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
