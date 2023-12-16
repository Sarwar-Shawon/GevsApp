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
} from 'react-native';
import {PageWrapper, AppText} from '../../compoents';
import {Colors} from '../../utils';
import {StackAuthProps} from '../../route/AuthRoutes';
//SignInScreen
const ForgotPassword = ({navigation}: StackAuthProps) => {
  const [username, setUsername] = useState('');
  const [password, setPasswod] = useState('');
  //eamil valid check
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const refPasswordInput = useRef<TextInput>(null);
  //
  const onSignInPress = async () => {
    try {
    } catch (err) {}
  };
  //
  const onForgotPress = async () => {
    try {
    } catch (err) {}
  };
  //
  const onSignUpPress = async () => {
    try {
    } catch (err) {}
  };
  //
  return (
    <PageWrapper title={'Sign In'} showHdr={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={{flex: 1, margin: 10, justifyContent: 'center'}}>
          <AppText title={'User name'} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={Colors.placeholder_text}
            onChangeText={setUsername}
            value={username}
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
          <TouchableOpacity onPress={onSignInPress} style={styles.signInBtn}>
            <AppText title={'SignIn'} style={{fontWeight: 'bold'}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onForgotPress}>
            <AppText
              title={`Forgot Password?`}
              style={{marginTop: 10, alignSelf: 'flex-end', color: '#F2F1EB'}}
            />
          </TouchableOpacity>

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
                fontSize: 16,
                textDecorationLine: 'underline',
                fontStyle: 'italic',
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
export default ForgotPassword;
