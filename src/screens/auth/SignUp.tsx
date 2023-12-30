/*
 * @copyRight by md sarwar hoshen.
 */
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  TextStyle,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  PageWrapper,
  AppText,
  RnCalendar,
  Dropdown,
  AppModal,
  QRCodeScanner,
  ErrorMessage,
} from '../../compoents';
import {
  Colors,
  formatDateToString,
  formatStringToStringDate,
} from '../../utils';
import {Post, Get} from '../../api';
import api from '../../config/api';
//
interface VoterType {
  voter_id: string;
  full_name: string;
  DOB: Date;
  password: string;
  UVC: string;
  constituency_id: number;
}
import {StackAuthProps} from '../../route/AuthRoutes';
//SignInScreen
const SignUpScreen = ({navigation}: StackAuthProps) => {
  //state
  const [constituencyItems, setConstituencyItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [voter_id, setVoter_Id] = useState('');
  const [full_name, setFull_Name] = useState('');
  const [DOB, setDOB] = useState(formatDateToString(new Date()));
  const [password, setPasswod] = useState('');
  const [UVC, setUvc] = useState('');
  const [constituency_id, setConstituency_id] = useState('');
  const [showQrScan, setShowQrScan] = useState(false);
  const [error, setError] = useState<string>('');
  //
  useEffect(() => {
    getConstituency();
  }, []);
  //ref name
  const refName = useRef<TextInput>(null);
  //
  const onSignUpPress = async () => {
    try {
      if (UVC.trim() === '') {
        setError('Please enter an UVC');
      } else {
        setError('');
      }
    } catch (err) {}
  };
  // get constituency
  const getConstituency = async () => {
    try {
      const resp = await Get(`${api.SERVER_TEST}/gevs/constituency/all`);
      console.log('resp:::', resp?.status);
      console.log('data:::', resp.data);
    } catch (err) {}
  };
  //
  const handlePressOutside = () => {
    // Hide the keyboard when a tap occurs outside of TextInput
    Keyboard.dismiss();
  };
  //
  return (
    <PageWrapper title={'Sign Up'} showHdr={false}>
      {error !== '' && (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <ErrorMessage message={error} />
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'green',
              margin: 10,
              borderRadius: 10,
            }}
            onPress={() => setError('')}>
            <Text style={{color: 'white'}}>Hide</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}> */}
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={{flex: 1, margin: 10, justifyContent: 'center'}}>
          <AppText title={'User name'} />
          <TextInput
            style={styles.input}
            placeholder="Voter Id"
            placeholderTextColor={Colors.placeholder_text}
            onChangeText={setVoter_Id}
            value={voter_id}
            onSubmitEditing={() => refName?.current?.focus()}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <AppText title={'Full Name'} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={Colors.placeholder_text}
            onChangeText={setFull_Name}
            ref={refName}
            value={full_name}
          />
          <AppText title={'Date Of Birth'} />
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setShowCalendar(true);
            }}>
            <AppText title={DOB} />
          </TouchableOpacity>
          {showCalendar && (
            <AppModal
              closeModal={() => setShowCalendar(false)}
              hideClose={false}
              style={{backgroundColor: '#EFF4FA'}}>
              <View style={{flex: 1, marginVertical: 16}}>
                <RnCalendar
                  date={DOB}
                  setDate={(date: string) => {
                    setDOB(formatStringToStringDate(date));
                    setShowCalendar(false);
                  }}
                />
              </View>
            </AppModal>
          )}
          <AppText title={'Password'} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.placeholder_text}
            onChangeText={setPasswod}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <AppText title={'UVC'} />

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.input}
                placeholder="UVC"
                placeholderTextColor={Colors.placeholder_text}
                onChangeText={setUvc}
                value={UVC}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={{margin: 5}}
              onPress={() => {
                setShowQrScan(true);
              }}>
              <Image
                source={
                  Colors.isDarkMode
                    ? require('../../assets/img/qr-code.png')
                    : require('../../assets/img/qr-code.png')
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          {showQrScan && (
            <AppModal
              closeModal={() => setShowQrScan(false)}
              hideClose={false}
              style={{backgroundColor: '#EFF4FA'}}>
              <View style={{flex: 1, marginVertical: 16}}>
                <QRCodeScanner
                  hideModal={() => setShowQrScan(false)}
                  Uvc={UVC}
                  setValue={val => setUvc(val)}
                />
              </View>
            </AppModal>
          )}
          {/* <View
            style={[
              styles.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <TextInput
              style={{flex: 1, padding: 8}}
              placeholder="UVC"
              placeholderTextColor={Colors.placeholder_text}
              onChangeText={setUvc}
              value={UVC}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={
                  Colors.isDarkMode
                    ? require('../../assets/img/qr-code.png')
                    : require('../../assets/img/qr-code.png')
                }
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View> */}
          <AppText title={'Constituency'} />
          <Dropdown
            constituencyItems={constituencyItems}
            constituency_id={constituency_id}
            setConstituency={(val: string) => {
              setConstituency_id(val);
            }}
          />
          <TouchableOpacity onPress={onSignUpPress} style={styles.signUpBtn}>
            <AppText title={'Sign Up'} style={{fontWeight: 'bold'}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{
              flexDirection: 'row',
              padding: 10,
              marginTop: 10,
              justifyContent: 'center',
            }}>
            <AppText title={`Already have an account?`} />
            <AppText
              title={'SIGN IN'}
              style={{
                paddingLeft: 2,
                fontFamily: 'bold',
                textDecorationLine: 'underline',
                fontStyle: 'italic',
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      {/* </KeyboardAvoidingView> */}
    </PageWrapper>
  );
};
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    color: Colors.text_color,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
  },
  txtColor: {
    color: Colors.text_color,
  },
  signUpBtn: {
    marginTop: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    borderRadius: 10,
    backgroundColor: Colors ? '#124697' : '#38403a',
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
//
export default SignUpScreen;
