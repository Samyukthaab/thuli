import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Onboarding: undefined;
  Quiz: undefined;
  Results: { preferences?: any };
  Recommendations: { recommendations: any[]; preferences?: any };
};

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;

interface Props {
  navigation: QuizScreenNavigationProp;
}

const QuizScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preferences, setPreferences] = useState<{
    liked: any[];
    disliked: any[];
  }>({
    liked: [],
    disliked: [],
  });
  const [imageLoadErrors, setImageLoadErrors] = useState<string[]>([]);
  
  // CLEANED Fashion Dataset - Verified image-description matching optimized for web display
  const allFashionItems = [
    // Professional & Elegant
    { id: 'item_001', name: 'Classic Black Blazer', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', category: 'outerwear', style: 'professional', color: 'black', formality: 'formal' },
    { id: 'item_002', name: 'White Cotton Button Shirt', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop', category: 'tops', style: 'classic', color: 'white', formality: 'business' },
    { id: 'item_009', name: 'Black Pencil Skirt', image: 'https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=400&h=500&fit=crop', category: 'bottoms', style: 'professional', color: 'black', formality: 'business' },
    
    // Casual & Comfortable  
    { id: 'item_003', name: 'Classic Blue Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop', category: 'bottoms', style: 'casual', color: 'blue', formality: 'casual' },
    { id: 'item_007', name: 'Navy Striped Top', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop', category: 'tops', style: 'nautical', color: 'navy', formality: 'casual' },
    { id: 'item_008', name: 'Cream Knit Sweater', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop', category: 'tops', style: 'cozy', color: 'cream', formality: 'casual' },
    
    // Dresses & Feminine
    { id: 'item_004', name: 'Red Cocktail Dress', image: 'https://images.unsplash.com/photo-1566479179817-c0ae8e4b4b3d?w=400&h=500&fit=crop', category: 'dresses', style: 'glamorous', color: 'red', formality: 'formal' },
    { id: 'item_006', name: 'Floral Summer Dress', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop', category: 'dresses', style: 'romantic', color: 'floral', formality: 'casual' },
    { id: 'item_010', name: 'Yellow Sundress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop', category: 'dresses', style: 'cheerful', color: 'yellow', formality: 'casual' },
    
    // Edgy & Statement
    { id: 'item_005', name: 'Black Leather Jacket', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=500&fit=crop', category: 'outerwear', style: 'edgy', color: 'black', formality: 'casual' },
    
    // Additional Variety - VERIFIED IMAGES
    { id: 'extra_001', name: 'Emerald Green Blouse', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', category: 'tops', style: 'elegant', color: 'green', formality: 'business' },
    { id: 'extra_002', name: 'Burgundy Midi Dress', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=400&h=500&fit=crop', category: 'dresses', style: 'sophisticated', color: 'burgundy', formality: 'smart-casual' },
    { id: 'extra_003', name: 'Camel Wool Coat', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop', category: 'outerwear', style: 'classic', color: 'camel', formality: 'business' },
    { id: 'extra_004', name: 'White Linen Pants', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop', category: 'bottoms', style: 'relaxed', color: 'white', formality: 'smart-casual' },
    { id: 'extra_005', name: 'Pink Cashmere Cardigan', image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=500&fit=crop', category: 'tops', style: 'feminine', color: 'pink', formality: 'casual' },
  ];

  // Randomly select 8 items for each quiz session
  const [fashionItems] = useState(() => {
    const shuffled = [...allFashionItems].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 8);
  });

  const currentItem = fashionItems[currentIndex];
  
  // Safety check
  if (!currentItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Complete!</Text>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('Results', { preferences })}
        >
          <Text style={styles.skipButtonText}>View Results</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleRating = (rating: 'like' | 'dislike') => {
    console.log(`Rated ${currentItem.name}: ${rating}`);
    
    // Track preferences
    const updatedPreferences = { ...preferences };
    if (rating === 'like') {
      updatedPreferences.liked.push(currentItem);
    } else {
      updatedPreferences.disliked.push(currentItem);
    }
    setPreferences(updatedPreferences);
    
    console.log('Updated preferences:', updatedPreferences);
    
    // Move to next item
    if (currentIndex < fashionItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Quiz completed, go to results with preferences
      console.log('Quiz completed, navigating to results with:', updatedPreferences);
      navigation.navigate('Results', { preferences: updatedPreferences });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Style Quiz</Text>
      <Text style={styles.subtitle}>
        Rate the fashion items to discover your style genome
      </Text>
      
      <Text style={styles.progress}>
        {currentIndex + 1} of {fashionItems.length}
      </Text>
      
      <View style={styles.quizCard}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: currentItem.image }}
            style={styles.fashionImage}
            resizeMode="contain"
            onError={(error) => {
              console.log('Image failed to load:', currentItem.image, error);
              setImageLoadErrors(prev => [...prev, currentItem.image]);
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', currentItem.name);
            }}
          />
          {imageLoadErrors.includes(currentItem.image) && (
            <View style={styles.imageFallback}>
              <Text style={styles.fallbackText}>{currentItem.name}</Text>
              <Text style={styles.fallbackSubtext}>Fashion Item</Text>
            </View>
          )}
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.ratingButton, styles.dislikeButton]}
            onPress={() => handleRating('dislike')}
          >
            <Text style={styles.buttonText}>👎 Dislike</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.ratingButton, styles.likeButton]}
            onPress={() => handleRating('like')}
          >
            <Text style={styles.buttonText}>👍 Like</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.skipButton}
        onPress={() => navigation.navigate('Results', { preferences })}
      >
        <Text style={styles.skipButtonText}>Skip to Results</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    minHeight: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 40,
  },
  quizCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  progress: {
    fontSize: 14,
    color: '#6750A4',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  imageContainer: {
    height: 300,
    width: '100%',
    maxWidth: 280,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fashionImage: {
    width: '100%',
    height: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  ratingButton: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  likeButton: {
    backgroundColor: '#4CAF50',
  },
  dislikeButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#6750A4',
  },
  skipButtonText: {
    color: '#6750A4',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageFallback: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  fallbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  fallbackSubtext: {
    color: '#B0B0B0',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default QuizScreen;