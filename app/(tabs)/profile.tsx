import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from '../../components/Badge';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  // Placeholder data
  const user = {
    name: 'Luna Sparkle',
    title: 'Reading Explorer!',
    image: require('../../assets/images/placeholder_avatar.png'), // Placeholder image
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
          <Image source={user.image} style={styles.userAvatar} />
          <View style={styles.userInfoText}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userTitle}>{user.title}</Text>
          </View>
          <TouchableOpacity>{/* Edit icon placeholder */}</TouchableOpacity>
        </View>

        {/* Earned Badges Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Earned Badges</Text>
            <TouchableOpacity>{/* View All Badges button placeholder */}</TouchableOpacity>
          </View>
          {/* Badges Horizontal ScrollView */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesContainer}>
            {/* Badge Components */}
            <Badge iconName="book" label="First Chapter Champ" color="#a18cd1" />
            <Badge iconName="star" label="Storyteller Star" color="#f6d365" />
            <Badge iconName="headset" label="Listening Legend" color="#20b2aa" />
            {/* Add more badge items as needed */}
          </ScrollView>
        </View>

        {/* Reading Progress Section */}
        <View style={styles.sectionContainer}>
           <Text style={styles.sectionTitle}>Reading Progress</Text>
           {/* Reading Progress Chart */}
           <View style={styles.chartContainer}>
             {/* This is a placeholder chart. A real implementation would use dynamic data. */}
             <LineChart
                data={{
                  labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [
                    {
                      data: [20, 45, 28, 80, 99, 43],
                      color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Orange color
                      strokeWidth: 2
                    },
                     {
                      data: [10, 20, 30, 25, 40, 35], // Placeholder for minutes read
                      color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`, // Yellow color
                      strokeWidth: 2
                    }
                  ],
                   legend: ["Books Read", "Minutes Read"]
                }}
                width={Dimensions.get('window').width - 40} // Adjusted for padding
                height={200}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ff6347'
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
           </View>
        </View>

        {/* Parental Controls Section */}
         <View style={styles.sectionContainer}>
           <Text style={styles.sectionTitle}>Parental Controls</Text>
            {/* Parental Control Options */}
            <View style={styles.parentalControlsContainer}>
                <TouchableOpacity style={styles.parentalControlItem}>
                    <Ionicons name="lock-closed-outline" size={24} color="#333" />
                    <Text style={styles.parentalControlText}>Manage Story Access</Text>
                    <Ionicons name="chevron-forward-outline" size={20} color="#888" style={styles.parentalControlArrow} />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.parentalControlItem}>
                    <Ionicons name="time-outline" size={24} color="#333" />
                    <Text style={styles.parentalControlText}>Set Reading Timer</Text>
                     <Ionicons name="chevron-forward-outline" size={20} color="#888" style={styles.parentalControlArrow} />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.parentalControlItem}>
                    <Ionicons name="card-outline" size={24} color="#333" />
                    <Text style={styles.parentalControlText}>Allow In-App Purchases</Text>
                     <Ionicons name="chevron-forward-outline" size={20} color="#888" style={styles.parentalControlArrow} />
                </TouchableOpacity>
                 <TouchableOpacity style={styles.parentalControlItem}>
                    <Ionicons name="bulb-outline" size={24} color="#333" />
                    <Text style={styles.parentalControlText}>Personalized Story Suggestions</Text>
                     <Ionicons name="chevron-forward-outline" size={20} color="#888" style={styles.parentalControlArrow} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.parentalControlItem}>
                    <Ionicons name="settings-outline" size={24} color="#333" />
                    <Text style={styles.parentalControlText}>General Settings</Text>
                     <Ionicons name="chevron-forward-outline" size={20} color="#888" style={styles.parentalControlArrow} />
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
    backgroundColor: '#f8f8f8', // Light grey background
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#fff', // White background
    paddingVertical: 20, // Added vertical padding
    borderRadius: 10, // Rounded corners
    marginHorizontal: 20, // Added horizontal margin
    shadowColor: '#000', // Added shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userTitle: {
    fontSize: 16,
    color: '#666',
  },
  sectionContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
   sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
   badgesContainer: {
    // Styles for badges horizontal scrollview
  },
  badgePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    borderRadius: 40,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  badgeIconPlaceholder: {
     width: 60,
     height: 60,
     backgroundColor: '#ddd',
     borderRadius: 30,
     marginBottom: 5,
  },
  badgeText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
   chartPlaceholder: {
     width: '100%',
     height: 200,
     backgroundColor: '#fff',
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 10,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3,
  },
  chartContainer: {
     // Styles for the chart container
  },
  parentalControlsContainer: {
     backgroundColor: '#fff',
     padding: 15,
     borderRadius: 10,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3,
  },
  parentalControlItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  parentalControlText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1, // Allow text to take up space
  },
  parentalControlArrow: {
    marginLeft: 10,
  },
});

export default ProfileScreen; 