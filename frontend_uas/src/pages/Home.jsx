import React, { useState } from 'react';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';
import TaskFilter from '../components/TaskFilter/TaskFilter';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editTarget, setEditTarget] = useState(null);

  const clearEdit = () => setEditTarget(null);

  return (
    <div className="home">
      <div className="controls">
        <input
          type="text"
          placeholder="Cari tugas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <TaskFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      </div>
      <div className="content-grid">
        <TaskForm editTarget={editTarget} clearEdit={clearEdit} />
        <TaskList
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          setEditTarget={setEditTarget}
        />
      </div>
    </div>
  );
}

export default Home;