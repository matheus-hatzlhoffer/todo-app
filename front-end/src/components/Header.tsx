import React, { useState } from 'react';

interface props{
  setTodo:(value: string, isCompleted: boolean) => Promise<void>;
}

function Header({ setTodo }:props):JSX.Element {
  const [valueTodo, setValueTodo] = useState('');

  const handleKeyDown = (e:React.KeyboardEvent):void => {
    if (e.key === 'Enter') {
      setTodo(valueTodo, false);
      setValueTodo('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input value={valueTodo} type="text" placeholder="What needs to be done" className="new-todo" onKeyDown={handleKeyDown} onChange={(e) => setValueTodo(e.target.value)} />
    </header>
  );
}

export default Header;
