import React from 'react';

interface props{
    len:number;
    clearCompleted: () => void
    filterTodo: (filterChoice: string) => void;
}

function Footer({ clearCompleted, len, filterTodo }:props):JSX.Element {
  const handleClearCompleted = ():void => {
    clearCompleted();
  };
  const handleFilter = (value:string):void => {
    filterTodo(value);
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
          <a href="#/" onClick={() => handleFilter('all')}>All</a>
        </li>
        <li>
          <a href="#/active" onClick={() => handleFilter('active')}>Active</a>
        </li>
        <li>
          <a href="#/completed" onClick={() => handleFilter('completed')}>Completed</a>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={handleClearCompleted}>Clear completed</button>
    </footer>
  );
}

export default Footer;
