import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const Main = () => {
    return (
        <AuthProvider>
            <Router>
                <>
                    <PrivateRoute exact path="/" component={App} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                </>
            </Router>
        </AuthProvider>
    );
};

export default Main;