import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RewardsScreen = () => {
  // Placeholder data
  const totalPoints = 980;
  const achievablePoints = 1250;
  const overallProgress = 72; // in percentage

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Your Rewards</Text>

        {/* Tabs Placeholder */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.activeTabButtonText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Badges</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabButtonText}>Quizzes</Text>
          </TouchableOpacity>
        </View>

        {/* Total Points Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Total Points</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.totalPoints}>{totalPoints}</Text>
            <Text style={styles.achievablePoints}>out of {achievablePoints} achievable points</Text>
          </View>
        </View>

        {/* Overall Reading Progress Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Overall Reading Progress</Text>
          {/* Progress Circle */}
          <View style={styles.progressCircleContainer}>
            {/* Placeholder for the actual progress circle component */}
            <View style={styles.progressCircle}>
                <Text style={styles.progressText}>{overallProgress}%</Text>
            </View>
          </View>
        </View>

        {/* Top Readers Section */}
         <View style={styles.sectionContainer}>
           <Text style={styles.sectionTitle}>Top Readers</Text>
            {/* Top Readers List */}
            <View style={styles.topReadersContainer}>
                {/* Individual reader items */}
                <View style={[styles.readerItem, styles.firstReader]}> {/* Style for the first reader */}
                    <Text style={[styles.readerRank, styles.firstReaderRank]}>1.</Text>
                    <View style={[styles.readerAvatarPlaceholder, styles.firstReaderAvatar]} />
                    <Text style={[styles.readerName, styles.firstReaderName]}>Ava Joy</Text>
                    <Text style={[styles.readerPoints, styles.firstReaderPoints]}>1300 Pts</Text>
                </View>
                 <View style={styles.readerItem}>
                    <Text style={styles.readerRank}>2.</Text>
                    <View style={styles.readerAvatarPlaceholder} />
                    <Text style={styles.readerName}>Noah Star</Text>
                    <Text style={styles.readerPoints}>1250 Pts</Text>
                </View>
                 <View style={styles.readerItem}>
                    <Text style={styles.readerRank}>3.</Text>
                    <View style={styles.readerAvatarPlaceholder} />
                    <Text style={styles.readerName}>Mia Learner</Text>
                    <Text style={styles.readerPoints}>1200 Pts</Text>
                </View>
                 <View style={styles.readerItem}> {/* Example for the user's rank */}
                    <Text style={[styles.readerRank, styles.userRank]}>5.</Text>
                    <View style={[styles.readerAvatarPlaceholder, styles.userAvatar]} />
                    <Text style={[styles.readerName, styles.userNameText]}>You</Text>
                    <Text style={[styles.readerPoints, styles.userPoints]}>980 Pts</Text>
                </View>
                {/* Add more reader items as needed */}
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light grey background
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#eee', // Light grey background for tabs
    borderRadius: 20,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#ff6347', // Orange color for active tab
  },
  tabButtonText: {
    fontSize: 16,
    color: '#333', // Dark text for inactive tabs
    fontWeight: 'bold',
  },
  activeTabButtonText: {
     fontSize: 16,
     color: '#fff', // White text for active tab
     fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  pointsContainer: {
    alignItems: 'center',
    backgroundColor: '#fff', // White background
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000', // Added shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalPoints: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff6347', // Orange color for points
  },
  achievablePoints: {
    fontSize: 16,
    color: '#666',
  },
   progressCirclePlaceholder: {
     width: 150,
     height: 150,
     borderRadius: 75,
     backgroundColor: '#fff',
     justifyContent: 'center',
     alignItems: 'center',
     alignSelf: 'center',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3,
   },
  progressCircleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ffb6c1', // Placeholder color for the progress fill
    justifyContent: 'center',
    alignItems: 'center',
    // Add styles for the background circle if needed
  },
  progressText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  topReadersContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  readerRank: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 30, // Fixed width for alignment
  },
  readerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  readerName: {
    fontSize: 16,
    flex: 1, // Take up remaining space
    color: '#333',
  },
  readerPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6347', // Orange color for points
  },
  firstReader: {
    // Styles for the first reader item
    backgroundColor: '#fff0e0', // Light pink background
    borderRadius: 10,
    paddingHorizontal: 10, // Add some padding
  },
  firstReaderRank: {
    fontSize: 18,
  },
  firstReaderAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  firstReaderName: {
    fontWeight: 'bold',
  },
  firstReaderPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  userRank: {
    color: '#ff6347', // Highlight user's rank
  },
  userAvatar: {
    borderWidth: 2,
    borderColor: '#ff6347', // Highlight user's avatar
  },
  userNameText: {
    fontWeight: 'bold',
  },
  userPoints: {
    fontWeight: 'bold',
  }
});

export default RewardsScreen; 