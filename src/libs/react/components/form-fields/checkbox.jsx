import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class ACheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      require: props.require,
      fullWidth: props.fullWidth,
      isChecked: props.checked,
    };
  }

  onChange = () => {
    this.setState((prev, props) => {
      props.handler(props.name, !prev.isChecked, true);
      return { isChecked: !prev.isChecked };
    });
  };

  render() {
    const { require, fullWidth, isChecked } = this.state;
    const { title, color } = this.props;
    return (
      <FormControl margin="normal" required={require} fullWidth={fullWidth}>
        <FormControlLabel
          control={<Switch checked={isChecked} onChange={this.onChange} color={color} />}
          label={title}
        />
      </FormControl>
    );
  }
}

ACheckBox.defaultProps = {
  color: 'primary',
  require: false,
  fullWidth: true,
  checked: false,
};

ACheckBox.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  require: PropTypes.bool,
  fullWidth: PropTypes.bool,
  checked: PropTypes.bool,
};

export default ACheckBox;
