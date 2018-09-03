export const DRAGO_FACTORY_KOVAN_ADDRESS =
  '0x5b67f29f6d50f475d56ace03ce4b0d6a1287dc1f'
export const DRAGO_REGISTRY_KOVAN_ADDRESS =
  '0x80673d1201c5e61e1efdd4e06bef015d1293ccee'

export const DRAGO_FACTORY_ROPSTEN_ADDRESS =
  '0x8c35a5daf283e9ece4c968899eed028859645a8f'
export const DRAGO_REGISTRY_ROPSTEN_ADDRESS =
  '0x82f137b817ab61cdb2af5f23d5b96094b5fe5f7d'

export const EFX_EXCHANGE_ADDRESS = '0x67799a5e640bc64ca24d3e6813842754e546d7b1'

export const contracts = {
  3: {
    dragoFactory: DRAGO_FACTORY_ROPSTEN_ADDRESS,
    dragoRegistry: DRAGO_REGISTRY_ROPSTEN_ADDRESS
  },
  42: {
    dragoFactory: DRAGO_FACTORY_KOVAN_ADDRESS,
    dragoRegistry: DRAGO_REGISTRY_KOVAN_ADDRESS
  }
}

export const tokens = {
  3: {
    ZRX: {
      symbol: 'ZRX',
      isOldERC20: false,
      symbolTicker: {
        Ethfinex: 'ZRX'
      },
      address: '0xA8E9Fa8f91e5Ae138C74648c9C304F1C75003A8D',
      decimals: 18,
      name: '0x Protocol Token',
      wrappers: {
        Ethfinex: {
          symbol: 'ZRXW',
          decimals: 18,
          address: '0xFF32E76EAdc11Fc816A727980E92805D237CDB28',
          name: 'ZRX Wrapper'
        }
      }
    },
    ETH: {
      symbol: 'ETH',
      isOldERC20: false,
      symbolTicker: {
        Ethfinex: 'ETH'
      },
      address: '0x0',
      decimals: 18,
      name: 'Ether',
      wrappers: {
        Ethfinex: {
          symbol: 'ETHW',
          decimals: 18,
          address: '0x965808e7F815CfffD4c018ef2Ba4C5A65EBa087e',
          name: 'ETH Wrapper'
        }
      }
    },
    USDT: {
      symbol: 'USDT',
      isOldERC20: true,
      symbolTicker: {
        Ethfinex: 'USD'
      },
      address: '0x0736d0c130b2eAD47476cC262dbed90D7C4eeABD',
      decimals: 6,
      name: 'Tether USD',
      wrappers: {
        Ethfinex: {
          symbol: 'USDTW',
          decimals: 6,
          address: '0x83E42e6d1ac009285376340ef64BaC1C7d106C89',
          name: 'USDT Wrapper'
        }
      }
    },
    GRG: {
      symbol: 'GRG',
      isOldERC20: false,
      symbolTicker: {
        Ethfinex: 'GRG'
      },
      address: '0x6FA8590920c5966713b1a86916f7b0419411e474',
      decimals: 18,
      name: 'GRG Token',
      wrappers: {
        Ethfinex: {
          symbol: 'GRGW',
          decimals: 18,
          address: '0x5959f2036608d693B4d085020ACAdBBf664C793E',
          name: 'GRG Wrapper'
        }
      }
    }
  }
}
