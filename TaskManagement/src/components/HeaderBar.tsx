import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  )
};

const styles = StyleSheet.create({
  HeaderContainer: {
      padding: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  HeaderText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default HeaderBar;
