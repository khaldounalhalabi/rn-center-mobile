import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SmallStoryCard from '../../components/SmallStoryCard';

const StoryDetailScreen = () => {
  // Placeholder data - replace with actual data fetching based on story ID
  const story = {
    id: '1',
    title: 'The Whispering Woods',
    author: 'By Elara Vance',
    rating: 4.5,
    reviews: 4200,
    description: 'Deep within the ancient lands lies the Whispering Woods, a magical place where trees share secrets through rustling leaves and mischievous sprites guide lost travelers. Join young Lily as she embarks...',
    image: require('../../assets/images/placeholder_story_cover.png'), // Placeholder image
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: story.title }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={story.image} style={styles.storyImage} />

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{story.title}</Text>
          <Text style={styles.author}>{story.author}</Text>

          {/* Rating Placeholder */}
          <View style={styles.ratingContainer}>
            {/* Star Icons Placeholder */}
            <Ionicons name="star" size={20} color="#FFD700" />
            <Ionicons name="star" size={20} color="#FFD700" />
            <Ionicons name="star" size={20} color="#FFD700" />
            <Ionicons name="star" size={20} color="#FFD700" />
            <Ionicons name="star-half" size={20} color="#FFD700" />
            <Text style={styles.reviews}>({story.reviews} Reviews)</Text>
          </View>

          <Text style={styles.description}>{story.description}</Text>

          {/* Action Buttons */}
          <TouchableOpacity style={[styles.actionButton, styles.readButton]}>
            <Text style={styles.actionButtonText}>Read Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.listenButton]}>
            <Ionicons name="headset-outline" size={20} color="#ff6347" style={styles.buttonIcon} />
            <Text style={[styles.actionButtonText, styles.listenButtonText]}>Listen to Audio</Text>
          </TouchableOpacity>
        </View>

        {/* Spark Your Imagination Section Placeholder */}
        <View style={styles.sparkSection}>
          <Text style={styles.sectionTitle}>Spark Your Imagination!</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sparkScrollContainer}>
            {/* Smaller Story Cards */}
            <SmallStoryCard
              imageSource={require('../../assets/images/placeholder.png')}
              title="Forest Sprites"
              onPress={() => { /* Handle navigation */ }}
            />
             <SmallStoryCard
              imageSource={require('../../assets/images/placeholder.png')}
              title="Wise Old Owls"
              onPress={() => { /* Handle navigation */ }}
            />
             <SmallStoryCard
              imageSource={require('../../assets/images/placeholder.png')}
              title="Magical Creatures"
              onPress={() => { /* Handle navigation */ }}
            />
            {/* Add more SmallStoryCard components as needed */}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  storyImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
    lineHeight: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
  },
  readButton: {
    backgroundColor: '#ff6347',
  },
  listenButton: {
    backgroundColor: '#fff',
    borderColor: '#ff6347',
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  listenButtonText: {
    color: '#ff6347',
  },
  buttonIcon: {
    marginRight: 10,
  },
  sparkSection: {
    marginTop: 0,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  sparkScrollContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  sparkCardPlaceholder: {
    width: 120,
    height: 160,
    backgroundColor: '#eee',
    marginRight: 15,
    borderRadius: 8,
  },
});

export default StoryDetailScreen; 