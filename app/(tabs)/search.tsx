import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StoryCard from '../../components/StoryCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const router = useRouter();

  // Placeholder data - replace with actual search results and categories
  const categories = ['All Categories', 'Adventure', 'Fantasy', 'Mystery', 'Sci-Fi', 'Fairytale'];
  const searchResults = [
    {
      id: '1',
      title: 'Whispers of the E',
      author: 'Aisha Green',
      reviews: 124,
      image: require('../../assets/images/placeholder.png'), // Placeholder image
    },
    {
      id: '2',
      title: 'The Starlight Drag',
      author: 'Leo Finch',
      reviews: 88,
      image: require('../../assets/images/placeholder.png'), // Placeholder image
    },
    {
      id: '3',
      title: 'Max and the Curio',
      author: 'Dr. Ellie Spark',
      reviews: 150,
      image: require('../../assets/images/placeholder.png'), // Placeholder image
    },
    {
      id: '4',
      title: 'Journey of the Mo',
      author: 'Maya Rivera',
      reviews: 76,
      image: require('../../assets/images/placeholder.png'), // Placeholder image
    },
    {
      id: '5',
      title: 'The Cloud Kingdom',
      author: 'Ben Carter',
      reviews: 112,
      image: require('../../assets/images/placeholder.png'), // Placeholder image
    },
    {
      id: '6',
      title: 'The Sleepy Wizard',
      author: 'Sophie Bloom',
      reviews: 85,
      image: require('../../assets/images/placeholder.png'), // Placeholder image
    },
    // Add more placeholder results
  ];

  const filteredResults = searchResults.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === 'All Categories' || '' /* Add category filtering logic here */)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for stories, authors..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Category Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilterContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryButtonText, selectedCategory === category && styles.selectedCategoryButtonText]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Search Results Grid */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.storyCardWrapper}> {/* Added wrapper for spacing */}
             <StoryCard
                imageSource={item.image}
                title={item.title}
                readTime={`${item.reviews} reviews`}
              width={153}
              height={232}
              truncValue={15}
              onPress={() => { router.push(`/story/${item.id}`) }}
              />
          </View>
        )}
        contentContainerStyle={styles.searchResultsGrid}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light grey background
    paddingHorizontal: 0, // Remove horizontal padding here, add to sections
    paddingTop: 20, // Add top padding
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 0, // Remove top margin, handled by container padding
    marginBottom: 20,
    height: 50,
    marginHorizontal: 20, // Add horizontal margin
    shadowColor: '#000', // Added shadow
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
    fontSize: 15,
    color: '#333',
  },
  categoryFilterContainer: {
    marginBottom: 20,
    paddingLeft: 20, // Add left padding to align with content
    // paddingRight: 40, // Add left padding to align with content
    // backgroundColor: '#002',
    height: 40,
    
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#eee',
    maxHeight: 35
  },
  selectedCategoryButton: {
    backgroundColor: '#ff6347',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  searchResultsGrid: {
    paddingHorizontal: 20, // Add horizontal padding to the grid content
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 15, // Added margin between rows
    // overflow: 'hidden'
  },
  storyCardWrapper: { // Style for the wrapper
    // width: '48%', // Adjust width to account for spacing
    // overflow: 'hidden', // To prevent 
  },
});

export default SearchScreen; 