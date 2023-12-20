// import React, {useState, useEffect} from 'react';
// import {
//   Linking,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import {
//   Camera,
//   useCodeScanner,
//   useCameraDevice,
// } from 'react-native-vision-camera';
// import {PERMISSIONS, RESULTS} from 'react-native-permissions';

// import {checkPermission, requestPermission, Colors} from '../utils';

// import {AppText} from './CusCompoents';
// import Loading from './Loading';

// //
// interface Props {}
// // QRCodeScanner
// const QRCodeScanner = ({}: Props) => {
//   const [loader, setLoader] = useState(true);
//   const [scannedCode, setScannedCode] = useState('');
//   const [torch, setTorch] = useState(false);
//   const [cameraPermission, setCameraPermission] = useState(false);

//   useEffect(() => {
//     checkCameraPermission();
//   }, []);
//   //check checkCameraPermission
//   const checkCameraPermission = async () => {
//     try {
//       const result = await checkPermission({
//         permission_name:
//           Platform.OS === 'ios'
//             ? PERMISSIONS.IOS.CAMERA
//             : PERMISSIONS.ANDROID.CAMERA,
//       });
//       if (result) {
//         setCameraPermission(true);
//       } else {
//         requestCameraPermission();
//       }
//       setLoader(false);
//     } catch (error) {
//       console.error('Error checking camera permission:', error);
//     }
//   };
//   // request camera permission
//   const requestCameraPermission = async () => {
//     try {
//       const result = await requestPermission({
//         permission_name:
//           Platform.OS === 'ios'
//             ? PERMISSIONS.IOS.CAMERA
//             : PERMISSIONS.ANDROID.CAMERA,
//       });
//       console.log('permissionResultpermissionResultpermissionResult', result);
//       if (result === RESULTS.GRANTED) {
//         setCameraPermission(true);
//       } else if (result === RESULTS.DENIED) {
//         // Permission denied
//       } else if (result === RESULTS.BLOCKED) {
//         // Permission blocked, open settings
//         // openSettings();
//       }
//     } catch (error) {
//       console.error('Error requesting camera permission:', error);
//     }
//   };
//   //
//   const openSettings = () => {
//     if (Platform.OS === 'ios') {
//       Linking.openSettings();
//     } else if (Platform.OS === 'android') {
//       Linking.openSettings();
//     }
//   };
//   // get scan code result
//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: codes => {
//       console.log(`Scanned ${codes.length > 0 ? codes[0] : ''} codes!`);
//       console.log(`Scanned codes:::`, codes[0]?.value);
//       // Assuming you want to set the first scanned code to state
//       // setScannedCode(codes.length > 0 ? codes[0].data : '');
//     },
//   });
//   // Use back camera
//   const device = useCameraDevice('back');
//   //render
//   console.log('cameraPermissioncameraPermission:', cameraPermission);
//   if (loader) {
//     return <Loading />;
//   }
//   return (
//     <View style={styles.container}>
//       {cameraPermission ? (
//         device && (
//           <Camera
//             style={StyleSheet.absoluteFill}
//             device={device}
//             isActive={true}
//             codeScanner={codeScanner}
//             torch={torch ? 'on' : 'off'}
//             enableZoomGesture={true}
//           />
//         )
//       ) : (
//         <View>
//           <AppText title="You don't have camera permission. If you want to access camera you have to provide permission from the settings." />
//           <TouchableOpacity onPress={openSettings} style={styles.btn}>
//             <AppText title="Open Settings" />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };
// // style
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   btn: {
//     height: 40,
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // padding: 10,
//     borderRadius: 10,
//     backgroundColor: '#124697',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: {width: 0, height: 1},
//         shadowOpacity: 0.5,
//         shadowRadius: 1,
//       },
//       android: {
//         elevation: 5,
//       },
//     }),
//   },
// });
// //
// export default QRCodeScanner;
import React, {useState, useEffect} from 'react';
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
  useCameraPermission,
} from 'react-native-vision-camera';
import {Colors} from '../utils';
import {AppText} from './CusCompoents';

interface Props {
  hideModal: () => void;
  Uvc: string;
  setValue: (val: string) => void;
}

// QRCodeScanner
const QRCodeScanner = ({hideModal, Uvc, setValue}: Props) => {
  const cameraPermission = useCameraPermission();
  const {hasPermission, requestPermission} = cameraPermission;
  //
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

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
  const device = useCameraDevice('back'); // Use back camera

  return (
    <View style={styles.container}>
      {hasPermission && device != null ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          enableZoomGesture={true}
        />
      ) : (
        <View>
          <AppText title="You don't have camera permission. If you want to access camera you have to provide permission from the settings." />
          <TouchableOpacity onPress={openSettings} style={styles.btn}>
            <AppText title="Open Settings" />
          </TouchableOpacity>
        </View>
      )}
      {Uvc && <Text style={styles.text}>Scanned Code: {Uvc}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
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
