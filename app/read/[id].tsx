import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReadingScreen = () => {
  const { id } = useLocalSearchParams();
  const storyId = typeof id === 'string' ? id : '';

  // Placeholder state and data - replace with actual data fetching and state management
  const [currentChapter, setCurrentChapter] = useState(1);
  const totalChapters = 5; // Example total chapters
  const storyTitle = 'The Magical Forest Adventure'; // Example story title
  const chapterContent = `In the heart of the Whispering Woods, where ancient trees touched the sky, lived a curious little fox named Finn. Finn loved to explore, his nose twitching with excitement as he sniffed out new adventures. Today, he was determined to find the legendary Glow-Berry Bush, a plant said to sparkle with a thousand tiny lights.\n\n\n\n\n`; // Example chapter content

  const handlePrevious = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      // Fetch previous chapter content
    }
  };

  const handleNext = () => {
    if (currentChapter < totalChapters) {
      setCurrentChapter(currentChapter + 1);
      // Fetch next chapter content
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: storyTitle }} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Chapter Content */}
        <View style={styles.chapterContainer}>
          <Text style={styles.chapterNumber}>Chapter {currentChapter} of {totalChapters}</Text>
          <Text style={styles.chapterContent}>{chapterContent}</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrevious}
            disabled={currentChapter === 1}
          >
            <Ionicons name="arrow-back" size={24} color={currentChapter === 1 ? '#ccc' : '#000'} />
            <Text style={[styles.navButtonText, currentChapter === 1 && styles.disabledNavText]}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNext}
            disabled={currentChapter === totalChapters}
          >
            <Text style={[styles.navButtonText, currentChapter === totalChapters && styles.disabledNavText]}>Next</Text>
            <Ionicons name="arrow-forward" size={24} color={currentChapter === totalChapters ? '#ccc' : '#000'} />
          </TouchableOpacity>
        </View>

        {/* Playback Controls */}
        <View style={styles.playbackContainer}>
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            {/* This is a simplified placeholder. A real implementation would use a slider component. */}
            <View style={[styles.progressBarFill, { width: '60%' }]} />{/* Example progress */}
          </View>

          {/* Main Playback Buttons */}
          <View style={styles.mainPlaybackButtons}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="refresh-circle-outline" size={30} color="#333" />{/* Adjusted icon */}
              <Text style={styles.controlButtonText}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton}>
               <Ionicons name="play" size={40} color="#fff" />{/* Adjusted size */}
            </TouchableOpacity>
             <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="refresh-circle-outline" size={30} color="#333" style={{ transform: [{ scaleX: -1 }] }} />{/* Adjusted icon and flipped */}
               <Text style={styles.controlButtonText}>10</Text>
            </TouchableOpacity>
          </View>

          {/* Additional Controls */}
          <View style={styles.additionalControls}>
            <TouchableOpacity style={styles.additionalControlButton}>
              <Ionicons name="speedometer-outline" size={24} color="#333" />
              <Text style={styles.additionalControlText}>1.2x</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.additionalControlButton}>
              <Ionicons name="bookmark-outline" size={24} color="#333" />
              <Text style={styles.additionalControlText}>Bookmark</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.additionalControlButton}>
              <Ionicons name="book-outline" size={24} color="#333" />
              <Text style={styles.additionalControlText}>Summary</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.additionalControlButton}>
              <Ionicons name="time-outline" size={24} color="#333" />
              <Text style={styles.additionalControlText}>Sleep Timer</Text>
            </TouchableOpacity>
          </View>
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
  chapterContainer: {
    marginBottom: 30,
  },
  chapterNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  chapterContent: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  navButtonText: {
    fontSize: 16,
    marginHorizontal: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  disabledNavText: {
    color: '#ccc',
  },
  playbackContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffe4e1', // Light pink background from design
    borderRadius: 10,
  },
   progressBarContainer: {
     width: '100%',
     height: 8,
     backgroundColor: '#eee', // Background of the progress bar
     borderRadius: 4,
     marginBottom: 20,
     overflow: 'hidden', // Hide the overflow of the fill
   },
   progressBarFill: {
     height: '100%',
     backgroundColor: '#ff6347', // Orange color for the progress
     borderRadius: 4,
   },
   mainPlaybackButtons: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 20,
   },
   controlButton: {
     flexDirection: 'row',
     alignItems: 'center',
     marginHorizontal: 15,
   },
   controlButtonText: {
     fontSize: 16,
     marginLeft: 5,
     color: '#333',
   },
   playPauseButton: {
     width: 60,
     height: 60,
     borderRadius: 30,
     backgroundColor: '#ff6347', // Orange color
     justifyContent: 'center',
     alignItems: 'center',
   },
   additionalControls: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     width: '100%',
   },
    additionalControlButton: {
      alignItems: 'center',
    },
    additionalControlText: {
      fontSize: 12,
      color: '#333',
      marginTop: 5,
    },
});

export default ReadingScreen;
