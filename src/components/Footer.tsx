import React from 'react';

interface props{
    len:number;
    clearCompleted: () => void
}

function Footer({ clearCompleted, len }:props):JSX.Element {
  const handleClearCompleted = ():void => {
    clearCompleted();
  };
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{len}</strong>
        <span> </span>
        <span>items</span>
        <span> </span>
        <span>left</span>
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>
        <li>
          <a href="#/active" className="">Active</a>
        </li>
        <li>
          <a href="#/completed" className="">Completed</a>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>
    </footer>
  );
}

export default Footer;
