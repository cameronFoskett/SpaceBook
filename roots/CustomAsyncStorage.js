import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (value) => { 
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@spacebook_details', jsonValue);
}

export const getData = async () => { 
      const jsonValue = await AsyncStorage.getItem('@spacebook_details');
      const data = JSON.parse(jsonValue);
      return data;
}

export default saveData;
