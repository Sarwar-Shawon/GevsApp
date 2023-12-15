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
} from 'react-native';
import {PageWrapper, AppText} from '../../compoents';
import {Colors} from '../../utils';
const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPasswod] = useState('');
  //eamil valid check
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //
  return (
    <PageWrapper title={'Sign In'} showHdr={false}>
      <View style={{flex: 1, margin: 20, justifyContent: 'center'}}>
        <View>
          <AppText title={'User name'} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
            keyboardType="email-address"
          />
          <AppText title={'Password'} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPasswod}
            value={password}
            secureTextEntry={true}
          />
        </View>
      </View>
    </PageWrapper>
  );
};
export default SignInScreen;
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
});
