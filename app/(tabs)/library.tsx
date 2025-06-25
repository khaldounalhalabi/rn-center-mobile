import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CategoryCard from '../../components/CategoryCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Library</Text>
        {/* Category Grid */}
        <View style={styles.categoryGrid}>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default LibraryScreen; 