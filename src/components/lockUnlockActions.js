import * as CONST from '../_utils/const'
import * as Drago from '../_utils/drago_utils'
import BigNumber from 'bignumber.js'
import LockToken from './lockToken'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class LockUnlockActions extends Component {
  state = {
    amountToLock: '0',
    amountToUnlock: '0',
    errorMsg: {
      amountToLock: '',
      amountToUnlock: ''
    }
  }

  static propTypes = {
    token: PropTypes.object.isRequired,
    fund: PropTypes.object,
    managerAddress: PropTypes.string.isRequired
  }

  static defaultProps = {
    fund: {},
    managerAddress: ''
  }

  static contextTypes = { web3: PropTypes.object.isRequired }

  componentDidMount = async () => {
    // const { web3 } = this.context
    // let { token } = this.state
    // let { fund } = this.props
    // token.avaliableBalance = await Drago.getWrapperBalance(
    //   token.wrappers.Ethfinex.address,
    //   fund.address,
    //   web3
    // )
    // this.setState({ token })
  }

  getWrapperBalance = async (token, fund) => {
    const { web3 } = this.context
    return await Drago.getWrapperBalance(
      token.wrappers.Ethfinex.address,
      fund.address,
      web3
    )
  }

  tokenUnLock = async () => {
    const { amountToUnlock } = this.state
    const { managerAddress, token, fund } = this.props
    await Drago.operateOnExchangeEFXUnlock(
      managerAddress,
      fund.address,
      CONST.EFX_EXCHANGE_ADDRESS,
      token.address,
      token.wrappers.Ethfinex.address,
      Drago.toBaseUnitAmount(new BigNumber(amountToUnlock), token.decimals)
    )
  }

  tokenLock = async () => {
    const { amountToLock } = this.state
    const { managerAddress, token, fund } = this.props
    await Drago.operateOnExchangeEFXLock(
      managerAddress,
      fund.address,
      CONST.EFX_EXCHANGE_ADDRESS,
      token.address,
      token.wrappers.Ethfinex.address,
      Drago.toBaseUnitAmount(new BigNumber(amountToLock), token.decimals),
      1,
      token.isOldERC20
    )
  }

  onChangeAmount = async (newAmount, amountType) => {
    let { token } = this.props
    try {
      let amount = new BigNumber(newAmount)
      return amount.gt(0) &&
        Drago.toBaseUnitAmount(amount, token.decimals).lte(
          amountType === 'amountToLock'
            ? token.availableBalance
            : token.wrappedBalance
        )
        ? this.setState({
            [amountType]: newAmount,
            errorMsg: {
              [amountType]: ''
            }
          })
        : this.setState({
            [amountType]: newAmount,
            errorMsg: {
              [amountType]:
                'Please enter an amount <= than the available balance.'
            }
          })
    } catch (err) {
      console.warn(err)
      this.setState({
        [amountType]: newAmount,
        errorMsg: {
          [amountType]: 'Please enter a valid number.'
        }
      })
    }
  }

  render() {
    const { token, fund } = this.props
    const { errorMsg, amountToLock, amountToUnlock } = this.state
    return (
      <LockToken
        token={token}
        amountToLock={amountToLock}
        amountToUnlock={amountToUnlock}
        disabled={fund.address === ''}
        onChangeAmount={this.onChangeAmount}
        errorMsg={errorMsg}
        tokenLock={this.tokenLock}
        tokenUnLock={this.tokenUnLock}
      />
    )
  }
}

export default LockUnlockActions
