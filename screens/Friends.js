import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';

export default function Friends() {
  return (
    <>
      <View style={styles.container}>
        <Image source={spaceBookLogo} />
        <Text> friends </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c94ac",
    alignItems: "center",
    justifyContent: "center",
  },
});
