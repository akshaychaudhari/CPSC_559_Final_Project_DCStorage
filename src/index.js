import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import Direct from './components/Direct';
import {Routes, Route} from "react-router-dom";
import Organization from "./components/Organization";
import ViewOrganization from "./components/ViewOrganization";

ReactDOM.render(
<BrowserRouter>
<Routes>
    <Route exact path="/" element={<App/>}/>
    <Route path="/direct" element={<Direct/>}/>
    <Route path="/organization" element={<Organization/>}/>
    <Route path="/vieworganization" element={<ViewOrganization/>}/>
</Routes>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
