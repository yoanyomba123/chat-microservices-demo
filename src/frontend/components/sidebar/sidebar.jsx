// npm
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import UserIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitIcon from '@material-ui/icons/ExitToApp';
import styles from './style';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      server: '',
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('getOnlineUsers', users => {
      this.setState({ users });
    });

    socket.on('newUserJoined', user => {
      const { users } = this.state;
      users.push(user);
      users.sort();
      this.setState({ users });
    });

    socket.on('userLeft', id => {
      const { users } = this.state;
      this.setState({ users: users.filter(user => user[0] !== id) });
    });

    socket.on('serverInfo', server => {
      this.setState({ server });
    });
  }

  handleLogout = () => {
    const { logoutUrl, socket } = this.props;
    socket.emit('logout');
    window.location.href = logoutUrl;
  };

  render() {
    const {
      classes, me, drawerOpen, handleDrawer
    } = this.props;
    const { server, users } = this.state;

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        open={drawerOpen}
      >
        <div className={classes.drawerHeader}>
          <div className={classes.server}>
            <small>{server}</small>
          </div>
          <IconButton className={classes.iconButton} size="small" onClick={handleDrawer}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
          <div className={classes.userSelf}>{me.displayName}</div>
          <IconButton className={classes.iconButton} size="small" onClick={this.logout}>
            <ExitIcon fontSize="small" />
          </IconButton>
        </div>
        <Divider className={classes.navDivider} />
        <List dense component="nav" className={classes.root}>
          {users
            && users.map(user => (
              <ListItem key={user[0]} className={classes.userItem}>
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText primary={user[1]} />
              </ListItem>
            ))}
        </List>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  logoutUrl: PropTypes.string.isRequired,
  me: PropTypes.oneOfType([PropTypes.object]).isRequired,
  socket: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(Sidebar);
