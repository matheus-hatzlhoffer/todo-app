import React, { useState } from 'react';

interface props{
    len:number;
    clearCompleted: () => Promise<void>;
    filterTodo: (filterChoice: string) => void;
}

function Footer({ len, clearCompleted, filterTodo }:props):JSX.Element {
  const [allClass, setAllClass] = useState('selected');
  const [activeClass, setActiveClass] = useState('');
  const [completedClass, setCompletedClass] = useState('');

  const handleFilter = (filterChoice:string):void => {
    filterTodo(filterChoice);
    if (filterChoice === 'all') {
      setAllClass('selected');
      setActiveClass('');
      setCompletedClass('');
    } else if (filterChoice === 'active') {
      setAllClass('');
      setActiveClass('selected');
      setCompletedClass('');
    } else {
      setAllClass('');
      setActiveClass('');
      setCompletedClass('selected');
    }
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
          <a href="#/" className={allClass} onClick={() => handleFilter('all')}>All</a>
        </li>
        <li>
          <a href="#/active" className={activeClass} onClick={() => handleFilter('active')}>Active</a>
        </li>
        <li>
          <a href="#/completed" className={completedClass} onClick={() => handleFilter('completed')}>Completed</a>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}

export default Footer;
