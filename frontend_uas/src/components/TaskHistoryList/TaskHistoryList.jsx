import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import './TaskHistoryList.css';

function TaskHistoryList() {
  const { tasks } = useContext(TaskContext);
  const [search, setSearch] = useState('');

  // Filter tugas selesai dan berdasarkan pencarian (judul atau matkul)
  const finishedTasks = tasks
    .filter(task => task.status === 'selesai')
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.matkul && task.matkul.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <div className="history-table-container">
    <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      
      <input
        type="text"
        placeholder="Cari tugas atau matkul..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border border-blue-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white shadow"
      />
    </div>
    {finishedTasks.length === 0 ? (
      <p className="text-gray-500 text-center py-8">Tidak ada tugas yang telah selesai.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="history-table">
          <thead>
            <tr>
              <th>Judul Tugas</th>
              <th>Mata Kuliah</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {finishedTasks.map((task, idx) => (
              <tr key={task.id || idx}>
                <td>{task.title}</td>
                <td>
                  {task.matkul ? (
                    <span className="matkul-badge">{task.matkul}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td>{task.tenggat || task.selesai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
}

export default TaskHistoryList;