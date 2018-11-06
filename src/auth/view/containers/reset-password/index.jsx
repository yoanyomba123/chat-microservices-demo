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

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: { value: '', valid: false },
      password: { value: '', valid: false },
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

    const { code, password } = this.state;
    if (!code.valid || !password.valid) {
      return null;
    }
    this.setState({ message: '' });

    return postFetcher('/reset-password', { code: code.value, password: password.value }).then(
      (err) => {
        if (err) {
          return this.setState({ message: 'An error occurred during process!', hasError: true });
        }
        return this.setState({ message: 'Your password has been changed.', hasError: false });
      },
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
    const { hasError } = this.state;

    return (
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            NEW PASSWORD
          </Typography>

          <ATextInput title="Code" name="code" type="text" handler={this.onChange} />

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
            Change
          </Button>

          <Typography className={classes.footNav} component="div">
            <Link to="/register">Create an account</Link>
            {' | '}
            <Link to="/">Login</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(withRouter(ResetPassword));
