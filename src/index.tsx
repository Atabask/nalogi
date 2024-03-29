import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/index';
import { BrowserRouter } from 'react-router-dom';
import supabase from '@supabaseClient';
const { SessionContextProvider } = require('@supabase/auth-helpers-react')


const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <SessionContextProvider supabaseClient={supabase}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </SessionContextProvider>
);
