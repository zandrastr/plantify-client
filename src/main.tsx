import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UserContextProvider } from './contexts/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </UserContextProvider>
  </React.StrictMode>
);
