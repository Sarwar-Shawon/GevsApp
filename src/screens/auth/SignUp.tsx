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
} from '../../compoents';
import {Colors} from '../../utils';

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
  const [showCalendar, setShowCalendar] = useState(false);
  const [voter_id, setVoter_Id] = useState('');
  const [full_name, setFull_Name] = useState('');
  const [DOB, setDOB] = useState('');
  const [password, setPasswod] = useState('');
  const [UVC, setUvc] = useState('');
  const [constituency_id, setConstituency_id] = useState(0);
  //eamil valid check

  const refName = useRef<TextInput>(null);
  //
  const onSignUpPress = async () => {
    try {
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
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}> */}
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={{flex: 1, margin: 10, justifyContent: 'center'}}>
          <AppText title={'User name'} />
          <TextInput
            style={styles.input}
            placeholder="Voter Id"
            placeholderTextColor={'#434242'}
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
            placeholderTextColor={'#434242'}
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
                    setDOB(date);
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
            placeholderTextColor={'#434242'}
            onChangeText={setPasswod}
            value={password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <AppText title={'UVC'} />
          <TextInput
            style={styles.input}
            placeholder="UVC"
            placeholderTextColor={'#434242'}
            onChangeText={setUvc}
            value={UVC}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <AppText title={'Constituency'} />
          <Dropdown />
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
                fontSize: 16,
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
