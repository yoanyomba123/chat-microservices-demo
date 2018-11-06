import React from 'react';
import PropTypes from 'prop-types';
import Loader from './loader';

const AuthContext = React.createContext();

export const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authHandler: this.authHandler,
      isAuthenticated: false,
      isLoading: false,
      userInfo: '',
    };
  }

  componentDidMount() {
    const { authUrl } = this.props;
    this.setState({ isLoading: true });

    fetch(authUrl, {
      credentials: 'include',
      cache: 'no-cache',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok || response.status !== 200) return false;
        return response.json();
      })
      .then((json) => {
        this.authHandler(json);
      });
  }

  authHandler = (json) => {
    this.setState({
      userInfo: json.user,
      isLoading: false,
      isAuthenticated: !json.error,
    });
  };

  renderLoader = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return <React.Fragment />;
  };

  render() {
    const { children } = this.props;
    const { isAuthenticated, userInfo, authHandler } = this.state;
    return (
      <AuthContext.Provider value={{ userInfo, isAuthenticated, authHandler }}>
        {this.renderLoader()}
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.defaultProps = {
  authUrl: '/auth',
};

AuthProvider.propTypes = {
  authUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
