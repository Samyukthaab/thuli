import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Onboarding: undefined;
  Quiz: undefined;
  Results: { preferences?: any };
  Recommendations: { recommendations: any[]; preferences?: any };
};

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

// Helper function to find most frequent item in array
const getMostFrequent = (arr: string[]) => {
  if (arr.length === 0) return '';
  const frequency: { [key: string]: number } = {};
  arr.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
  });
  return Object.keys(frequency).reduce((a, b) => (frequency[a] || 0) > (frequency[b] || 0) ? a : b, '');
};

const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const preferences = route.params?.preferences || { liked: [], disliked: [] };

  console.log('ResultsScreen received preferences:', preferences);

  // CLEANED Fashion Dataset - Verified image-description matching
  const allFashionItems = [
    // Professional & Elegant
    { id: 'item_001', name: 'Classic Black Blazer', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop&crop=center', category: 'outerwear', style: 'professional', color: 'black', formality: 'formal' },
    { id: 'item_002', name: 'White Cotton Button Shirt', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&h=400&fit=crop&crop=center', category: 'tops', style: 'classic', color: 'white', formality: 'business' },
    { id: 'item_009', name: 'Black Pencil Skirt', image: 'https://images.unsplash.com/photo-1506629905607-d405d7d3b880?w=300&h=400&fit=crop&crop=center', category: 'bottoms', style: 'professional', color: 'black', formality: 'business' },

    // Casual & Comfortable  
    { id: 'item_003', name: 'Classic Blue Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop&crop=center', category: 'bottoms', style: 'casual', color: 'blue', formality: 'casual' },
    { id: 'item_007', name: 'Navy Striped Top', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop&crop=center', category: 'tops', style: 'nautical', color: 'navy', formality: 'casual' },
    { id: 'item_008', name: 'Cream Knit Sweater', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop&crop=center', category: 'tops', style: 'cozy', color: 'cream', formality: 'casual' },

    // Dresses & Feminine
    { id: 'item_004', name: 'Red Cocktail Dress', image: 'https://images.unsplash.com/photo-1566479179817-c0ae8e4b4b3d?w=300&h=400&fit=crop&crop=center', category: 'dresses', style: 'glamorous', color: 'red', formality: 'formal' },
    { id: 'item_006', name: 'Floral Summer Dress', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop&crop=center', category: 'dresses', style: 'romantic', color: 'floral', formality: 'casual' },
    { id: 'item_010', name: 'Yellow Sundress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop&crop=center', category: 'dresses', style: 'cheerful', color: 'yellow', formality: 'casual' },

    // Edgy & Statement
    { id: 'item_005', name: 'Black Leather Jacket', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=300&h=400&fit=crop&crop=center', category: 'outerwear', style: 'edgy', color: 'black', formality: 'casual' },

    // Additional Variety
    { id: 'extra_001', name: 'Emerald Silk Blouse', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop&crop=center', category: 'tops', style: 'elegant', color: 'green', formality: 'business' },
    { id: 'extra_002', name: 'Burgundy Midi Dress', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=300&h=400&fit=crop&crop=center', category: 'dresses', style: 'sophisticated', color: 'burgundy', formality: 'smart-casual' },
    { id: 'extra_003', name: 'Camel Wool Coat', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop&crop=center', category: 'outerwear', style: 'classic', color: 'camel', formality: 'business' },
    { id: 'extra_004', name: 'White Linen Pants', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop', category: 'bottoms', style: 'relaxed', color: 'white', formality: 'smart-casual' },
    { id: 'extra_005', name: 'Pink Cashmere Cardigan', image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=300&h=400&fit=crop&crop=center', category: 'tops', style: 'feminine', color: 'pink', formality: 'casual' },
  ];

  // Generate dynamic style genome based on user preferences
  const styleGenome = useMemo(() => {
    const liked = preferences.liked || [];
    const disliked = preferences.disliked || [];

    console.log('Generating style genome for preferences:', { liked, disliked });

    if (liked.length === 0) {
      return {
        chromatic: 'Neutral & Balanced',
        silhouette: 'Classic & Versatile',
        texture: 'Mixed Preferences',
        context: 'Adaptable Style',
        confidence: 0.3,
        description: 'Complete the quiz to discover your unique style DNA!'
      };
    }

    // Analyze liked items
    const likedColors = liked.map((item: any) => item.color);
    const likedStyles = liked.map((item: any) => item.style);
    const likedCategories = liked.map((item: any) => item.category);
    const likedFormality = liked.map((item: any) => item.formality);

    // Determine dominant preferences
    const dominantColor = getMostFrequent(likedColors) || 'varied';
    const dominantStyle = getMostFrequent(likedStyles) || 'eclectic';
    const dominantFormality = getMostFrequent(likedFormality) || 'versatile';

    console.log('Dominant preferences:', { dominantColor, dominantStyle, dominantFormality });

    // Generate chromatic preference
    let chromatic = 'Neutral & Balanced';
    if (dominantColor === 'black') chromatic = 'Bold & Dramatic';
    else if (dominantColor === 'blue') chromatic = 'Cool & Sophisticated';
    else if (dominantColor === 'white') chromatic = 'Clean & Minimalist';
    else if (dominantColor === 'red') chromatic = 'Warm & Vibrant';
    else if (dominantColor === 'beige') chromatic = 'Earthy & Natural';
    else if (dominantColor === 'striped') chromatic = 'Playful & Patterned';

    // Generate silhouette preference
    let silhouette = 'Classic & Versatile';
    if (dominantStyle === 'elegant') silhouette = 'Refined & Structured';
    else if (dominantStyle === 'edgy') silhouette = 'Bold & Angular';
    else if (dominantStyle === 'minimalist') silhouette = 'Clean & Simple';
    else if (dominantStyle === 'casual') silhouette = 'Relaxed & Comfortable';
    else if (dominantStyle === 'formal') silhouette = 'Sophisticated & Tailored';
    else if (dominantStyle === 'cozy') silhouette = 'Soft & Comfortable';
    else if (dominantStyle === 'classic') silhouette = 'Timeless & Elegant';

    // Generate texture preference
    let texture = 'Mixed Textures';
    if (likedCategories.includes('outerwear')) texture = 'Structured & Layered';
    else if (likedCategories.includes('dresses')) texture = 'Flowing & Feminine';
    else if (likedCategories.includes('tops')) texture = 'Versatile & Adaptable';
    else if (likedCategories.includes('bottoms')) texture = 'Structured & Practical';

    // Generate context preference
    let context = 'Adaptable Style';
    if (dominantFormality === 'business') context = 'Professional & Polished';
    else if (dominantFormality === 'casual') context = 'Relaxed & Approachable';
    else if (dominantFormality === 'formal') context = 'Elegant & Sophisticated';
    else if (dominantFormality === 'smart-casual') context = 'Versatile & Modern';

    const confidence = Math.min(0.9, 0.4 + (liked.length * 0.1));

    return {
      chromatic,
      silhouette,
      texture,
      context,
      confidence,
      description: `Based on your ${liked.length} likes, you prefer ${dominantStyle} styles with ${dominantColor} tones.`
    };
  }, [preferences]);

  // Generate personalized recommendations from the dataset
  const recommendedItems = useMemo(() => {
    console.log('Generating recommendations, preferences:', preferences);

    const liked = preferences.liked || [];
    const disliked = preferences.disliked || [];

    // Get IDs of items already shown in quiz to exclude them
    const seenItemIds = [...liked, ...disliked].map((item: any) => item.id);

    // Default curated recommendations for new users
    const defaultRecommendations = [
      allFashionItems.find(item => item.name === 'Red Cocktail Dress'),
      allFashionItems.find(item => item.name === 'Classic Black Blazer'),
      allFashionItems.find(item => item.name === 'Burgundy Midi Dress'),
      allFashionItems.find(item => item.name === 'Emerald Silk Blouse'),
      allFashionItems.find(item => item.name === 'Camel Wool Coat'),
      allFashionItems.find(item => item.name === 'Pink Cashmere Cardigan'),
    ].filter(Boolean).map(item => ({ ...item, score: 8 }));

    if (liked.length === 0) {
      return defaultRecommendations;
    }

    // Analyze user preferences from liked items
    const likedColors = liked.map((item: any) => item.color);
    const likedStyles = liked.map((item: any) => item.style);
    const likedCategories = liked.map((item: any) => item.category);
    const likedFormality = liked.map((item: any) => item.formality);

    console.log('User preferences:', { likedColors, likedStyles, likedCategories, likedFormality });

    // Advanced scoring algorithm
    const scoredItems = allFashionItems
      .filter(item => !seenItemIds.includes(item.id)) // Exclude items already shown in quiz
      .map(item => {
        let score = 0;

        // Primary matching (exact matches get highest scores)
        if (likedColors.includes(item.color)) score += 4;
        if (likedStyles.includes(item.style)) score += 3;
        if (likedCategories.includes(item.category)) score += 2;
        if (likedFormality.includes(item.formality)) score += 2;

        // Secondary matching (similar attributes)
        // Color similarity
        if (likedColors.includes('black') && ['navy', 'burgundy'].includes(item.color)) score += 2;
        if (likedColors.includes('white') && ['cream', 'beige'].includes(item.color)) score += 2;
        if (likedColors.includes('blue') && ['navy'].includes(item.color)) score += 2;
        if (likedColors.includes('red') && ['burgundy', 'pink'].includes(item.color)) score += 2;

        // Style similarity
        if (likedStyles.includes('professional') && ['elegant', 'sophisticated', 'classic'].includes(item.style)) score += 2;
        if (likedStyles.includes('casual') && ['relaxed', 'cozy', 'nautical'].includes(item.style)) score += 2;
        if (likedStyles.includes('elegant') && ['professional', 'sophisticated', 'glamorous'].includes(item.style)) score += 2;
        if (likedStyles.includes('romantic') && ['feminine', 'cheerful'].includes(item.style)) score += 2;

        // Formality similarity
        if (likedFormality.includes('formal') && ['business'].includes(item.formality)) score += 1;
        if (likedFormality.includes('business') && ['smart-casual'].includes(item.formality)) score += 1;
        if (likedFormality.includes('casual') && ['smart-casual'].includes(item.formality)) score += 1;

        // Category diversity bonus (encourage variety)
        const likedCategoryCount = likedCategories.filter((cat: string) => cat === item.category).length;
        if (likedCategoryCount === 0 && score > 0) score += 1; // Bonus for new categories

        // Ensure minimum score for variety (but lower than matched items)
        if (score === 0) score = 0.5;

        return { ...item, score };
      })
      .sort((a, b) => b.score - a.score) // Sort by highest score first
      .slice(0, 4); // Take top 4 recommendations

    console.log('Generated recommendations:', scoredItems.map(item => ({ name: item.name, score: item.score })));

    // If we don't have enough recommendations, fill with defaults
    if (scoredItems.length < 4) {
      const additionalItems = defaultRecommendations
        .filter(defaultItem => !scoredItems.some(scored => scored.id === defaultItem.id))
        .slice(0, 4 - scoredItems.length);

      return [...scoredItems, ...additionalItems].slice(0, 4);
    }

    return scoredItems;
  }, [preferences, allFashionItems]);

  // Fallback recommendations if the main logic fails
  const fallbackRecommendations = [
    { id: 'fallback_1', name: 'Red Cocktail Dress', image: 'https://images.unsplash.com/photo-1566479179817-c0ae8e4b4b3d?w=300&h=400&fit=crop&crop=faces', style: 'glamorous', color: 'red', score: 8 },
    { id: 'fallback_2', name: 'Classic Black Blazer', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop&crop=faces', style: 'professional', color: 'black', score: 8 },
    { id: 'fallback_3', name: 'Floral Summer Dress', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop&crop=faces', style: 'romantic', color: 'floral', score: 8 },
    { id: 'fallback_4', name: 'Cream Knit Sweater', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop&crop=faces', style: 'cozy', color: 'cream', score: 8 },
  ];

  // Use fallback if no recommendations generated
  const finalRecommendations = recommendedItems.length > 0 ? recommendedItems : fallbackRecommendations;
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Your Style DNA™</Text>
        <Text style={styles.subtitle}>
          Based on your preferences, here's your style genome
        </Text>

        <View style={styles.genomeCard}>
          <Text style={styles.genomeTitle}>Visual Style Genome™</Text>

          <Text style={styles.description}>{styleGenome.description}</Text>

          <View style={styles.confidenceBar}>
            <Text style={styles.confidenceLabel}>Confidence Score</Text>
            <View style={styles.confidenceTrack}>
              <View
                style={[
                  styles.confidenceFill,
                  { width: `${styleGenome.confidence * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.confidenceText}>
              {Math.round(styleGenome.confidence * 100)}%
            </Text>
          </View>

          <View style={styles.traitRow}>
            <Text style={styles.traitLabel}>Chromatic Preference:</Text>
            <Text style={styles.traitValue}>{styleGenome.chromatic}</Text>
          </View>

          <View style={styles.traitRow}>
            <Text style={styles.traitLabel}>Silhouette Style:</Text>
            <Text style={styles.traitValue}>{styleGenome.silhouette}</Text>
          </View>

          <View style={styles.traitRow}>
            <Text style={styles.traitLabel}>Texture Affinity:</Text>
            <Text style={styles.traitValue}>{styleGenome.texture}</Text>
          </View>

          <View style={styles.traitRow}>
            <Text style={styles.traitLabel}>Context Match:</Text>
            <Text style={styles.traitValue}>{styleGenome.context}</Text>
          </View>

          <View style={styles.summarySection}>
            {preferences.liked?.length > 0 && (
              <>
                <Text style={styles.summaryTitle}>Your Preferences</Text>
                <Text style={styles.summaryText}>
                  ✅ Liked: {preferences.liked.length} items
                </Text>
                <Text style={styles.summaryText}>
                  ❌ Disliked: {preferences.disliked?.length || 0} items
                </Text>
              </>
            )}

            <View style={styles.recommendationsSection}>
              <Text style={styles.recommendationsTitle}>✨ Personalized Recommendations</Text>
              <Text style={styles.recommendationsSubtitle}>
                {preferences.liked?.length > 0
                  ? `We found ${finalRecommendations.length} items that match your style`
                  : 'Discover curated styles just for you'
                }
              </Text>
              
              <TouchableOpacity 
                style={styles.viewRecommendationsButton}
                onPress={() => navigation.navigate('Recommendations', { 
                  recommendations: finalRecommendations,
                  preferences: preferences 
                })}
              >
                <Text style={styles.viewRecommendationsText}>
                  View Recommendations ({finalRecommendations.length})
                </Text>
                <Text style={styles.viewRecommendationsArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <Text style={styles.restartButtonText}>Take Quiz Again</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 20,
  },
  genomeCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  genomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6750A4',
    textAlign: 'center',
    marginBottom: 16,
  },
  traitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  traitLabel: {
    fontSize: 14,
    color: '#B0B0B0',
    flex: 1,
  },
  traitValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  restartButton: {
    backgroundColor: '#6750A4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    alignSelf: 'center',
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  confidenceBar: {
    marginBottom: 12,
  },
  confidenceLabel: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 8,
  },
  confidenceTrack: {
    height: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#6750A4',
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: '#6750A4',
    textAlign: 'right',
    fontWeight: '600',
  },
  summarySection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  summaryTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 4,
  },
  recommendationsSection: {
    marginTop: 16,
    paddingBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  recommendationsTitle: {
    fontSize: 16,
    color: '#6750A4',
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  recommendationsSubtitle: {
    fontSize: 12,
    color: '#B0B0B0',
    marginBottom: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  viewRecommendationsButton: {
    backgroundColor: '#6750A4',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
    elevation: 4,
    shadowColor: '#6750A4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  viewRecommendationsText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  viewRecommendationsArrow: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ResultsScreen;