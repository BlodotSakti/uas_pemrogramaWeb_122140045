import React from 'react';
import useTaskStats from '../hooks/useTaskStats';
import './Stats.css';

function Stats() {
  const { total, done, progres, notyet } = useTaskStats();

  return (
    <div className="stats-modern-container">
      <h2 className="stats-title">Statistik Tugas</h2>
      <div className="stats-modern-grid">
        <div className="stat-modern-card done">
          <h3>{done}</h3>
          <p>Sudah Selesai</p>
        </div>
        <div className="stat-modern-card progres">
          <h3>{progres}</h3>
          <p>Sedang Dikerjakan</p>
        </div>
        <div className="stat-modern-card notyet">
          <h3>{notyet}</h3>
          <p>Belum Dikerjakan</p>
        </div>
        <div className="stat-modern-card total">
          <h3>{total}</h3>
          <p>Total Tugas</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;