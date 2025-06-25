import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface SmallStoryCardProps {
  imageSource: any; // Use appropriate type for image source
  title: string;
  onPress: () => void;
}

const SmallStoryCard: React.FC<SmallStoryCardProps> = ({ imageSource, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120, // Adjusted width
    height: 160, // Adjusted height
    borderRadius: 8,
    marginRight: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120, // Adjusted height
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default SmallStoryCard; 