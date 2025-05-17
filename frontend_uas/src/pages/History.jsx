import React from 'react';
import TaskHistoryList from '../components/TaskHistoryList/TaskHistoryList';

function History() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900 tracking-wide">Riwayat Tugas Selesai</h1>
      <TaskHistoryList />
    </div>
  );
}

export default History;