import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShowFundDetails extends Component {

  static propTypes = {
    fundSelected: PropTypes.object,
  };

  render() {
    const { fundSelected } = this.props
    return fundSelected.address === ''
    ? 'Please select a fund'
    : (
      <div>
        <p>Name: {fundSelected.details.name}</p>
        <p>Address: {fundSelected.address}</p>
        <p>Symbol: {fundSelected.details.symbol}</p>
        <p>Manager: {fundSelected.details.owner}</p>
      </div>
    );
  }
}

export default ShowFundDetails;