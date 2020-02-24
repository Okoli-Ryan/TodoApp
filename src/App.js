import React, {useReducer, useEffect, useState, useContext} from 'react';
import TodosList from './TodosList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {AuthContext, AuthProvider} from './Auth';
import Nav from './Nav';
import app from './firebase';
import Modal from './Modal';

function appReducer(state, action) {
    switch (action.type) {
        case 'reset': {
            return action.payload;
        }
        case 'add': {
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                },
            ];
        }

        case 'delete': {
            return state.filter(item => item.id !== action.payload);
        }

        // case 'search': {
        //   return state.map(item => {
        //       if (!item.text.toLowerCase().includes(action.payload.toLowerCase())){
        //         return {
        //           ...item,
        //           show: false
        //         }
        //       }
        //       else{
        //         return {
        //           ...item,
        //           show: true
        //         }
        //       }
        //   });
        // //
        // //   // const e = state.filter((item) => item.text.toLowerCase().includes(action.payload.toLowerCase()));
        // //   // return e;
        // }

        case 'completed': {
            return state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                return item;
            });
        }

        case 'editted': {
            return state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        text: action.updatedText,
                    };
                }
                return item;
            });
        }

        default: {
            return state;
        }
    }
}

// function useFirestore(){
//     app
//         .firestore()
//         .collection('users')
//         .onSnapshot(snapshot => {
//             const Tasks =
//         })
// }


export const Context = React.createContext(null);

export default function App() {
    const currentUser = useContext(AuthContext);
    const [state, dispatch] = useReducer(appReducer, []);
    const [showModal, setShowModal] = useState({view: false, Message: ""});

    function onSave() {
        // localStorage.setItem('data', JSON.stringify(state));
        app.firestore().collection('users').doc(currentUser.currentUser.uid).update({task: JSON.stringify(state)}).then(() => {
            setShowModal({view: true, Message: "Save complete"});
            setTimeout(() => setShowModal({view: false}), 4000);
        }).catch(() => {
            setShowModal({view: true, Message: "Network Error, try again later"});
            setTimeout(() => setShowModal({view: false}), 4000);
        });
        //todo uncomment stuff above

    }

    useEffect(() => {
        app.firestore().collection('users').doc(currentUser.currentUser.uid).get().then(doc => {
            const raw = (doc.data().task);
            dispatch({type: 'reset', payload: raw ? JSON.parse(raw) : []})
        }).catch(() => {
            app.firestore().collection('users').doc(currentUser.currentUser.uid).set({task: ''}).then();
        });
        //todo uncomment stuff above
    }, []);

    //save the data as a string to the firebase server, then receive it back and JSON.parse it

    // useEffect(() => {
    //     const raw = localStorage.getItem('data');
    //     dispatch({type: 'reset', payload: raw ? JSON.parse(raw) : []})
    // }, []);

    // useEffect(
    //     () => {
    //       console.log("state");
    //       localStorage.setItem('data', JSON.stringify(state));
    //     },
    //     [state]
    // );

    // useEffect(() => {
    //   console.log("search");
    //     dispatch({type: 'search', payload: search})
    // }, [search]);

    return (
        <AuthProvider>
            <Modal show={showModal.view} Message={showModal.Message}/>
            <>
                <Nav navFunction={() => app.auth().signOut()} redirection="Sign Out"/>
                <div className="loggedInAs">{currentUser.currentUser ? `Logged in as ${currentUser.currentUser.email}` : {}}</div>
                <div className="content-body">
                    <Context.Provider value={dispatch}>
                        <TodosList items={state} dispatch={dispatch}/>
                        <button id="saveButton" onClick={() => onSave()}>Save</button>
                    </Context.Provider>
                </div>
            </>
        </AuthProvider>
    );
}