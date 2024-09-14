import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch all todos
  useEffect(() => {
    axios.get('https://todo-mern-bdqk.onrender.com')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  // Add new todo
  const addTodo = () => {
    if (newTask.trim()) {
      axios.post('https://todo-mern-bdqk.onrender.com', { task: newTask })
        .then(response => setTodos([...todos, response.data]))
        .catch(error => console.log(error));
      setNewTask('');
    }
  };

  // Update todo
  const updateTodo = (id, updatedTask, isCompleted) => {
    axios.put(`https://todo-mern-bdqk.onrender.com/${id}`, { task: updatedTask, isCompleted })
      .then(response => {
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      })
      .catch(error => console.log(error));
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`https://todo-mern-bdqk.onrender.com/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px',backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1>Todo List</h1>
      <input

        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button style={{ marginLeft: '10px' , backgroundColor: 'green', color: 'white',borderRadius: '5px', padding: '5px'}}   onClick={addTodo}>Add Task</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => updateTodo(todo._id, todo.task, !todo.isCompleted)}
            />
            <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
