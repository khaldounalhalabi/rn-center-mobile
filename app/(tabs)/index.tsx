import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StoryCard from '../../components/StoryCard';
import CategoryCard from '../../components/CategoryCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  // Placeholder data with IDs
  const featuredStories = [
    {
      id: 'story1',
      title: 'The Magical Treehouse Adv',
      readTime: '10 min',
      imageSource: require('../../assets/images/placeholder.png'),
    },
    {
      id: 'story2',
      title: 'Mystery of the Deep Sea',
      readTime: '15 min',
      imageSource: require('../../assets/images/placeholder.png'),
    },
    // Add more featured stories as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Hello, Bright Reader!</Text>
          <Text style={styles.subGreeting}>Discover new stories and adventures.</Text>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a story..."
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* Featured Stories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Stories</Text>
          {/* Horizontal ScrollView for Featured Stories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            {featuredStories.map((story) => (
              <StoryCard
                key={story.id}
                imageSource={story.imageSource}
                title={story.title}
                readTime={story.readTime}
                height={253}
                onPress={() => { router.push(`/read/${story.id}`); }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Explore Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Explore</Text>
          {/* Grid for Explore Categories */}
          <View style={styles.exploreGrid}>
            <CategoryCard
              categoryName="Fairytales"
              numberOfStories={25}
              colors={['#ff9a9e', '#fad0c4']}
              onPress={() => { /* Handle navigation */ }}
            />
            <CategoryCard
              categoryName="Adventures"
              numberOfStories={18}
              colors={['#a1c4fd', '#c2e9fb']}
              onPress={() => { /* Handle navigation */ }}
            />
            <CategoryCard
              categoryName="Animals"
              numberOfStories={30}
              colors={['#d4fc79', '#96e6a1']}
              onPress={() => { /* Handle navigation */ }}
            />
            <CategoryCard
              categoryName="Space & Sci-Fi"
              numberOfStories={21}
              colors={['#fbc2eb', '#a6c1ee']}
              onPress={() => { /* Handle navigation */ }}
            />
             <CategoryCard
              categoryName="Mysteries"
              numberOfStories={15}
              colors={['#f6d365', '#fda085']}
              onPress={() => { /* Handle navigation */ }}
            />
             <CategoryCard
              categoryName="Friendship"
              numberOfStories={22}
              colors={['#a18cd1', '#fbc2eb']}
              onPress={() => { /* Handle navigation */ }}
            />
            {/* Add more CategoryCard components as needed */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContent: {
    paddingVertical: 0,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    marginBottom: 0,
    backgroundColor: '#fff0e0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 20,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#333',
  },
  horizontalScrollView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  storyCardPlaceholder: {
    width: 150,
    height: 200,
    backgroundColor: '#ddd',
    marginRight: 15,
    borderRadius: 8,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryCardPlaceholder: {
    width: '48%',
    height: 120,
    backgroundColor: '#eee',
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default HomeScreen; 