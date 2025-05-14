import React from 'react';
import PropTypes from 'prop-types';
import './TaskFilter.css';

function TaskFilter({ filterStatus, setFilterStatus }) {
  return (
    <select
      className="task-filter"
      value={filterStatus}
      onChange={e => setFilterStatus(e.target.value)}
    >
      <option value="all">Semua Status</option>
      <option value="selesai">Sudah Selesai</option>
      <option value="dikerjakan">Sedang Proses Pengerjaan</option>
      <option value="belum">Belum Dikerjakan</option>
    </select>
  );
}

TaskFilter.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
};

export default TaskFilter;