import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import App from './App';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: { "500": { value: "tomato" } },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
