import React, { useState } from 'react';
import { ITodo } from '../interfaces/TodoInterface';

interface props{
  len:number;
  addTodo:(todo: ITodo) => void
}

function Header({ len, addTodo }:props):JSX.Element {
  const [todo, setTodo] = useState('');

  const handleKeyDown = (e:React.KeyboardEvent):void => {
    if (e.key === 'Enter') {
      const newTodo:ITodo = {
        name: todo,
        isCompleted: false,
        id: len,
      };
      addTodo(newTodo);
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
