import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Onboarding: undefined;
  Quiz: undefined;
  Results: { preferences?: any };
  Recommendations: { recommendations: any[]; preferences?: any };
};

type RecommendationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recommendations'>;
type RecommendationsScreenRouteProp = RouteProp<RootStackParamList, 'Recommendations'>;

interface Props {
  navigation: RecommendationsScreenNavigationProp;
  route: RecommendationsScreenRouteProp;
}

const RecommendationsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { recommendations = [], preferences = { liked: [], disliked: [] } } = route.params || {};

  const renderRecommendationItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.recommendationCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.image }}
          style={styles.recommendationImage}
          resizeMode="cover"
        />
        {item.score > 6 && (
          <View style={styles.highMatchBadge}>
            <Text style={styles.badgeText}>✨</Text>
          </View>
        )}
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.recommendationName}>{item.name}</Text>
        <Text style={styles.recommendationDetails}>
          {item.style} • {item.color}
        </Text>
        <View style={styles.scoreIndicator}>
          <Text style={styles.scoreText}>
            {item.score && preferences.liked?.length > 0 
              ? `${Math.round((item.score / 8) * 100)}% match` 
              : 'Curated pick'
            }
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Recommendations</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.subtitle}>
          {preferences.liked?.length > 0 
            ? `Based on your ${preferences.liked.length} liked items, here are styles we think you'll love`
            : 'Curated fashion picks just for you'
          }
        </Text>

        {recommendations.length > 0 ? (
          <FlatList
            data={recommendations.slice(0, 4)}
            renderItem={renderRecommendationItem}
            keyExtractor={(item, index) => item.id || index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.noRecommendations}>
            <Text style={styles.noRecommendationsText}>
              No recommendations available. Complete the quiz to get personalized suggestions!
            </Text>
            <TouchableOpacity 
              style={styles.retakeQuizButton}
              onPress={() => navigation.navigate('Onboarding')}
            >
              <Text style={styles.retakeQuizText}>Take Quiz</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity 
          style={styles.retakeButton}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <Text style={styles.retakeButtonText}>Take Quiz Again</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6750A4',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recommendationCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    width: '47%',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2A2A',
  },
  highMatchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(103, 80, 164, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  recommendationName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 20,
  },
  recommendationDetails: {
    fontSize: 13,
    color: '#B0B0B0',
    marginBottom: 12,
    textTransform: 'capitalize',
  },
  scoreIndicator: {
    backgroundColor: '#6750A4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  scoreText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  noRecommendations: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 30,
  },
  noRecommendationsText: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retakeQuizButton: {
    backgroundColor: '#6750A4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  retakeQuizText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  retakeButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6750A4',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 20,
  },
  retakeButtonText: {
    color: '#6750A4',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RecommendationsScreen;