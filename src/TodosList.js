import React from "react";
import TodoItem from './TodoItem';

function TodosList({ items }) {
    return (
    <div className="todoList">
        {items.map(item => <TodoItem key={item.id} {...item} />)}
    </div>
)
}

export default TodosList