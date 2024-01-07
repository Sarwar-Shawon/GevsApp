/*
 * @copyRight by md sarwar hoshen.
 */
import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';

import {Colors} from '../utils';
import {AppText, Loading} from '../compoents';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  hideModal: () => void;
  Uvc: string;
  setValue: (val: string) => void;
}

// QRCodeScanner
const QRCodeScanner = ({hideModal, Uvc, setValue}: Props) => {
  const [loading, setLoading] = useState(true);
  const [cameraPermission, setCameraPermission] = useState('');
  const device = useCameraDevice('back');
  //

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [isActive, setIsActive] = useState(Platform.OS === 'ios');

  useEffect(() => {
    if (Platform.OS === 'ios') {
      return () => {};
    }

    let timeout: NodeJS.Timeout;

    if (isCameraInitialized) {
      timeout = setTimeout(() => setIsActive(true), 150);
    }

    setIsActive(false);
    return () => {
      clearTimeout(timeout);
    };
  }, [isCameraInitialized]);

  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true);
  }, []);
  //
  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      console.log('cameraPermissionStatus', cameraPermissionStatus);
      setCameraPermission(cameraPermissionStatus);
      setLoading(false);
    })();
  }, []);

  //
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      if (codes.length > 0 && codes[0].value) {
        setValue(codes[0].value);
        hideModal();
      }
    },
  });
  //

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openSettings();
    } else if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };
  //
  if (loading && cameraPermission == '') {
    console.log('loading::');
    return (
      <View>
        <Loading />
      </View>
    );
  }
  //
  if (cameraPermission == 'denied') {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <AppText title="You don't have camera permission. If you want to access camera you have to provide permission from the settings." />
        <TouchableOpacity onPress={openSettings} style={styles.btn}>
          <AppText title="Open Settings" />
        </TouchableOpacity>
      </View>
    );
  }
  //
  if (cameraPermission == 'granted') {
    if (device == null) {
      return (
        <View>
          <AppText title="No camera found." />
        </View>
      );
    }
    return (
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive && isCameraInitialized}
          onInitialized={onInitialized}
          codeScanner={codeScanner}
          enableZoomGesture={true}
        />
      </SafeAreaView>
    );
  }
};
//
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  btn: {
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    borderRadius: 10,
    backgroundColor: '#124697',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default QRCodeScanner;
