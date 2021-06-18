import React, {
  useState, useCallback, useEffect,
} from 'react';
import axios from 'axios';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoCard from './components/TodoCard';
import { ITodo } from './interfaces/TodoInterface';

function App():JSX.Element {
  const [todos, setTodos] = useState<Record<number, ITodo>>({});
  const [filter, setFilter] = useState('all');
  const [counter, setCounter] = useState(0);
  const [allCompleted, setAllCompleted] = useState(false);

  const fetchTodos = async ():Promise<void> => {
    const res = await axios.get('http://localhost:4000/todos');
    setTodos(res.data.data);
    setCounter(res.data.prop);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const setTodo = useCallback(
    async (value:string, isCompleted:boolean, id = -1) => {
      if (id === -1) {
        await axios.post('http://localhost:4000/todos', {
          value,
          isCompleted,
        });
      } else {
        await axios.post('http://localhost:4000/todos', {
          value,
          isCompleted,
          id,
        });
      }
      fetchTodos();
    },
    [],
  );

  const deleteTodo = useCallback(
    async (id:number) => {
      await axios.delete(`http://localhost:4000/todos/${id}`);
      fetchTodos();
    }, [],
  );

  const clearCompleted = useCallback(
    async () => {
      await axios.delete('http://localhost:4000/todos/all');
      fetchTodos();
    },
    [],
  );

  const filterTodo = useCallback(
    (filterChoice:string) => {
      setFilter(filterChoice);
    }, [],
  );

  const handleSetAllStates = async ():Promise<void> => {
    await axios.patch('http://localhost:4000/todos', { status: !allCompleted });
    setAllCompleted(!allCompleted);
    fetchTodos();
  };

  return (
    <>
      <section className="todoapp">
        <Header setTodo={setTodo} />
        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" checked={allCompleted} onChange={handleSetAllStates} />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {Object.values(todos).map((todo) => {
              if (filter === 'all') {
                return (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    setTodo={setTodo}
                    deleteTodo={deleteTodo}
                  />
                );
              } if (filter === 'active' && todo.isCompleted === false) {
                return (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    setTodo={setTodo}
                    deleteTodo={deleteTodo}
                  />
                );
              } if (filter === 'completed' && todo.isCompleted === true) {
                return (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    setTodo={setTodo}
                    deleteTodo={deleteTodo}
                  />
                );
              }
              return <></>;
            })}
          </ul>
        </section>
        <Footer
          len={counter}
          clearCompleted={clearCompleted}
          filterTodo={filterTodo}
        />
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
