import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TodoCard from './components/TodoCard';
import { todosData } from './data/Todos';

function App():JSX.Element {
  const [todos, setTodos] = useState(todosData);
  return (
    <>
      <section className="todoapp">
        <Header todos={todos} setTodos={setTodos} />
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
          </ul>
        </section>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        {/* <p>
          Created by
          {' '}
          <a href="http://github.com/remojansen/">Remo H. Jansen</a>
        </p>
        <p>
          Part of
          {' '}
          <a href="http://todomvc.com">TodoMVC</a>
        </p> */}
      </footer>
    </>
  );
}

export default App;
