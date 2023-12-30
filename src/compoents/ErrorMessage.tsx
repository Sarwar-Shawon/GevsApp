/*
 * @copyRight by md sarwar hoshen.
 */
import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//
interface ErrorMessageProps {
  message: string;
}
//
const ErrorMessage: FC<ErrorMessageProps> = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
});

export default ErrorMessage;
