import React, { useState } from 'react';
import { ITodo } from '../interfaces/TodoInterface';

function TodoCard({ todo }:{todo:ITodo}):JSX.Element {
  const [state, setState] = useState('');
  const handleChange = ():void => {
    if (state === 'completed') {
      setState('');
    } else {
      setState('completed');
    }
  };
  return (
    <li key={todo.id} className={state}>
      <div className="view">
        <input type="checkbox" className="toggle" id="algo" onChange={handleChange} />
        <label htmlFor="algo">
          {' '}
          {todo.name}
        </label>
        <button type="button" className="destroy" onClick={() => console.log('clicado')} />
      </div>
      <input type="text" className="edit" value={todo.name} />
    </li>
  );
}

export default TodoCard;
