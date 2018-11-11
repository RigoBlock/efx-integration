export const DRAGO_FACTORY_KOVAN_ADDRESS =
  '0x5b67f29f6d50f475d56ace03ce4b0d6a1287dc1f'
export const DRAGO_REGISTRY_KOVAN_ADDRESS =
  '0x80673d1201c5e61e1efdd4e06bef015d1293ccee'

export const DRAGO_FACTORY_ROPSTEN_ADDRESS =
  '0xe4c028a19dea70fb15d7d56c6e5779e363f685d0'
export const DRAGO_REGISTRY_ROPSTEN_ADDRESS =
  '0x4e868d1ddf940316964ea7673e21be6cbed8b30b'

export const DRAGO_FACTORY_MAINNET_ADDRESS =
  '0x6000f8fd5db35e17b4e25cba72933165708fbf86'
export const DRAGO_REGISTRY_MAINNET_ADDRESS =
  '0xde6445484a8dcd9bf35fc95eb4e3990cc358822e'

//export const EFX_EXCHANGE_ADDRESS = '0x1d8643aae25841322ecde826862a9fa922770981' // ROPSTEN
export const EFX_EXCHANGE_ADDRESS = '0xdcdb42c9a256690bd153a7b409751adfc8dd5851' // MAINNET

export const contracts = {
  1: {
    dragoFactory: DRAGO_FACTORY_MAINNET_ADDRESS,
    dragoRegistry: DRAGO_REGISTRY_MAINNET_ADDRESS
  },
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
  1: {
    ZRX: {
      symbol: 'ZRX',
      isOldERC20: false,
      symbolTicker: {
        Ethfinex: 'ZRX'
      },
      address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
      decimals: 18,
      name: '0x Protocol Token',
      wrappers: {
        Ethfinex: {
          symbol: 'ZRXW',
          decimals: 18,
          address: '0xCf67d7A481CEEca0a77f658991A00366FED558F7',
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
          address: '0xaA7427D8f17D87a28F5e1ba3aDBB270bAdbe1011',
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
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 6,
      name: 'Tether USD',
      wrappers: {
        Ethfinex: {
          symbol: 'USDTW',
          decimals: 6,
          address: '0x1a9B2d827F26B7d7C18fEC4c1B27c1E8dEeBa26e',
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
      address: '0x4FbB350052Bca5417566f188eB2EBCE5b19BC964',
      decimals: 18,
      name: 'GRG Token',
      wrappers: {
        Ethfinex: {
          symbol: 'GRGW',
          decimals: 18,
          address: '0xacfb4c79259e3c2c1bf054f136e6d75f7cc2b07e',
          name: 'GRG Wrapper'
        }
      }
    }
  },
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
          address: '0x06da2eb72279c1cec53c251bbff4a06fbfb93a5b',
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
          address: '0x84442a4518126ed25a548fe3392f6021e3ccd5bb',
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
          address: '0xacfb4c79259e3c2c1bf054f136e6d75f7cc2b07e',
          name: 'GRG Wrapper'
        }
      }
    }
  }
}
