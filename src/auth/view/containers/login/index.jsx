// npm
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';
import { postFetcher } from '../../../../libs/js-common/utils';
import ATextInput from '../../../../libs/react/components/form-fields/text-input';
import styles from './style';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: '', valid: false },
      password: { value: '', valid: false },
      message: '',
      callbackUrl: '',
      hasError: true,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const queries = queryString.parse(location.search);
    if (queries && queries.confirmed && queries.confirmed === 1) {
      this.setState({ message: 'Your account activated.', hasError: false });
    }
    if (queries && queries.ref) {
      this.setState({ callbackUrl: queries.ref });
    }
  }

  onChange = (name, value, valid) => {
    this.setState({
      [name]: { value, valid },
      message: '',
      hasError: !valid,
    });
  };

  handleLogin = (event) => {
    event.preventDefault();

    const { email, password, callbackUrl } = this.state;
    const { authHandler } = this.props;

    if (!email.valid || !password.valid) {
      return this.setState({ hasError: true, message: 'Invalid credential!' });
    }
    this.setState({ message: '', hasError: false });
    return postFetcher('/login', { email: email.value, password: password.value }).then((json) => {
      if (json.error || !json.user) {
        return this.setState({ message: 'Login failed!', hasError: true });
      }

      if (callbackUrl) {
        window.location.href = callbackUrl;
      } else {
        authHandler(json);
      }
      return true;
    });
  };

  renderMessage = () => {
    const { message, hasError } = this.state;
    const { classes } = this.props;
    const variant = hasError ? classes.error : classes.info;

    if (message.length === 0) {
      return <div />;
    }
    return (
      <Typography className={variant} component="div">
        {message}
      </Typography>
    );
  };

  render() {
    const { classes } = this.props;
    const { hasError } = this.state;

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <ATextInput title="Email" name="email" type="email" handler={this.onChange} />
          <ATextInput
            title="Password"
            name="password"
            type="password"
            handler={this.onChange}
            min={6}
          />

          {this.renderMessage()}
          <Button
            type="button"
            disabled={hasError}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleLogin}
          >
            Login
          </Button>
          <Typography className={classes.footNav} component="div">
            <Link to="/register">Create an account</Link>
            {' | '}
            <Link to="/reset-request">Forgotten password</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
  authHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(withRouter(Login));
