import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: '', valid: false },
      password: { value: '', valid: false },
      displayName: { value: '', valid: false },
      hasError: true,
      message: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = (name, value, valid) => {
    this.setState({
      [name]: { value, valid },
      message: '',
      hasError: !valid,
    });
  };

  handleRequest = (event) => {
    event.preventDefault();

    const { email, password, displayName } = this.state;
    if (!email.valid || !password.valid || !displayName.valid) {
      return this.setState({ hasError: true, message: 'Please provide a valid data.' });
    }
    this.setState({ message: '' });

    return postFetcher('/register', {
      email: email.value,
      password: password.value,
      displayName: displayName.value,
    }).then((json) => {
      if (json.error) {
        return this.setState({ message: json.error, hasError: true });
      }
      return this.setState({ message: 'OK', hasError: false });
    });
  };

  renderSuccess = () => {
    const { displayName } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration Completed
          </Typography>
          <Typography component="h2" variant="h6">
            {`Thank you ${displayName.value},`}
          </Typography>
          <Typography>
            Your account has been created and verification email has been send.
            <br />
            Please check your inbox and verify your email address.
          </Typography>
          <Typography>
            <Link to="/">Go to login page</Link>
          </Typography>
        </Paper>
      </div>
    );
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
    const { hasError, message } = this.state;

    if (!hasError && message === 'OK') {
      return this.renderSuccess();
    }

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            CREATE AN ACCOUNT
          </Typography>

          <ATextInput title="Display name" name="displayName" type="text" handler={this.onChange} />
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
            onClick={this.handleRequest}
          >
            Create
          </Button>

          <Typography className={classes.footNav} component="div">
            <Link to="/">Login</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(withRouter(Register));
