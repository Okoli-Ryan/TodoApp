import React, {useCallback, useState, useRef} from "react";
import {withRouter} from "react-router";
import app from "./firebase";
import Nav from './Nav';
import Modal from "./Modal";

const SignUp = ({history}) => {
    const [showModal, setShowModal] = useState({view: false, Message: ""});
    const form = useRef(null);

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            setShowModal({view: true, Message: "Loading..."});
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            form.current.reset();
            history.push("/");
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                setShowModal({view: true, Message: "Email Already in use"});
                setTimeout(() => setShowModal({view: false}), 4000);
                form.current.reset();
            }
            else {
                setShowModal({view: true, Message: "Network Error, try again later"});
                setTimeout(() => setShowModal({view: false}), 4000);
            }
        }
    }, [history]);


    return (
        <>
            <Modal show={showModal.view} Message={showModal.Message}/>
            <Nav navFunction={() => history.push('/login')} redirection="Log in"/>
            <div className="Login-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp} ref={form}>
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