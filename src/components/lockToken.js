import * as Drago from '../_utils/drago_utils'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class LockToken extends Component {
  static propTypes = {
    token: PropTypes.object.isRequired,
    amountToLock: PropTypes.string.isRequired,
    amountToUnlock: PropTypes.string.isRequired,
    onChangeAmount: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    errorMsg: PropTypes.object.isRequired,
    tokenLock: PropTypes.func.isRequired,
    tokenUnLock: PropTypes.func.isRequired
  }

  static defaultProps = {
    token: {},
    amountToLock: '0',
    amountToUnlock: '0',
    errorMsg: {
      amountToLock: '',
      amountToUnlock: ''
    },
    disabled: true
  }

  onChangeAmount = event => {
    this.props.onChangeAmount(event.target.value, event.target.id)
  }

  render() {
    const {
      disabled,
      token,
      errorMsg,
      amountToLock,
      amountToUnlock
    } = this.props
    return (
      <FormControl error={errorMsg !== ''} fullWidth={true} margin={'normal'}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <p>
              {token.symbol}: {token.address}
            </p>
            Available to lock <br />
            {typeof token.availableBalance !== 'undefined'
              ? Drago.toUnitAmount(
                  token.availableBalance,
                  token.decimals
                ).toFixed(4)
              : Drago.toUnitAmount('0', token.decimals).toFixed(4)}{' '}
            {token.symbol}
          </Grid>
          <Grid item xs={6}>
            <p>
              {token.wrappers.Ethfinex.symbol}:{' '}
              {token.wrappers.Ethfinex.address}
            </p>
            Locked <br />
            {typeof token.wrappedBalance !== 'undefined'
              ? Drago.toUnitAmount(
                  token.wrappedBalance,
                  token.decimals
                ).toFixed(4)
              : Drago.toUnitAmount('0', token.decimals).toFixed(4)}{' '}
            {token.symbol}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={'amountToLock'}
              disabled={disabled}
              label="Amount to lock (1h)"
              InputLabelProps={{
                shrink: true
              }}
              placeholder="Amount"
              onChange={this.onChangeAmount}
              fullWidth
              margin="normal"
              value={amountToLock}
            />
            <FormHelperText>{errorMsg.amountToLock}</FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id={'amountToUnlock'}
              disabled={disabled}
              label="Amount to unlock"
              InputLabelProps={{
                shrink: true
              }}
              placeholder="Amount"
              onChange={this.onChangeAmount}
              fullWidth
              margin="normal"
              value={amountToUnlock}
            />
            <FormHelperText>{errorMsg.amountToUnlock}</FormHelperText>
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={
                disabled || errorMsg.amountToLock !== '' || amountToLock === '0'
              }
              variant="contained"
              color="primary"
              onClick={this.props.tokenLock}
            >
              Lock
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={
                disabled ||
                errorMsg.amountToUnlock !== '' ||
                amountToUnlock === '0'
              }
              variant="contained"
              color="secondary"
              onClick={this.props.tokenUnLock}
            >
              Unlock
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    )
  }
}

export default LockToken
