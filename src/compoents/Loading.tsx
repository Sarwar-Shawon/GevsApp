import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {Colors} from '../utils';

const Loading = () => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={[styles.container, {width, height}]}>
      <ActivityIndicator size={'large'} color={Colors.primary} />
    </View>
  );
};
export default Loading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    position: 'absolute',
    zIndex: 10000,
  },
});
