import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import FundSelect from './components/fundSelect'
import ShowFundDetails from './components/showFundDetails'
import ManagerAddressInput from './components/managerAddressInput'
import PoweredMsg from './components/poweredMsg'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Web3 from 'web3';
import * as abis from './abi/index'
import {
  DRAGO_FACTORY_KOVAN_ADDRESS,
  DRAGO_REGISTRY_KOVAN_ADDRESS
} from './_utils/const'
import Grid from '@material-ui/core/Grid';
import './App.css';


class App extends Component {

  state = {
    isMMUnlocked: false,
    account: '',
    fundsList: [],
    fundsListDisabled: true,
    fundSelected: {
      address: ''
    },
    managerAddress: '0xc8DCd42e846466F2D2b89F3c54EBa37bf738019B',
    errorAddress: '',
    fundSelectEnabled: true
  };

  componentDidMount = () => {
    this.connectMM()
      .then(accounts => {
        this.setState({
          isMMUnlocked: accounts.length !== 0 ? true : false,
          account: accounts[0]
        }, this.initSelect)
      })
      .catch(err => {
        console.log(err)
      })
  }

  connectMM = () => {
    if (typeof window.web3 !== 'undefined') {
      const web3 = new Web3(window.web3.currentProvider)
      return web3.eth.getAccounts()
        .then(accounts => {
          return accounts
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  initSelect = async () => {
    const fundsAddresses = await this.getFundsAddresses()
    const fundsList = await Promise.all(
      fundsAddresses.map(((fundAddress) => {
        return this.getFundDetails(fundAddress)
      }))
    )
    this.setState({
      fundsList,
      fundsListDisabled: false
    })
  }

  //  CONTRACT FUNCTION
  //
  //  function getDragosByAddress(address _owner)
  //  external
  //  view
  //  returns (address[])
  //  {
  //  }

  getFundsAddresses = () => {
    const { account, managerAddress } = this.state
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(abis.dragofactory, DRAGO_FACTORY_KOVAN_ADDRESS)
    var options = {
      from: account,
    }
    return contract.methods.getDragosByAddress(managerAddress)
      .estimateGas(options)
      .then(gasEstimate => {
        options.gas = gasEstimate
      }
      )
      .then(() => {
        return contract.methods.getDragosByAddress(managerAddress).call(options)
      })
      .catch(err => {
        console.log(err)
      })
  }


  //   CONTRACT FUNCTION
  //
  //   function fromAddress(address _drago)
  //   external view
  //   returns (
  //       uint id,
  //       string name,
  //       string symbol,
  //       uint dragoId,
  //       address owner,
  //       address group
  //   )
  //  {
  //  }

  getFundDetails = (fundAddress) => {
    const { account } = this.state
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(abis.dragoregistry, DRAGO_REGISTRY_KOVAN_ADDRESS)
    var options = {
      from: account,
    }
    return contract.methods.fromAddress(fundAddress)
      .estimateGas(options)
      .then(gasEstimate => {
        options.gas = gasEstimate
      }
      )
      .then(() => {
        return contract.methods.fromAddress(fundAddress).call(options)
      })
      .then((details) => {
        return {
          address: fundAddress,
          details
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  onFundSelect = (event) => {
    const { fundsList } = this.state
    const fundSelected = fundsList.find((fund) => {
      return fund.address === event.target.value
    });
    this.setState({
      fundSelected
    });
  }

  onChangeManagerAddress = (managerAddress) => {
    const web3 = new Web3(window.web3.currentProvider)
    if (web3.utils.isAddress(managerAddress)) {
      this.setState({
        errorAddress: ''
      }, this.initSelect)
    } else {
      this.setState({
        fundsListDisabled: true,
        fundSelected: {
          address: ''
        },
        errorAddress:'Invalid address'
      })
    }
    this.setState({
      managerAddress
    });

  }

  render() {
    const { fundsList, 
      fundsListDisabled, 
      isMMUnlocked, 
      fundSelected,
      managerAddress,
      errorAddress,
     } = this.state

    return (
      <div className="App">
      <Paper className='paper-container' elevation={4}>
        <Typography variant="display1" gutterBottom>
          Fund select
        </Typography>
        <Divider />
        <div className='App-container'>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <ManagerAddressInput
              error={errorAddress}
              managerAddress={managerAddress.toLowerCase()}
              onChangeManagerAddress={this.onChangeManagerAddress}/>
            </Grid>
            <Grid item xs={12}>
              {isMMUnlocked ? null : <p>Please unlock MetaMask.</p>}
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
          </Grid>
        </div>
        </Paper>
      </div>
    );
  }
}

export default App;
