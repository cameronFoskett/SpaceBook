import React from 'react';
import { Text } from 'react-native';

const User = (props) => {
  return(
    <>
      <Text> {props.forename} {props.surname} </Text>
    </>
  )
}

export default User;
