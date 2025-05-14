import React from 'react';
import useTaskStats from '../hooks/useTaskStats';
import './Stats.css';

function Stats() {
  const { total, done, progres, notyet } = useTaskStats();

  return (
    <div className="stats-page">
      <h2>Statistik Tugas</h2>
      <div className="stats-grid">
        <div className="stat-card done">
          <h3>{done}</h3>
          <p>Sudah Selesai</p>
        </div>
        <div className="stat-card progres">
          <h3>{progres}</h3>
          <p>Sedang Dikerjakan</p>
        </div>
        <div className="stat-card notyet">
          <h3>{notyet}</h3>
          <p>Belum Dikerjakan</p>
        </div>
        <div className="stat-card total">
          <h3>{total}</h3>
          <p>Total Tugas</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
