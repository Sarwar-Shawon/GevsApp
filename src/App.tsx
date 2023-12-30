import React from 'react';
import AppNavigator from './route/Routes';
import AuthProvider from './context/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};
