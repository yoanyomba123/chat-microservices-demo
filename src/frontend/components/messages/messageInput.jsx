// npm
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

// icons
import SendIcon from '@material-ui/icons/Send';

// styles
const styles = theme => ({
  appBarBottom: {
    zIndex: 9999,
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.grey['300'],
    borderTop: '3px solid rgba(0,0,0,0.25)'
  },
  messageBox: {
    margin: 8,
    backgroundColor: theme.palette.common.white,
    '&:focus': {
      borderColor: theme.palette.primary.main
    }
  }
});

const MessageInput = (props) => {
  const {
    message, handleChange, handlePress, sendMessage, classes
  } = props;
  return (
    <AppBar position="fixed" className={classes.appBarBottom}>
      <Toolbar>
        <TextField
          id="standard-full-width"
          className={classes.messageBox}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleChange}
          onKeyDown={handlePress}
          value={message}
        />
        <IconButton
          color="primary"
          className={classes.button}
          aria-label="Send"
          onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

MessageInput.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  message: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handlePress: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(MessageInput);
