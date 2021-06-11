import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoCard from './components/TodoCard';
import { todosData } from './data/Todos';
import { ITodo } from './interfaces/TodoInterface';

function App():JSX.Element {
  const [todos, setTodos] = useState(todosData);
  const idCounter = useRef(0);
  const notCompletedCount = useRef(0);
  const addTodo = useCallback(
    (todo:ITodo) => {
      notCompletedCount.current += 1;
      idCounter.current += 1;
      setTodos([...todos, todo]);
    },
    [todos],
  );
  const editTodo = useCallback(
    (id:number, value:string) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex((element) => element.id === id);
      newTodos[index] = { ...newTodos[index], name: value };
      setTodos(newTodos);
    },
    [todos],
  );
  const editTodoStatus = useCallback(
    (id:number) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex((element) => element.id === id);
      const status = newTodos[index].isCompleted;
      if (status === true) {
        notCompletedCount.current += 1;
      } else {
        notCompletedCount.current -= 1;
      }
      newTodos[index] = { ...newTodos[index], isCompleted: !status };
      setTodos(newTodos);
    },
    [todos],
  );
  const deleteTodo = useCallback(
    (id:number) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex((element) => element.id === id);
      const status = newTodos[index].isCompleted;
      if (status === false) {
        notCompletedCount.current -= 1;
      }
      setTodos(todos.filter((element) => element.id !== id));
    },
    [todos],
  );
  const clearCompleted = useCallback(
    () => {
      setTodos(todos.filter((element) => element.isCompleted === false));
    },
    [todos],
  );

  return (
    <>
      <section className="todoapp">
        <Header len={idCounter.current} addTodo={addTodo} />
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                editTodoStatus={editTodoStatus}
              />
            ))}
          </ul>
        </section>
        <Footer len={notCompletedCount.current} clearCompleted={clearCompleted} />
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
