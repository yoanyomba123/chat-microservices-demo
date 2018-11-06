// npm
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import FloodProtector from './floodProtector';
import MessageInput from './messageInput';
import styles from './style';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      message: '',
      floodProtect: false,
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.scrollChatWindow();

    socket.on('haveMessage', (msg) => {
      const { chat } = this.state;
      chat.push(msg);
      this.setState({ chat });
      this.scrollChatWindow();
    });

    socket.on('getLastMessages', (data) => {
      this.setState({ chat: data.messages });
    });

    socket.on('flood', () => {
      this.setState({ floodProtect: true });
      setTimeout(() => {
        this.setState({ floodProtect: false });
      }, 8000);
    });
  }

  scrollChatWindow = () => {
    const chatWindow = document.getElementById('chat-messages');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  };

  getTime = () => {
    const now = new Date();
    return `${String(`0${now.getHours()}`).slice(-2)}:${String(`0${now.getMinutes()}`).slice(-2)}`;
  };

  sendMessage = () => {
    const { message, floodProtect, chat } = this.state;
    if (!message) {
      return null;
    }
    if (floodProtect) {
      return null;
    }
    const { socket, me } = this.props;
    socket.emit('newMessage', message);
    const newMessage = {
      id: shortid.generate(),
      time: this.getTime(),
      username: me.displayName,
      msg: message,
    };
    chat.push(newMessage);
    return this.setState({ message: '', chat }, () => {
      this.scrollChatWindow();
    });
  };

  handlePress = (e) => {
    if (e.keyCode !== 13) {
      return null;
    }
    return this.sendMessage();
  };

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    const { me, classes, drawerOpen } = this.props;
    const { chat, floodProtect, message } = this.state;

    return (
      <main
        id="chat-messages"
        className={classNames(classes.content, drawerOpen && classes.shifter)}
      >
        {chat
          && chat.map(item => (
            <Paper square key={item.id} className={classes.messageText}>
              <Typography variant="body2" component="span" className="messagexx">
                <Chip
                  className={classNames(
                    classes.chip,
                    item.username === me.displayName && classes.messageMine,
                  )}
                  label={item.username}
                  avatar={(
                    <Avatar
                      className={classNames(
                        classes.avatar,
                        item.username === me.displayName && classes.avatarMine,
                      )}
                    >
                      {item.time}
                    </Avatar>
)}
                />
                {item.msg}
              </Typography>
            </Paper>
          ))}
        <MessageInput
          message={message}
          handleChange={this.handleChange}
          handlePress={this.handlePress}
          sendMessage={this.sendMessage}
        />

        <FloodProtector floodProtect={floodProtect} />
      </main>
    );
  }
}

Messages.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.object]).isRequired,
  me: PropTypes.oneOfType([PropTypes.object]).isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  socket: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default withStyles(styles)(Messages);
