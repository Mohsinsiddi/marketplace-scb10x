
import { ethers } from "ethers";


export const shortAddress = (address, first = 6, last = -4) => {
  return `${address.slice(0, first)}...${address.slice(last)}`
}

export const resolveNetworkName = (networkId) => {
  switch (networkId) {
    case 1:
      return "Ethereum"
    case 42:
      return "Kovan"
    case 56:
      return "BNB Smart Chain"
    case 97:
      return "BNB Testnet"
    case 137:
      return "Polygon"
    case 80001:
      return "Mumbai"
    case 43113:
      return "Fuji"
    default:
      return "Not Support Chain"
  }
}

export const resolveStatusName = (statusCode) => {
  switch (statusCode) {
    case 1:
      return "New"
    case 2:
      return "Sold"
    case 3:
      return "Canceled"
    default:
      return "Unknown"
  }
}

export const resolveBlockexplorerLink = (networkId, assetAddress, tokenId) => {
  switch (networkId) {
    case 42:
      return `https://kovan.etherscan.io/address/${assetAddress}`
    case 80001:
      return `https://mumbai.polygonscan.com/address/${assetAddress}`
    default:
      return "#"
  }
}

export const resolveNetworkIconUrl = (networkId) => {
  switch (networkId) {
    case 1:
      return "https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg"
    case 42:
      return "https://raw.githubusercontent.com/sushiswap/icons/master/network/kovan.jpg"
    case 56:
      return "https://raw.githubusercontent.com/sushiswap/icons/master/network/bsc.jpg"
    case 97:
      return "https://raw.githubusercontent.com/sushiswap/icons/master/network/bsc.jpg"
    case 137:
      return "https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg"
    case 80001:
      return "https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg"
    case 43113:
      return "https://raw.githubusercontent.com/sushiswap/icons/master/network/avalanche.jpg"
    default:
      return "https://via.placeholder.com/30x30"
  }
}

export const getProviders = (chainIds = []) => {
  return chainIds.map(chainId => {

    let url

    if (chainId === 42) {
      url = "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    } else if (chainId === 80001) {
      url = "https://nd-546-345-588.p2pify.com/8947d77065859cda88213b612a0f8679"
    } else if (chainId === 97) {
      url = "https://nd-390-191-961.p2pify.com/0645132aa2a233d3fbe27116f3b8828b"
    } else if (chainId === 43113) {
      url = "https://nd-473-270-876.p2pify.com/613a7805f3d64a52349b6ca19b6e27a7/ext/bc/C/rpc"
    }

    if (!url) {
      return
    }

    const provider = new ethers.providers.JsonRpcProvider(url)

    return {
      chainId,
      provider
    }
  })
}


export const countdown = (seconds) => {
  let days = 0
  let hoursLeft = 0
  let hours = 0
  let minutesLeft = 0
  let minutes = 0
  let remainingSeconds = 0

  if (seconds > 0) {
    days = Math.floor(seconds / 24 / 60 / 60)
    hoursLeft = Math.floor(seconds - days * 86400)
    hours = Math.floor(hoursLeft / 3600)
    minutesLeft = Math.floor(hoursLeft - hours * 3600)
    minutes = Math.floor(minutesLeft / 60)
    remainingSeconds = seconds % 60
  }

  const pad = (n) => {
    return n < 10 ? "0" + n : n
  }

  return {
    days: pad(days),
    hoursLeft: pad(hoursLeft),
    hours: pad(hours),
    minutesLeft: pad(minutesLeft),
    minutes: pad(minutes),
    remainingSeconds: pad(remainingSeconds),
  }
}
