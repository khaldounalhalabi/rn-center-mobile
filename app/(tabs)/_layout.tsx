import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff6347',
        tabBarInactiveTintColor: '#888',
        headerShown: false, // Hide header in individual tab screens, handled by drawer layout
      }}
    >
      <Tabs.Screen
        name='index' // Corresponds to app/(drawer)/(tabs)/index.tsx -> Home Screen
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='library' // Corresponds to app/(drawer)/(tabs)/library.tsx -> Library Screen
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => <Ionicons name="library" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='search' // Corresponds to app/(drawer)/(tabs)/search.tsx -> Search Screen
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name='profile' // Corresponds to app/(drawer)/(tabs)/profile.tsx -> Profile Screen
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name='rewards' // Corresponds to app/(drawer)/(tabs)/rewards.tsx -> Rewards Screen
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} />,
        }}
      />
      {/* Add other tab screens here */}
    </Tabs>
  );
};

export default TabLayout; 