import React, { useState, useEffect } from 'react';
import { ITodo } from '../interfaces/TodoInterface';

interface props{
  todo:ITodo;
  setTodo: (value: string, isCompleted: boolean, id?:number) => Promise<void>;
  deleteTodo: (id:number) => Promise<void>
}

function TodoCard({
  todo, setTodo, deleteTodo,
}:props):JSX.Element {
  const [state, setState] = useState('');
  const [newValue, setNewValue] = useState(todo.value);

  const handleStatusChange = ():void => {
    if (state === '') {
      setState('completed');
    } else {
      setState('');
    }
    setTodo(todo.value, !todo.isCompleted, todo.id);
  };
  const handleDoubleClick = ():void => {
    setState('editing');
  };
  const handleKeyDown = (e:React.KeyboardEvent):void => {
    if (e.key === 'Enter') {
      setTodo(newValue, todo.isCompleted, todo.id);
      setState('');
    }
  };
  const handleDelete = ():void => {
    deleteTodo(todo.id);
  };

  useEffect(() => {
    if (todo.isCompleted) {
      setState('completed');
    } else {
      setState('');
    }
  }, [todo]);

  return (
    <li key={todo.id} className={state}>
      <div className="view">
        <input type="checkbox" checked={todo.isCompleted} className="toggle" id="algo" onChange={handleStatusChange} />
        <label onDoubleClick={handleDoubleClick}>
          {' '}
          {todo.value}
        </label>
        <button type="button" className="destroy" onClick={handleDelete} />
      </div>
      <input type="text" className="edit" value={newValue} onChange={(e) => setNewValue(e.target.value)} onKeyDown={handleKeyDown} />
    </li>
  );
}

export default TodoCard;
