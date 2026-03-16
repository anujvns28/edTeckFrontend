import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// @ts-ignore
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer';
import { Toaster } from 'react-hot-toast';

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
    <App />
    <Toaster/>
    </Provider>
  </BrowserRouter>
);

