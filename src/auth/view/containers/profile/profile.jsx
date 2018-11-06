// npm
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './style';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userX: '',
    };
  }

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <p>{user.displayName}</p>
        <p>{user.avatar}</p>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(withRouter(Profile));
