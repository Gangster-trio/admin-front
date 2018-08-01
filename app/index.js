import { render } from 'react-dom';
import RootApp from './root';
import store from './store';
import React from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import Route from 'react-router-dom/es/Route';
import Provider from 'react-redux/es/components/Provider';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={RootApp}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
