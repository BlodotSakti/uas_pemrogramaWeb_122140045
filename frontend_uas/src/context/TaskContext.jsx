import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tasks dari backend
  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async task => {
  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: task.title,
        matkul_id: Number(task.matkul),
        tenggat: task.tenggat,
        status: task.status
      })
    });
    if (!res.ok) throw new Error('Gagal menambah tugas');
    const newTask = await res.json();
    setTasks(prev => [...prev, newTask]);
    return true;
  } catch (err) {
    return false;
  }
};

  const updateTask = async updated => {
    await fetch(`/api/tasks/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: updated.title,
        matkul_id: Number(updated.matkul),
        tenggat: updated.tenggat,
        status: updated.status
      })
    });
    fetchTasks();
  };

  const deleteTask = async id => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};