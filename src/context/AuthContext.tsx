/*
 * @copyRight by md sarwar hoshen.
 */

import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Post} from '../api';
import api from '../config/api';
//SignIn Props Type
interface SignInPropsType {
  voter_id: string;
  password: string;
}
//Auth Provider Data Type
interface AuthProviderDataType {
  token: string;
  isAuthenticated: boolean;
  user_type: string;
  signIn: (params: SignInPropsType) => Promise<void>;
  isLoading: boolean;
  error: string;
}
//INITIAL STATE
const INITIAL_STATE: AuthProviderDataType = {
  token: '',
  isAuthenticated: false,
  user_type: '',
  signIn: async (_params: SignInPropsType) => {},
  isLoading: false,
  error: '',
};
//
interface AuthProviderType {
  children: ReactNode;
}
//
const AuthProvider = ({children}: AuthProviderType) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user_type, setUserType] = useState<string>('');
  //
  const signIn = async (params: SignInPropsType) => {
    try {
      const resp = await Post(`${api.SERVER_TEST}/gevs/auth/login`, params);
      console.log('resp:::::', resp);
      if (resp.status === 'success') {
        // setToken(response.token);
        const data = resp?.data as string;
        setUserType(data);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setError(resp.message ? resp.message : '');
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }
    } catch (err) {}
  };

  return (
    <AuthContext.Provider
      value={{isLoading, token, isAuthenticated,user_type, signIn, error}}>
      {children}
    </AuthContext.Provider>
  );
};
//
export default AuthProvider;
//
export const AuthContext = createContext<AuthProviderDataType>(INITIAL_STATE);
//
export const useAuthContext = () => useContext(AuthContext);
