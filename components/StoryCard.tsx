import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, DimensionValue } from 'react-native';
import { truncate } from '../helpers';


interface StoryCardProps {
  imageSource: any; // Use appropriate type for image source
  title: string;
  readTime: string;
  width?: DimensionValue,
  height?: DimensionValue,
  truncValue?: number,
  onPress: () => void;
}

const StoryCard: React.FC<StoryCardProps> =
  ({ imageSource, title, readTime, onPress, width=180, height=250 ,truncValue  }) => {
  return (
    <View style={[styles.card , {width, height}]} >
      <Image source={imageSource} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{ truncValue ? truncate(title,truncValue) :title}</Text>
        <Text style={styles.readTime}>{readTime} read</Text>
        <TouchableOpacity style={styles.readButton} onPress={onPress}>
          <Text style={styles.readButtonText}>Read Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
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
    height: 140,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'auto'
  },
  readTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  readButton: {
    backgroundColor: '#ff6347',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  readButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default StoryCard; 