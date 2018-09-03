import '../App.css'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class ShowFundDetails extends Component {
  static propTypes = {
    fundSelected: PropTypes.object
  }

  static defaultProps = {
    fundSelected: {}
  }

  render() {
    const { fundSelected } = this.props
    return fundSelected.address === '' ? (
      <Paper className="show-fund-details-container" elevation={1}>
        <div className="create-fund">
          Please create a fund on{' '}
          <a
            href="https://beta.rigoblock.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Rigoblock DApp
          </a>
        </div>
      </Paper>
    ) : (
      <Paper className="show-fund-details-container" elevation={1}>
        <div>
          <p>Name: {fundSelected.details.name}</p>
          <p>Address: {fundSelected.address}</p>
          <p>Symbol: {fundSelected.details.symbol}</p>
          <p>Manager: {fundSelected.details.owner}</p>
        </div>
      </Paper>
    )
  }
}

export default ShowFundDetails
