import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styles/theme';
import Register from './containers/register';
import ResetRequest from './containers/reset-request';
import ResetPassword from './containers/reset-password';
import ProfileWrapper from './containers/profile';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-request" component={ResetRequest} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route exact path="/" component={ProfileWrapper} />
      </div>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
