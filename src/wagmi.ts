import { configureChains, createConfig } from 'wagmi';
import { goerli, mainnet } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { publicProvider } from 'wagmi/providers/public';

const walletConnectProjectId = 'wagmi-tutorial';

const isDevEnv = process.env.NODE_ENV === 'development';

// TODO: Pass an alchemyProvider or infuraProvider to configureChains:
const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, ...(isDevEnv ? [goerli] : [])], [publicProvider()]);

/** wagmi config 인스턴스 생성. 위 configureChains에서 destructure한 결과값을 대입: */
export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
