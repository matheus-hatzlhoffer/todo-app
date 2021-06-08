import React, { useState } from 'react';
import { ITodo } from '../interfaces/TodoInterface';

interface props{
  todos:ITodo[];
  setTodos:React.Dispatch<React.SetStateAction<ITodo[]>>
}

function Header({ todos, setTodos }:props):JSX.Element {
  const [todo, setTodo] = useState('');
  const handleKeyDown = (e:React.KeyboardEvent):void => {
    if (e.key === 'Enter') {
      const newTodo:ITodo = {
        name: todo,
        isCompleted: false,
        id: todos.length,
      };
      setTodos([...todos, newTodo]);
      setTodo('');
    }
  };
  return (
    <header className="header">
      <h1>todos</h1>
      <input value={todo} type="text" placeholder="What needs to be done" className="new-todo" onKeyDown={handleKeyDown} onChange={(e) => setTodo(e.target.value)} />
    </header>
  );
}

export default Header;
