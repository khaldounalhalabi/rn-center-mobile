import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CategoryCardProps {
  categoryName: string;
  numberOfStories: number;
  colors: string[];
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryName, numberOfStories, colors, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient colors={colors} style={styles.gradient} >
        {/* Icon Placeholder */}
        <View style={styles.iconPlaceholder} />
        <Text style={styles.categoryName}>{categoryName}</Text>
        <Text style={styles.numberOfStories}>{numberOfStories} Stories</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  numberOfStories: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default CategoryCard;
