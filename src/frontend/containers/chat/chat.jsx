import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Sidebar from '../../components/sidebar/sidebar';
import Messages from '../../components/messages/messages';
import styles from './style';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
    };
  }

  handleDrawer = () => {
    const { drawerOpen } = this.state;
    this.setState({ drawerOpen: !drawerOpen });
  };

  render() {
    const {
      classes, me, logoutUrl, socket,
    } = this.props;
    const { drawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <Messages drawerOpen={drawerOpen} me={me} socket={socket} />

        <Fab
          aria-label="Menu"
          onClick={this.handleDrawer}
          className={classNames(classes.menuButton, drawerOpen && classes.hide)}
        >
          <ChevronLeftIcon />
        </Fab>

        <Sidebar
          me={me}
          logoutUrl={logoutUrl}
          handleDrawer={this.handleDrawer}
          drawerOpen={drawerOpen}
          socket={socket}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  logoutUrl: PropTypes.string.isRequired,
  me: PropTypes.oneOfType([PropTypes.object]).isRequired,
  socket: PropTypes.oneOfType([PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(Chat);
