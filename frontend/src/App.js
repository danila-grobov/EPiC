import React, { Component } from "react";
import "./app.scss";
import Profile from "./Profile";

class App extends Component {
    render() {
        return (
            <div className="app">
                <Profile/>
            </div>
        );
    }
}
export default App;