import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; // Import icons from React Bootstrap
import './App.css'; 

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put('http://localhost:3000/update/${id}') // Include forward slash before id
      .then(result => {
        const updatedTodos = todos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: true }; // Update the done status
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos); // Update local state
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`) // Include forward slash before id
      .then(result => {
        const updatedTodos = todos.filter(todo => todo._id !== id); // Remove deleted todo
        setTodos(updatedTodos); // Update local state
      })
      .catch(err => console.log(err)); 
  }
  
  return (
    <div className="task-list"> {/* Add the task-list class to the container */}
      <h2>To-do list</h2>
      <Create />
      {
        todos.length === 0
        ? <div><h2>No record</h2></div>
        : todos.map(todo => (
            <div className="task" key={todo._id}>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done ?
                  <BsCheckCircleFill className='icon' /> :
                  <BsCircleFill className="icon" />
                }
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p> 
              </div>
              <div>
                <span><BsFillTrashFill className="icon" 
                  onClick={() => handleDelete(todo._id)}
                /></span>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default Home;
