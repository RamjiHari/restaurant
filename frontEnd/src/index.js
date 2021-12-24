import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from './domain/pages/feature/productSlice'
import cartReducer from './domain/pages/feature/cartSlice'
import  { productsApi } from './domain/pages/feature/productsApi'
const store = configureStore({

  reducer: {
    products:productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(productsApi.middleware),

});

store.dispatch(productsFetch())

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
