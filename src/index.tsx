import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "mobx-react";
import EventStore from "./store/EventStore";
import RefStore from "./store/RefStore";
import ErrorStore from "./store/ErrorStore";

ReactDOM.render((
    <Provider
        eventStore={EventStore}
        refStore={RefStore}
        errorStore={ErrorStore}
    >
        <App />
    </Provider>
), document.getElementById('root'));
