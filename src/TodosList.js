import React from "react";
import TodoItem from './TodoItem';

function TodosList({ items, dispatch }) {

    function addTask(e) {
        e.preventDefault();
        dispatch({type: 'add', payload: ""});
    }

    return (
    <div className="todoList">
        {items.map(item => <TodoItem key={item.id} {...item} />)}
        <button id="add" onClick={(e) => addTask(e)}>Add Task</button>
    </div>
)
}

export default TodosList