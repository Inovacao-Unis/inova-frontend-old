import Head from 'next/head';
import { ChakraProvider, extendTheme, CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { AuthProvider } from '../contexts/AuthContext';
import theme from '../styles/theme';
import '../styles/fonts.css';
import '../styles/background.css';
import '../styles/content.css';

const myTheme = extendTheme(theme);

const GlobalStyle = ({ children }) => (
  <>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />

      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <CSSReset />
    <Global
      styles={css`
        html {
          scroll-behavior: smooth;
        }
        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        body {
          --wine: #240000;
          --white: #ffffff;
          --pink: #af008e;
          --gray: #bebec7;
          --darkWhite: #e9e9ea;
          --dark: #030107;
        }
      `}
    />
    {children}
  </>
);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={myTheme}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
