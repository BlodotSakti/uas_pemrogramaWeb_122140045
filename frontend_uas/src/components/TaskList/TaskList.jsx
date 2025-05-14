import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TaskContext } from '../../context/TaskContext';
import './TaskList.css';
import { toast } from 'react-toastify';

function TaskList({ searchTerm, filterStatus, setEditTarget }) {
  const { tasks, deleteTask } = useContext(TaskContext);
  const filtered = tasks.filter(
    task =>
      (task.title && task.title.toLowerCase().includes(searchTerm?.toLowerCase())) &&
    (filterStatus === 'all' || task.status === filterStatus)

      /*task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || task.status === filterStatus) */
  );

  if (filtered.length === 0) return <p className="no-tasks">Tugas tidak ditemukan</p>;

  return (
    <table className="task-table">
      <thead>
        <tr><th>Judul</th><th>Deadline</th><th>Status</th><th>Aksi</th></tr>
      </thead>
      <tbody>
        {filtered.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.tenggat}</td>
            <td>
              <span className={`status status-${task.status}`}>
                {task.status === 'selesai'
                  ? 'Sudah Selesai'
                  : task.status === 'dikerjakan'
                  ? 'Sedang Dikerjakan'
                  : 'Belum Dikerjakan'}
              </span>
            </td>
            <td>
              <button onClick={() => setEditTarget(task)}>Edit</button>
              <button
                onClick={() => {
                  deleteTask(task.id);
                  toast.info('Tugas dihapus');
                }}>
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}



export default TaskList;