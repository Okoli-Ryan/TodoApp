import React, {useContext, useRef, useState} from "react";
import {Context} from './App';


function TodoItem({id, completed, text}) {
    const [newText, setNewText] = useState(text);
    const dispatch = useContext(Context);
    const inputBox = useRef(null);

    // const [task, setTask] = React.useState("");
    //
    // useEffect(() => {
    //     text = task;
    // }, [task]);

    function deleteOnClick(e) {
        e.preventDefault();
        dispatch({type: 'delete', payload: id})
    }

    function onNewSubmit(e) {
        e.preventDefault();
        dispatch({type: 'editted', payload: id, updatedText: newText});
    }

    return (
        <form className="task-div text-center" onDoubleClick={() => inputBox.current.focus()}
              onSubmit={(e) => onNewSubmit(e)} onBlur={(e) => onNewSubmit(e)}>
            <input type="checkbox" checked={completed} onChange={() => dispatch({type: 'completed', payload: id})}/>
            <textarea
                rows={6}
                cols={10}
                className="addTaskTextBox"
                placeholder="Add task"
                ref={inputBox}
                onChange={(e) => {
                    setNewText(e.target.value)
                }}
                defaultValue={text}
                onKeyPress={(e) => e.key === 'Enter' ? inputBox.current.blur() : {}}
                style={{
                    textDecoration: completed ? 'line-through' : 'none'
                }}
            />
            <button type="button" onClick={(e) => deleteOnClick(e)}>Delete</button>
        </form>
    );

}

export default TodoItem