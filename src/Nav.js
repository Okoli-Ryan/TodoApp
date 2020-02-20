import React, {useContext, useState} from 'react';
import {AuthContext} from './Auth';

function Nav ({navFunction, redirection}) {

    const [email, setEmail] = useState("none");
    const currentUser = useContext(AuthContext);
    try {
        setEmail(currentUser.currentUser.email);
    }
    catch (e) {

    }

    return (
        <nav id="navbar">
            <a id="logo" href="#">
                Todo-App
            </a>
            <ul className="nav-float-right">
                <li>
                    {currentUser.currentUser ? `Logged in as ${email}` : 'Not Logged in'}
                </li>
                <li>
                    <button onClick={() => navFunction()}>
                        {redirection}
                    </button>
                </li>
            </ul>
        </nav>
)
}

export default Nav;