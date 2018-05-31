import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class FundSelect extends Component {

  static propTypes = {
    fundsList: PropTypes.array.isRequired,
    onFundSelect: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    fundSelected: PropTypes.object,
  };

  static defaultProps = {
    fundSelected: {
      address: ''
    }
  }

  onFundSelect = event => {
    this.props.onFundSelect(event)
    // this.setState({ fundSelected: event.target.value });
  };


  renderSelectItems = () => {
    const { fundsList } = this.props
    return fundsList.map((element) => {
      return <MenuItem key={element.details.id} value={element.address}>{element.details.name}</MenuItem>
    }
    )
  }

  render() {
    const { fundSelected, disabled } = this.props
    return (
      <FormControl fullWidth={true} disabled={disabled}>
        <InputLabel htmlFor="fund-select">Your funds</InputLabel>
        <Select
          value={fundSelected.address}
          onChange={this.onFundSelect}
          input={<Input name="fund" id="fund-select" />}
        >
          {this.renderSelectItems()}
        </Select>
      </FormControl>
    );
  }
}

export default FundSelect;