import '../styles/globals.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/600.css'
import '@fontsource/jetbrains-mono/200.css'
import '@fontsource/material-icons'
import type { AppContext, AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { gql } from '@apollo/client';
import React, { useMemo, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { useRouter } from 'next/router';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useNavigate } from "react-router-dom";
import { clusterApiUrl } from '@solana/web3.js';
import client from '../client';
import withReactRouter from '../react-router';

function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Devnet;
  const navigate = useNavigate();

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      navigate(url);
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, []);
  
  return (
    <ApolloProvider client={client}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
                <Component {...pageProps} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ApolloProvider>
  );
}

export default withReactRouter(App);
