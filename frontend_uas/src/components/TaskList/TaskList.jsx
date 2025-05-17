import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TaskContext } from '../../context/TaskContext';
import './TaskList.css';
import { toast } from 'react-toastify';

function TaskList({ searchTerm, filterStatus, setEditTarget }) {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);
  const filtered = tasks.filter(
    task =>
      (task.title && task.title.toLowerCase().includes(searchTerm?.toLowerCase())) &&
      (filterStatus === 'all' || task.status === filterStatus)
  );

  if (filtered.length === 0) return <p className="no-tasks">Tugas tidak ditemukan</p>;

  const handleSelesai = (task) => {
    if (task.status === 'selesai') {
      toast.info('Tugas sudah selesai');
      return;
    }
    updateTask({ ...task, status: 'selesai' });
    toast.success('Tugas ditandai selesai!');
  };

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Mata Kuliah</th>
          <th>Deadline</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>
              {task.matkul ? (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{task.matkul}</span>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </td>
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
              <div className="aksi-btn-group">
                <button
                  className="btn-edit"
                  onClick={() => setEditTarget(task)}
                >
                  Edit
                </button>
                <button
                  className="btn-selesai"
                  onClick={() => handleSelesai(task)}
                  disabled={task.status === 'selesai'}
                >
                  Selesai
                </button>
                <button
                  className="btn-hapus"
                  onClick={() => {
                    deleteTask(task.id);
                    toast.info('Tugas dihapus');
                  }}
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TaskList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  filterStatus: PropTypes.string.isRequired,
  setEditTarget: PropTypes.func.isRequired,
};

export default TaskList;