import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { TaskContext } from '../../context/TaskContext';
import 'chart.js/auto';
import './TaskChart.css';

function TaskChart() {
  const { tasks } = useContext(TaskContext);

  // Hitung jumlah tugas berdasarkan status
  const statusLabels = ['Sudah Selesai', 'Sedang Dikerjakan', 'Belum Dikerjakan'];
  const statusMap = {
    selesai: 'Sudah Selesai',
    dikerjakan: 'Sedang Dikerjakan',
    belum: 'Belum Dikerjakan'
  };

  const statusCounts = {
    'Sudah Selesai': 0,
    'Sedang Dikerjakan': 0,
    'Belum Dikerjakan': 0
  };

  tasks.forEach(task => {
    const label = statusMap[task.status];
    if (label) statusCounts[label]++;
  });

  const data = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Jumlah Tugas',
        data: statusLabels.map(label => statusCounts[label]),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Statistik Status Tugas',
        color: '#1e293b',
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        callbacks: {
          label: context => ` ${context.parsed.y} tugas`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#1e293b', font: { weight: 'bold' } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e0e7ef' },
        ticks: { color: '#64748b', stepSize: 1 }
      }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
}

export default TaskChart;