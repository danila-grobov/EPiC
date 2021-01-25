import React, {useEffect, useState} from "react";
import "./scss/app.scss";
import 'react-toastify/dist/ReactToastify.css';
import "./Profile_Page/Profile_Page.js"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Profile from "./Profile";

const App = () => {
    return (<Profile></Profile>);
}
export default App;