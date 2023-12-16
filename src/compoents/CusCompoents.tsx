/*
 * @copyRight by md sarwar hoshen.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {Colors} from '../utils';
//
interface TextPropsType {
  title?: string;
  onBackPress?: () => void;
  style?: TextStyle;
}
//
export const AppText = ({title, style}: TextPropsType) => {
  return <Text style={[styles.container, {...style}]}>{title}</Text>;
};
//
const styles = StyleSheet.create({
  container: {
    color: Colors.text_color,
    fontSize: 14,
  },
});
