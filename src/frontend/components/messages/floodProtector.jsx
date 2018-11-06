// npm
import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

const FloodProtector = (props) => {
  const { floodProtect } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={floodProtect}
      ContentProps={{ 'aria-describedby': 'message-id' }}
      message={<span id="message-id">Slow down babe! (Remember the horse!)</span>}
    />
  );
};

FloodProtector.propTypes = {
  floodProtect: PropTypes.bool.isRequired
};

export default FloodProtector;
