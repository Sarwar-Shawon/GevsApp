/*
 * @copyRight by md sarwar hoshen.
 */

import {useColorScheme} from 'react-native';
const isDarkMode = useColorScheme() === 'dark';

export const Colors = {
  isDarkMode: isDarkMode,
  background: isDarkMode ? '#121212' : '#ffffff',
  text_color: isDarkMode ? '#ffffff' : '#000000',
  placeholder_text: isDarkMode ? '#7D808B' : '#434242',
  // border: '#DFE3E8',
  // text_light: '#637381',
  // text_dark: '#000000',
  // text_danger: '#CC381B',
  // text_medium: '#454F5B',
  primary: '#0049ff',
};
export interface Theme {
  backgroundColor: string;
  textColor: string;
  // Add more properties as needed
}

export const lightTheme: Theme = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  // Add more properties as needed
};

export const darkTheme: Theme = {
  backgroundColor: '#121212',
  textColor: '#ffffff',
  // Add more properties as needed
};
