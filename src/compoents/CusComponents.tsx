/*
 * @copyRight by md sarwar hoshen.
 */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  TextInput,
  Image,
} from 'react-native';
import {Colors} from '../utils';
//
interface TextPropsType {
  title?: string;
  onBackPress?: () => void;
  style?: TextStyle;
}
//
export const AppText = ({title, style}: TextPropsType) => {
  return <Text style={[styles.container, {...style}]}>{title}</Text>;
};
//
interface PasswordPropsType {
  showPassword?: boolean;
  password?: string;
  placeholder?: string;
  style?: TextStyle;
  setValue: (val: string) => void;
  setShowPassword: (val: boolean) => void;
  refPasswordInput?: React.RefObject<TextInput>;
}
//
export const AppPassword = ({
  placeholder,
  password,
  style,
  setValue,
  refPasswordInput,
  showPassword,
  setShowPassword
}: PasswordPropsType) => {
  // const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <TextInput
        style={[styles.input, {...style}]}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder_text}
        onChangeText={setValue}
        value={password}
        autoCapitalize="none"
        secureTextEntry={!showPassword}
        ref={refPasswordInput}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={[styles.eyeIcon, {...style}]}>
        <Image
          source={
            showPassword
              ? require('../assets/img/hide.png')
              : require('../assets/img/view.png')
          }
          style={{
            width: 30,
            height: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
//
const styles = StyleSheet.create({
  container: {
    color: Colors.text_color,
    fontSize: 16,
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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
