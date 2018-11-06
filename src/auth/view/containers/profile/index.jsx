// npm
import React from 'react';
import AuthProvider, { AuthConsumer } from '../../../../libs/react/helpers/auth-provider';
import Login from '../login';
import Profile from './profile';

const ProfileWrapper = () => (
  <AuthProvider>
    <AuthConsumer>
      {context => (context.isAuthenticated ? (
        <Profile user={context.userInfo} />
      ) : (
        <Login authHandler={context.authHandler} />
      ))
      }
    </AuthConsumer>
  </AuthProvider>
);

export default ProfileWrapper;
