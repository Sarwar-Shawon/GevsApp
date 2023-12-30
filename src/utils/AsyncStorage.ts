/*
 * @copyRight by md sarwar hoshen.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Set item
export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error setting item with key ${key}:`, e);
  }
};
// Get item
export const getItem = async (key: string): Promise<any | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error getting item with key ${key}:`, e);
    return null;
  }
};
// Remove item
export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Error getting item with key ${key}:`, e);
  }
};
