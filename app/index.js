import {render} from 'react-dom';
import RootApp from './root';
import store from './store';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Provider from 'react-redux/es/components/Provider';
import Login from './Login';

render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/" component={RootApp}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root'),
);
