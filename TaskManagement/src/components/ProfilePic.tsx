import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const ProfilePic = () => {
  return (
    <View>
      <Image 
        source={require('../../src/assets/avatar.png')}
        style={styles.Image}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: 36,
    width: 36,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'dimgrey',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: 36,
    width: 36,
  },
});

export default ProfilePic;
