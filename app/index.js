import React from 'react'
import {render} from 'react-dom'
import RootApp from "./root";
import {Provider} from 'react-redux';
import {store} from "./store";
import {BrowserRouter, Route} from 'react-router-dom';

render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path='/' component={RootApp}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
