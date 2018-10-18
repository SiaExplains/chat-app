// REACT Library and Components
import React from 'react';
import { render } from 'react-dom';
// REDUX Library and Components
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// MY Library and Components
import { App } from './App';
import packageReducer from './packageReducer';

export const myStore = createStore(
    packageReducer,
        
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

render(
    <Provider store={myStore}>
        <App />
    </Provider>
    ,
    document.getElementById('app')
);