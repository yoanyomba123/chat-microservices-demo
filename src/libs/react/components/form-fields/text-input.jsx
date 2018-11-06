import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { string, object } from 'yup';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class ATextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      require: props.require,
      fullWidth: props.fullWidth,
      value: props.value,
      error: '',
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value, error: '' }, () => {
      this.validate();
    });
  };

  makeIField = () => {
    const { require } = this.state;
    const { type, min, max } = this.props;

    let iField = string();
    if (type === 'email') {
      iField = iField.email();
    }
    if (type === 'url') {
      iField = iField.url();
    }
    if (require) {
      iField = iField.required();
    }
    if (min > 0) {
      iField = iField.min(min);
    }
    if (max > 0) {
      iField = iField.max(max);
    }
    return iField;
  };

  validate = async () => {
    const { value } = this.state;
    const { handler, name, title } = this.props;

    const iSchema = object().shape({ value: this.makeIField() });
    const valid = await iSchema.isValid({ value });
    if (!valid) {
      const errors = await iSchema.validate({ value }).catch(err => err.errors);
      this.setState({ error: `${title} ${errors[0]}` });
    }
    handler(name, value, valid);
  };

  render() {
    const {
      value, error, require, fullWidth,
    } = this.state;
    const { title, name, type } = this.props;
    const hasError = error.length > 0;

    return (
      <FormControl
        margin="normal"
        required={require}
        fullWidth={fullWidth}
        aria-describedby={`helper-${name}`}
      >
        <InputLabel htmlFor={name}>{title}</InputLabel>
        <Input
          id={name}
          name={name}
          type={type}
          onChange={this.onChange}
          value={value}
          error={hasError}
          autoComplete="off"
        />
        <FormHelperText id={`helper-${name}`}>{error}</FormHelperText>
      </FormControl>
    );
  }
}

ATextInput.defaultProps = {
  min: 0,
  max: 0,
  value: '',
  type: 'text',
  require: true,
  fullWidth: true,
};

ATextInput.propTypes = {
  require: PropTypes.bool,
  fullWidth: PropTypes.bool,
  value: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'url', 'password']),
  handler: PropTypes.func.isRequired,
};

export default ATextInput;
