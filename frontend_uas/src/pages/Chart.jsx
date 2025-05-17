import React from 'react';
import TaskChart from '../components/TaskChart/TaskChart';

function Chart() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900 tracking-wide">Grafik Statistik Tugas</h1>
      <TaskChart />
    </div>
  );
}

export default Chart;