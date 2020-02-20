import React, {useCallback} from "react";
import {withRouter} from "react-router";
import app from "./firebase";
import Nav from './Nav';

const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, []);


    return (
        <>
            <Nav navFunction={() => history.push('/login')} redirection="Log in"/>
            <div className="Login-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <label>
                        Email
                        <input name="email" type="email" placeholder="Email"/>
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" placeholder="Password"/>
                    </label>
                    <button type="submit">Sign Up</button>
                </form>

            </div>
        </>
    );
};

export default withRouter(SignUp);