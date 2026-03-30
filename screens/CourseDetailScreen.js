import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from '@expo/vector-icons/MaterialIcons';
import { COLORS } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CourseDetailScreen({ route, navigation }) {
  const { course } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (course) {
      loadRating();
    }
  }, [course]);

  const loadRating = async () => {
    try {
      const data = await AsyncStorage.getItem(course.id);
      if (data) {
        const parsed = JSON.parse(data);
        setRating(parsed.rating || 0);
        setComment(parsed.comment || '');
      }
    } catch (error) {
      console.log('Error loading rating:', error);
    }
  };

  const saveRating = async () => {
    try {
      await AsyncStorage.setItem(
        course.id,
        JSON.stringify({ rating, comment })
      );
      setModalVisible(false);
      Alert.alert('Success', 'Your rating and comment have been saved.');
    } catch (error) {
      Alert.alert('Error', 'Could not save rating.');
    }
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  if (!course) {
    return (
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Course not found</Text>
        </View>
      </ImageBackground>
    );
  }

  // Build YouTube embed URL from videoId
  const videoId = course.videoId;
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`
    : null;

  const handleWebViewError = () => {
    setVideoLoading(false);
    setVideoError(true);
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.courseName}>{course.name}</Text>

        <Image
          source={course.image}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.description}>{course.description}</Text>

        {/* Video Player */}
        <View style={styles.videoContainer}>
          {videoLoading && !videoError && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.accent} />
              <Text style={styles.loadingText}>Loading video...</Text>
            </View>
          )}
          {videoError ? (
            <View style={styles.errorContainer}>
              <Icon name="videocam-off" size={48} color={COLORS.textSecondary} />
              <Text style={styles.errorTextVideo}>
                Failed to load video.{'\n'}Please check your internet connection.
              </Text>
            </View>
          ) : embedUrl ? (
            <WebView
              source={{ uri: embedUrl }}
              style={styles.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}
              mediaPlaybackRequiresUserAction={false}
              onLoadStart={() => {
                setVideoLoading(true);
                setVideoError(false);
              }}
              onLoad={() => setVideoLoading(false)}
              onError={handleWebViewError}
              onHttpError={handleWebViewError}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Icon name="video-library" size={48} color={COLORS.textSecondary} />
              <Text style={styles.errorTextVideo}>No video available for this course.</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.rateButton} onPress={() => setModalVisible(true)}>
          <Icon name="star" size={22} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.rateButtonText}>Rate this Course</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.backButtonText}>Back to Courses</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Rating Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate this Course</Text>
            <Text style={styles.modalSubtitle}>{course.name}</Text>

            <View style={styles.starsContainer}>
              {[...Array(5)].map((_, i) => (
                <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                  <Icon
                    name={i < rating ? 'star' : 'star-border'}
                    size={42}
                    color={i < rating ? COLORS.ratingActive : COLORS.ratingInactive}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {rating > 0 && (
              <Text style={styles.ratingLabel}>
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]} ({rating}/5)
              </Text>
            )}

            <TextInput
              style={styles.commentInput}
              placeholder="Leave a comment (optional)"
              placeholderTextColor={COLORS.textSecondary}
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveRating}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  imageStyle: { opacity: 0.55 },
  content: { padding: 20, paddingBottom: 100 },
  courseName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 32,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 26,
    marginBottom: 25,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 10,
    fontSize: 14,
  },
  errorContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTextVideo: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  rateButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: COLORS.accentDark,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.card,
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingLabel: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  commentInput: {
    width: '100%',
    backgroundColor: COLORS.background,
    color: COLORS.textPrimary,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    textAlignVertical: 'top',
    minHeight: 100,
    fontSize: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: COLORS.error,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});
