import React, { useContext } from "react";
import { Context } from './App';


function TodoItem({ id, completed, text }) {
    const dispatch = useContext(Context);

    // const [task, setTask] = React.useState("");
    //
    // useEffect(() => {
    //     text = task;
    // }, [task]);

    return (
        <div className="task-div text-center">
            <input type="checkbox" checked={completed} onChange={() => dispatch({ type: 'completed', payload: id, show: true })}/>
            <div>{text}</div>
            <button onClick={() => dispatch({ type: 'delete', payload: id })}>Delete</button>
        </div>
    );

}

export default TodoItem