/*
 * @copyRight by md sarwar hoshen.
 */

import React, {ReactNode} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
//
import Header from './Header';
import {Colors} from '../utils';
import {SafeAreaView} from 'react-native-safe-area-context';
//Page Wrapper Component Props
interface PageWrapperComponentProps {
  children: ReactNode;
  title?: string;
  onBackPress?: () => void;
  style?: ViewStyle;
  showHdr?: boolean;
}
// page wrapper for every page
const PageWrapper = ({
  children,
  title,
  onBackPress,
  style,
  showHdr,
}: PageWrapperComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  //
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.background}
      />
      {showHdr && <Header {...{title, onBackPress, style}} />}
      {children}
    </SafeAreaView>
  );
};
//
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
//
export default PageWrapper;
