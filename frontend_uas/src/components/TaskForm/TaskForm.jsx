import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TaskContext } from '../../context/TaskContext';
import './TaskForm.css';
import { toast } from 'react-toastify';

function TaskForm({ editTarget, clearEdit }) {
  const { addTask, updateTask } = useContext(TaskContext);
  const [form, setForm] = useState({
    title: '',
    matkul: '',
    tenggat: '',
    status: 'selesai'
  });

  useEffect(() => {
    if (editTarget) setForm(editTarget);
  }, [editTarget]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.tenggat || !form.matkul) {
      toast.error('Judul tugas, mata kuliah, dan deadline wajib diisi');
      return;
    }
    if (editTarget) {
      updateTask(form);
      toast.success('Tugas diperbarui!');
      clearEdit();
    } else {
      addTask({ ...form, id: Date.now().toString() });
      toast.success('Tugas baru ditambahkan!');
    }
    setForm({ title: '', matkul: '', tenggat: '', status: 'selesai' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Judul Tugas"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="matkul"
        placeholder="Mata Kuliah"
        value={form.matkul}
        onChange={handleChange}
      />
      <input
        type="date"
        name="tenggat"
        placeholder="Deadline"
        value={form.tenggat}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="selesai">Sudah Selesai</option>
        <option value="dikerjakan">Sedang Dikerjakan</option>
        <option value="belum">Belum Dikerjakan</option>
      </select>
      <button type="submit">{editTarget ? 'Update Tugas' : 'Tambah Tugas'}</button>
    </form>
  );
}

TaskForm.propTypes = {
  editTarget: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    matkul: PropTypes.string,
    tenggat: PropTypes.string,
    status: PropTypes.string
  }),
  clearEdit: PropTypes.func,
};

TaskForm.defaultProps = { editTarget: null, clearEdit: () => {} }

export default TaskForm;