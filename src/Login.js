import React, {useCallback, useContext, useState, useRef} from "react";
import {withRouter, Redirect} from "react-router";
import app from "./firebase";
import {AuthContext} from "./Auth.js";
import Nav from './Nav';
import Modal from './Modal'

const Login = ({history}) => {
    const [showModal, setShowModal] = useState({view: false, Message: ""});
    const form = useRef(null);

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                setShowModal({view: true, Message: "Loading..."});
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                form.current.reset();
                history.push("/");
            } catch (error) {
                if(error.code === "auth/user-not-found"){
                    setShowModal({view: true, Message: "Network Error, try again later  "});
                    console.log(error);
                    setTimeout(() => setShowModal({view: false}), 4000);
                    form.current.reset();
                }
                else {
                    setShowModal({view: true, Message: "Network Error, try again later  "});
                    console.log(error);
                    setTimeout(() => setShowModal({view: false}), 4000);
                }
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <>
            <Modal show={showModal.view} Message={showModal.Message}/>
            <Nav navFunction={() => history.push('/signup')} redirection="Sign Up"/>
            <div className="Login-container">
                <h1>Log in</h1>
                <form onSubmit={handleLogin} ref={form}>
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