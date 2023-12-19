import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
const {hasPermission, requestPermission} = useCameraPermission();
//QRCodeScanner
const QRCodeScanner = () => {
  const [scannedCode, setScannedCode] = useState('');
  const [torch, setTorch] = useState(false);
  //
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });
  //check camera permission
  if (!hasPermission) {
    requestPermission();
    return null;
  }
  const device = useCameraDevice('back'); // Use back camera
  return (
    <View style={styles.container}>
      {device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          torch={torch ? 'on' : 'off'}
          enableZoomGesture={true}
        />
      )}
      {scannedCode && (
        <Text style={styles.text}>Scanned Code: {scannedCode}</Text>
      )}
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
//
export default QRCodeScanner;
