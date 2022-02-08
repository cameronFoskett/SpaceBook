import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

import spaceBookLogo from '../assets/SpaceBook-logos.jpeg';
import Tabs from '../navigation/tabs';

export default function Home() {
  return (
    <>
      <Tabs />
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