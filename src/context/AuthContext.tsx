/*
 * @copyRight by md sarwar hoshen.
 */

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import {Post} from '../api';
import api from '../config/api';
import {setItem, getItem} from '../utils';
//SignIn Props Type
interface SignInPropsType {
  voter_id: string;
  password: string;
}
//Auth Provider Data Type
interface AuthProviderDataType {
  token: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  user_type: string;
  signIn: (params: SignInPropsType) => Promise<void>;
  error: string;
}
//INITIAL STATE
const INITIAL_STATE: AuthProviderDataType = {
  token: '',
  isLoading: true,
  isAuthenticated: false,
  user_type: '',
  signIn: async (_params: SignInPropsType) => {},
  error: '',
};
//
interface AuthProviderType {
  children: ReactNode;
}
interface User {
  user_type: string;
  uvc: string;
}
//
const AuthProvider = ({children}: AuthProviderType) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user_type, setUserType] = useState<string>('');
  //
  //Get Store Usr
  useEffect(() => {
    //
    loadUsr();
  }, []);
  //
  const loadUsr = async () => {
    try {
      setLoading(true);
      const user = await getItem('usr');
      // console.log('user:::', user);

      if (user) {
        setIsAuthenticated(true);
        setUserType(user.user_type);
      }
    } catch (err) {
      // console.error('err:', err);
    } finally {
      setLoading(false);
    }
  };
  //
  const signIn = async (params: SignInPropsType) => {
    try {
      const resp = await Post(`${api.SERVER_TEST}/gevs/auth/login`, params);
      console.log('resp:::::', resp);
      if (resp.status === 'success') {
        // setToken(response.token);
        const data = resp?.data as User;
        setUserType(data.user_type);
        setIsAuthenticated(true);
        setItem('usr', {
          usr_id: params.voter_id,
          user_type: data.user_type,
          uvc: data.uvc,
        });
        setLoading(false);
      } else {
        setError(resp.message ? resp.message : '');
        setIsAuthenticated(false);
        return;
      }
    } catch (err) {}
  };
  return (
    <AuthContext.Provider
      value={{isLoading, token, isAuthenticated, user_type, signIn, error}}>
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
