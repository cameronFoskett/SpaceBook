import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';

export default function Login() {
  return (
    <>
      <View style={styles.container}>
        <Image source={spaceBookLogo} />
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
