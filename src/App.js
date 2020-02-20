import React, {useReducer, useEffect, useState, useRef, useContext} from 'react';
import TodosList from './TodosList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {AuthContext, AuthProvider} from './Auth';
import Nav from './Nav';
import app from './firebase';

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
                    show: true,
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
        default: {
            return state;
        }
    }
}


export const Context = React.createContext(null);


export default function App() {
    const [state, dispatch] = useReducer(appReducer, []);
    const textBox = useRef(null);
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        const raw = localStorage.getItem('data');
        dispatch({type: 'reset', payload: raw ? JSON.parse(raw) : []})
    }, []);

    // useEffect(
    //     () => {
    //       console.log("state");
    //       localStorage.setItem('data', JSON.stringify(state));
    //     },
    //     [state]
    // );

    const [textval, setText] = useState("nothing");

    // useEffect(() => {
    //   console.log("search");
    //     dispatch({type: 'search', payload: search})
    // }, [search]);

    function addTask() {
        dispatch({type: 'add', payload: textval});
        textBox.current.value = "";
    }

    return (
        <AuthProvider>
            <div style={{position: 'relative'}}>
                <Nav navFunction={() => app.auth().signOut()} redirection="Sign Out"/>
                <div className="content-body">
                    <Context.Provider value={dispatch}>
                        <div className="controls">
                            <button onClick={() => addTask()}>New Todo</button>
                            <input type="text" onChange={(e) => setText(e.target.value)} ref={textBox}/>
                            <button onClick={() => localStorage.setItem('data', JSON.stringify(state))}>Save</button>
                        </div>
                        <TodosList items={state}/>
                    </Context.Provider>
                </div>
            </div>
        </AuthProvider>
    );
}