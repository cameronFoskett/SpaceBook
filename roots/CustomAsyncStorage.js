//this file saves the id and token that is generated when the user is logged in and deleted when they log out.
//it is used in the other api files to get authorisation

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

export const removeData = async () => {
    await AsyncStorage.removeItem('@spacebook_details');
}

export default saveData;
