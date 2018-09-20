import './App.css'
import * as CONST from './_utils/const'
import * as Drago from './_utils/drago_utils'
import Divider from '@material-ui/core/Divider'
import FundSelect from './components/fundSelect'
import Grid from '@material-ui/core/Grid'
import LockUnlockActions from './components/lockUnlockActions'
import ManagerAddressInput from './components/managerAddressInput'
import Paper from '@material-ui/core/Paper'
import PoweredMsg from './components/poweredMsg'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ShowFundDetails from './components/showFundDetails'
import TokenSelect from './components/tokenSelect'
import Typography from '@material-ui/core/Typography'
import Web3 from 'web3'
import orange from '@material-ui/core/colors/orange'

class App extends Component {
  state = {
    isMMUnlocked: false,
    account: '',
    fundsList: [],
    fundsListDisabled: true,
    fundSelected: {
      address: ''
    },
    tokenSelected: CONST.tokens[3].GRG,
    // managerAddress: '0xc8DCd42e846466F2D2b89F3c54EBa37bf738019B'.toLowerCase(),
    managerAddress: '',
    errorAddress: '',
    errorMsg: '',
    fundSelectEnabled: true,
    networkId: 3,
    web3: {}
  }

  static childContextTypes = {
    web3: PropTypes.object
  }

  getChildContext() {
    return {
      web3: this.state.web3
    }
  }

  componentDidMount = async () => {
    try {
      let that = this
      setTimeout(async function checkBalance() {
        const { tokenSelected, fundSelected } = that.state
        const accounts = await that.connectMM()
        accounts.length !== 0 ?
          that.setState(
            {
              isMMUnlocked: true,
              account: accounts[0],
              managerAddress: accounts[0]
            },
            that.initSelect
          ) :
          that.setState(
            {
              isMMUnlocked: false,
              account: '',
              managerAddress: '',
              fundsList: [],
              fundSelected: {
                address: ''
              },
            }
          )
        if (tokenSelected && fundSelected.address) {
          await that.updateBalances(tokenSelected, fundSelected)
        }
        setTimeout(checkBalance, 1000)
      }, 1000)

    } catch (err) {
      console.warn(err)
      this.setState({
        errorMsg: 'Cannot connect to Metamask'
      })
    }
  }

  connectMM = async () => {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider)
      let networkId = await web3.eth.net.getId()
      let errorMsg = networkId !== 3 ? 'Please connect to ropsten' : ''

      this.setState({
        web3,
        errorMsg,
        networkId
      })
      return await web3.eth.getAccounts()
    } else {
      this.setState({
        errorMsg: 'Cannot connect to Metamask'
      })
    }
  }

  initSelect = async () => {
    const { managerAddress, networkId } = this.state
    const fundsAddresses = await Drago.getFundsAddresses(
      managerAddress,
      networkId
    )
    const fundsList = await Promise.all(
      fundsAddresses.map(fundAddress => {
        return Drago.getFundDetails(fundAddress, networkId)
      })
    )
    this.setState({
      fundsList,
      fundsListDisabled: false
    })
  }

  updateBalances = async (token, fundSelected) => {
    const { web3 } = this.state
    token.wrappedBalance = await Drago.getWrapperBalance(
      token.wrappers.Ethfinex.address,
      fundSelected.address,
      web3
    )
    token.availableBalance = await Drago.getTokenBalance(
      token.address,
      fundSelected.address,
      web3
    )
    this.setState({
      tokenSelected: token
    })
  }

  onFundSelect = async event => {
    const { fundsList, tokenSelected } = this.state
    const fundSelected = fundsList.find(fund => {
      return fund.address === event.target.value
    })
    this.updateBalances({ ...tokenSelected }, fundSelected)
    this.setState({
      fundSelected
    })
  }

  onTokenSelect = event => {
    const { networkId, fundSelected } = this.state
    const tokenSelected = Object.values(CONST.tokens[networkId]).find(token => {
      return token.symbol === event.target.value
    })
    this.updateBalances({ ...tokenSelected }, fundSelected)
  }

  onChangeManagerAddress = managerAddress => {
    const web3 = new Web3(window.web3.currentProvider)
    if (web3.utils.isAddress(managerAddress)) {
      this.setState(
        {
          errorAddress: ''
        },
        this.initSelect
      )
    } else {
      this.setState({
        fundsListDisabled: true,
        fundSelected: {
          address: ''
        },
        errorAddress: 'Invalid address'
      })
    }
    this.setState({
      managerAddress
    })
  }

  render() {
    const {
      fundsList,
      fundsListDisabled,
      isMMUnlocked,
      fundSelected,
      tokenSelected,
      managerAddress,
      errorAddress,
      errorMsg,
      networkId
    } = this.state

    if (!isMMUnlocked) {
      return (
        <Paper className="paper-container" elevation={4}>
          <Grid item xs={12}>
            <div style={{ color: orange[500], fontWeight: 700 }}>
              {errorMsg}
              {isMMUnlocked ? null : <p>Please unlock MetaMask.</p>}
            </div>
          </Grid>
        </Paper>
      )
    }

    return (
      <div className="App">
        <Paper className="paper-container" elevation={4}>
          <Grid item xs={12}>
            <div style={{ color: orange[500], fontWeight: 700 }}>
              {errorMsg}
              {isMMUnlocked ? null : <p>Please unlock MetaMask.</p>}
            </div>
          </Grid>
          <Typography variant="display1" gutterBottom>
            Fund select
          </Typography>
          <Divider />
          <div className="app-container">
            <Grid item xs={12}>
              <Grid item xs={12}>
                <ManagerAddressInput
                  error={errorAddress}
                  managerAddress={managerAddress.toLowerCase()}
                  onChangeManagerAddress={this.onChangeManagerAddress}
                />
              </Grid>
              <Grid item xs={12}>
                <FundSelect
                  fundsList={fundsList}
                  disabled={fundsListDisabled}
                  onFundSelect={this.onFundSelect}
                  fundSelected={fundSelected}
                />
              </Grid>
              <PoweredMsg />
              <Grid item xs={12}>
                <ShowFundDetails fundSelected={fundSelected} />
              </Grid>
              <Grid item xs={12}>
                <TokenSelect
                  tokensList={Object.values(CONST.tokens[networkId])}
                  onTokenSelect={this.onTokenSelect}
                  tokenSelected={tokenSelected}
                  disabled={fundSelected.address === ''}
                />
                <LockUnlockActions
                  token={tokenSelected}
                  fund={fundSelected}
                  managerAddress={managerAddress}
                  updateBalances={this.updateBalances}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    )
  }
}

export default App
