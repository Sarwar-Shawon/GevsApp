/*
 * @copyRight by md sarwar hoshen.
 */
import React, {Children, useEffect, ReactNode} from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  ViewStyle,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils';
import {AppText} from './CusCompoents';
// import MIcon from 'react-native-vector-icons/MaterialIcons';
interface Props {
  children: ReactNode;
  hideClose?: boolean;
  closeModal?: () => void;
  style?: ViewStyle;
}
const AppModal = ({children, closeModal, hideClose, style}: Props) => {
  //
  useEffect(() => {
    return () => {};
  }, []);
  //
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
        {!hideClose && (
          <TouchableOpacity
            style={{
              padding: 15,
              alignItems: 'flex-end',
            }}
            onPress={closeModal}>
            {/* <MIcon
              name="close"
              color={colors.GRAY}
              size={30}
              containerStyle={{alignSelf: 'flex-end'}}
            /> */}
            <AppText title="Close" />
          </TouchableOpacity>
        )}
        {children}
      </SafeAreaView>
    </Modal>
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={true}
    //   onRequestClose={closeModal}>
    //   <TouchableOpacity onPress={closeModal}>
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: Colors.background,
    //       }}>
    //       <View style={{flex:1}}>
    //         <View style={styles.modalView}>{children}</View>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // </Modal>
  );
}; //AppModal
const styles = StyleSheet.create({
  modalView: {
    height: 200,
    width: '90%',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
});
export default AppModal;
