import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BadgeProps {
  iconName: string;
  label: string;
  color: string;
}

const Badge: React.FC<BadgeProps> = ({ iconName, label, color }) => {
  return (
    <View style={styles.badgeContainer}>
      <View style={[styles.badgeIcon, { backgroundColor: color }]}>
         <Ionicons name={iconName as any} size={30} color="#fff" />
      </View>
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 80, // Fixed width for consistency
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  badgeLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default Badge; 