import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class ManagerAddressInput extends Component {

  static propTypes = {
    error: PropTypes.string.isRequired,
    managerAddress: PropTypes.string.isRequired,
    onChangeManagerAddress:PropTypes.func.isRequired,
  };

  onChangeManagerAddress = event => {
    this.props.onChangeManagerAddress(event.target.value)
  };

  render() {
    const { error } = this.props
    return (
      <FormControl error={(error !== '')} fullWidth={true}>
        <TextField
          label="Manager address"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Address"
          onChange={this.onChangeManagerAddress}
          fullWidth
          margin="normal"
          value={this.props.managerAddress}
        />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    );
  }
}

export default ManagerAddressInput;