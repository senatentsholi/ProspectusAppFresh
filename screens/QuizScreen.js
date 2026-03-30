import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import { faculties } from '../data/faculties';

export default function QuizScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ ict: 0, business: 0, design: 0, comm: 0, arch: 0 });
  const [result, setResult] = useState('');

  const questions = [
    { text: 'Do you enjoy technology and coding?', options: ['Yes (ICT)', 'No'] },
    { text: 'Are you interested in business and global markets?', options: ['Yes (Business)', 'No'] },
    { text: 'Do you like creative design and art?', options: ['Yes (Design)', 'No'] },
    { text: 'Do you prefer media, journalism, or communication?', options: ['Yes (Communication)', 'No'] },
    { text: 'Are you drawn to architecture and building?', options: ['Yes (Architecture)', 'No'] },
    { text: 'Do you like working with data analytics and AI?', options: ['Yes (ICT)', 'No'] },
    { text: 'Are you passionate about marketing and entrepreneurship?', options: ['Yes (Business)', 'No'] },
    { text: 'Do you enjoy fashion design or interior styling?', options: ['Yes (Design)', 'No'] },
    { text: 'Interested in film production and broadcasting?', options: ['Yes (Communication)', 'No'] },
    { text: 'Do you like structural engineering and construction?', options: ['Yes (Architecture)', 'No'] },
  ];

  const handleAnswer = (answer) => {
    const newScores = { ...scores };

    if (answer.startsWith('Yes')) {
      const facultyKey = answer
        .split(' ')[1]
        .toLowerCase()
        .replace('(', '')
        .replace(')', '');
      newScores[facultyKey] = (newScores[facultyKey] || 0) + 1;
    }

    setScores(newScores);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Find the highest-scoring faculty
      let maxScore = -1;
      let recommendedKey = null;
      Object.entries(newScores).forEach(([key, score]) => {
        if (score > maxScore) {
          maxScore = score;
          recommendedKey = key;
        }
      });

      const recommendedFaculty = faculties.find(f => {
        const nameLower = f.name.toLowerCase();
        if (recommendedKey === 'ict') return nameLower.includes('information') || nameLower.includes('technology') || nameLower.includes('ict');
        if (recommendedKey === 'business') return nameLower.includes('business') || nameLower.includes('globalization');
        if (recommendedKey === 'design') return nameLower.includes('design') || nameLower.includes('innovation');
        if (recommendedKey === 'comm') return nameLower.includes('communication') || nameLower.includes('media') || nameLower.includes('broadcasting');
        if (recommendedKey === 'arch') return nameLower.includes('architecture') || nameLower.includes('built');
        return false;
      });

      let suggestion = 'No strong match found – explore all faculties!';
      if (recommendedFaculty) {
        const facultyName = recommendedFaculty.name;
        const overview = recommendedFaculty.overview || 'A dynamic faculty offering cutting-edge programs.';
        const courseList = recommendedFaculty.courses
          ? recommendedFaculty.courses.map(c => `• ${c.name}`).join('\n')
          : 'No courses listed yet.';

        suggestion = `🎯 Based on your answers, we recommend:\n\n${facultyName}\n\nDescription:\n${overview}\n\nSuitable Courses for You:\n${courseList}\n\nThese programs perfectly match your interests! Tap the button below to explore videos and rate the courses.`;
      }

      setResult(suggestion);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setScores({ ict: 0, business: 0, design: 0, comm: 0, arch: 0 });
    setResult('');
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        {step < questions.length ? (
          <>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              {questions.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.progressDot,
                    i <= step && { backgroundColor: COLORS.accent },
                  ]}
                />
              ))}
            </View>

            <Text style={styles.question}>
              Question {step + 1} of {questions.length}
            </Text>
            <Text style={styles.questionText}>{questions[step].text}</Text>

            <View style={styles.options}>
              {questions[step].options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    option.startsWith('Yes') && styles.yesButton,
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      option.startsWith('Yes') && styles.yesText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Your Personalised Recommendation</Text>
            <ScrollView style={styles.resultScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.resultText}>{result}</Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Faculties')}
            >
              <Text style={styles.exploreButtonText}>Explore Faculties Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.retakeButton}
              onPress={resetQuiz}
            >
              <Text style={styles.retakeButtonText}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  imageStyle: { opacity: 0.55 },
  container: {
    flex: 1,
    padding: SIZES.padding * 2,
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 6,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.border,
    margin: 3,
  },
  question: {
    fontSize: 16,
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
  },
  options: { width: '100%' },
  optionButton: {
    backgroundColor: COLORS.card,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius * 2,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    ...SIZES.shadow,
  },
  yesButton: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.card,
  },
  optionText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '500',
  },
  yesText: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  resultContainer: {
    backgroundColor: COLORS.card,
    padding: 24,
    borderRadius: SIZES.radius * 2,
    borderWidth: 2,
    borderColor: COLORS.accent,
    ...SIZES.shadow,
    flex: 1,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 20,
    textAlign: 'center',
  },
  resultScroll: { flex: 1, marginBottom: 20 },
  resultText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 26,
  },
  exploreButton: {
    backgroundColor: COLORS.button,
    paddingVertical: 16,
    borderRadius: SIZES.radius * 2,
    alignItems: 'center',
    marginBottom: 12,
  },
  exploreButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  retakeButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: SIZES.radius * 2,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  retakeButtonText: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
  },
});
