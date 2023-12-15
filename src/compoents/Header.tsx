/*
 * @copyRight by md sarwar hoshen.
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
interface HeaderPropsType {
  title?: string;
  onBackPress?: () => void;
  style?: ViewStyle;
}
//
const Header = ({title, onBackPress, style}: HeaderPropsType) => {
  return (
    <View style={[styles.container, {...style}]}>
      {onBackPress && (
        <TouchableOpacity>
          <Text>Back</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.hdrText}>{title}</Text>
    </View>
  );
};
//
export default Header;
//
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  },
  backButton: {},
  hdrText: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
    flex: 1,
  },
});
