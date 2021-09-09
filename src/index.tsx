import * as React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './index.css';
import './asset/main.scss';
import "./asset/styles/owl.carousel.css";
import "./asset/styles/font-awesome.css";
import "./asset/styles/bootstrap.css";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {BrowserRouter } from "react-router-dom";


import 'primeflex/primeflex.css'; // giống như này
import App from "./App";

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
