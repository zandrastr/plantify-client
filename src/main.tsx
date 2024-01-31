import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UserContextProvider } from './contexts/userContext.tsx';
import theme from './utils/chakra.utils';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </UserContextProvider>
  </React.StrictMode>
);
