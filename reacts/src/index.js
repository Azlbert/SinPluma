import React                            from "react";
import ReactDOM                         from "react-dom";
import { Provider }                     from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk                            from "redux-thunk";

import App          from './components/App';
import reducers     from './reducers';

import { AUTHENTICATED } from './common/Session';

const store = createStore(reducers, applyMiddleware(thunk));

const user = sessionStorage.getItem('accessToken');
if(user) {
    store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.querySelector('#root')
);
