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
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useAuthContext} from '../../context';

import {PageWrapper, AppText, ErrorMessage} from '../../compoents';
import {Colors} from '../../utils';
import {StackAuthProps} from '../../route/AuthRoutes';

//SignInScreen
const SignInScreen = ({navigation}: StackAuthProps) => {
  const {signIn, error: signInError} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [voter_id, setVoter_Id] = useState('');
  const [password, setPasswod] = useState('');
  const [error, setError] = useState<string>('');
  const refPasswordInput = useRef<TextInput>(null);
  //
  useEffect(() => {
    setError(signInError);
  }, [signInError]);
  //
  const onSignInPress = async () => {
    try {
      setError('');
      if (
        voter_id.length === 0 ||
        password.length === 0 ||
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(voter_id) === false
      ) {
        setError('Enter valid email and password');
        return;
      }
      setLoading(true);
      await signIn({voter_id, password});
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  //
  const onForgotPress = async () => {
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
    <PageWrapper title={'Sign In'} showHdr={false}>
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
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={{flex: 1, margin: 10, justifyContent: 'center'}}>
            <AppText title={'Voter Id'} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.placeholder_text}
              onChangeText={setVoter_Id}
              value={voter_id}
              onSubmitEditing={() => refPasswordInput?.current?.focus()}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <AppText title={'Password'} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.placeholder_text}
              onChangeText={setPasswod}
              value={password}
              ref={refPasswordInput}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {loading ? (
              <TouchableOpacity style={styles.signInBtn} onPress={() => {}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={'small'} color={Colors.text_color} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={onSignInPress}
                style={styles.signInBtn}>
                <AppText title={'SignIn'} style={{fontWeight: 'bold'}} />
              </TouchableOpacity>
            )}
            {/* 
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <AppText
              title={`Forgot Password?`}
              style={{marginTop: 10, alignSelf: 'flex-end', color: '#F2F1EB'}}
            />
          </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{
                flexDirection: 'row',
                padding: 10,
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <AppText title={`Need an account?`} />
              <AppText
                title={'SIGN UP'}
                style={{
                  paddingLeft: 2,
                  fontFamily: 'bold',
                  textDecorationLine: 'underline',
                  fontStyle: 'italic',
                }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
  },
  txtColor: {
    color: Colors.text_color,
  },
  signInBtn: {
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
export default SignInScreen;
