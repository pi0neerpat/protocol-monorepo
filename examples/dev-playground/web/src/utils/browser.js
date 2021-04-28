import { Web3Provider } from '@ethersproject/providers'
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk'
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider'

import { getErrorResponse } from './general'

export const isWeb3EnabledBrowser = () =>
  typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'

export const unlockBrowser = async ({ debug }) => {
  try {
    if (!isWeb3EnabledBrowser()) {
      console.log('No web3 provider injected')
      return { hasWallet: false, isUnlocked: false }
    }

    const appsSdk = new SafeAppsSDK({
      whitelistedDomains: [/gnosis-safe\\.io/],
    })
    const safe = await appsSdk.getSafeInfo()
    console.log('Safe info: ', JSON.stringify(safe))
    const walletAddress = safe.safeAddress
    const walletProvider = new Web3Provider(new SafeAppProvider(safe, appsSdk))

    const network = await walletProvider.getNetwork()
    if (debug)
      /* eslint-disable-next-line no-console */
      console.log(
        'Web3Browser wallet loaded: ',
        JSON.stringify({ walletAddress, network })
      )

    return {
      hasWallet: true,
      isUnlocked: true,
      walletAddress: walletAddress[0],
      network,
      walletProvider,
    }
  } catch (error) {
    if (isWeb3EnabledBrowser()) {
      if (debug)
        /* eslint-disable-next-line no-console */
        console.log('Web3 detected in browser, but wallet unlock failed')
      return {
        hasWallet: true,
        isUnlocked: false,
        ...getErrorResponse(error, 'unlockBrowser'),
      }
    }
    return {
      hasWallet: false,
      isUnlocked: false,
      ...getErrorResponse(error, 'unlockBrowser'),
    }
  }
}
