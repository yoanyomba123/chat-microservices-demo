import React from 'react';
import io from 'socket.io-client';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthProvider, { AuthConsumer } from '../libs/react/helpers/auth-provider';
import webConfig from '../config/runtime/web.config';
import Chat from './containers/chat/chat';
import theme from './styles/theme';

const authService = process.env.NODE_ENV === 'production'
  ? webConfig.authapi.production
  : webConfig.authapi.development;

const chatApi = process.env.NODE_ENV === 'production'
  ? webConfig.chatapi.production
  : webConfig.chatapi.development;

const callbackUrl = process.env.NODE_ENV === 'production' ? webConfig.productionDomain : webConfig.developmentDomain;
const logoutUrl = `http://${authService.server}:${authService.port}/logout?ref=//${callbackUrl}`;
const authUrl = `http://${authService.server}:${authService.port}/auth`;
const socket = io(`http://${chatApi.server}:${chatApi.port}`);

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider authUrl={authUrl}>
      <AuthConsumer>
        {(context) => {
          if (context.isAuthenticated) {
            socket.emit('join', context.userInfo.displayName, context.userInfo.id);
            return <Chat me={context.userInfo} socket={socket} logoutUrl={logoutUrl} />;
          }
          return <React.Fragment />;
        }}
      </AuthConsumer>
    </AuthProvider>
  </MuiThemeProvider>
);

export default App;
