import React, { useState, useEffect } from 'react';
import { ITodo } from '../interfaces/TodoInterface';

interface props{
  todo:ITodo;
  editTodo: (id: number, value: string) => void
  deleteTodo: (id: number) => void
  editTodoStatus: (id:number) => void
}

function TodoCard({
  todo, editTodo, deleteTodo, editTodoStatus,
}:props):JSX.Element {
  const [state, setState] = useState('');

  const handleChange = ():void => {
    if (state === '') {
      setState('completed');
    } else {
      setState('');
    }
    editTodoStatus(todo.id);
  };
  const handleDoubleClick = ():void => {
    setState('editing');
  };
  const handleEdit = (e:React.ChangeEvent<HTMLInputElement>):void => {
    editTodo(todo.id, e.target.value);
  };
  const handleKeyDown = (e:React.KeyboardEvent):void => {
    if (e.key === 'Enter') {
      setState('');
    }
  };
  const handleDelete = ():void => {
    deleteTodo(todo.id);
  };

  useEffect(() => {
    if (todo.isCompleted === true) {
      setState('completed');
    } else {
      setState('');
    }
  }, [todo]);

  return (
    <li key={todo.id} className={state}>
      <div className="view">
        <input type="checkbox" checked={todo.isCompleted} className="toggle" id="algo" onChange={handleChange} />
        <label onDoubleClick={handleDoubleClick}>
          {' '}
          {todo.name}
        </label>
        <button type="button" className="destroy" onClick={handleDelete} />
      </div>
      <input type="text" className="edit" value={todo.name} onChange={handleEdit} onKeyDown={handleKeyDown} />
    </li>
  );
}

export default TodoCard;
