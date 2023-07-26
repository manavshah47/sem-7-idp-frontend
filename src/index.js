import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import configureStore from './store/store';
import { Provider } from "react-redux";

import { checkLoggedIn } from "./util/session";

// let preloadedState = {};
// const store = configureStore(preloadedState);

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = preloadedState => {
  const store = configureStore(preloadedState);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

(async () => renderApp(await checkLoggedIn()))();
