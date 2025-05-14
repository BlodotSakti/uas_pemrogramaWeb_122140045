import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  // Sinkronisasi state dengan localStorage
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  // CRUD
  const addTask = task => setTasks([...tasks, task]);
  const updateTask= updated => {
    setTasks(tasks.map(b => (b.id === updated.id ? updated : b)));
  };
  const deleteTask = id => setTasks(tasks.filter(b => b.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};