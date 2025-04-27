import * as React from 'react';
import './gesture-handler';
import { Provider } from 'react-redux'
import Auth from './src/navigation/Auth';
import { store } from './src/redux/Store';


export default function App() {
  return (
    <Provider store={store}>
    <Auth />
    </Provider>
  );
}