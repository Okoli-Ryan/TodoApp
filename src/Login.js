import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router";
import app from "./firebase";
import {AuthContext} from "./Auth.js";
import Nav from './Nav';

const Login = ({history}) => {

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        []
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <>
            <Nav navFunction={() => history.push('/signup')} redirection="Sign Up"/>
            <div className="Login-container">
                <h1>Log in</h1>
                <form onSubmit={handleLogin}>
                    <label>
                        Email
                        <input name="email" type="email" placeholder="Email"/>
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" placeholder="Password"/>
                    </label>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </>
    );
};

export default withRouter(Login);