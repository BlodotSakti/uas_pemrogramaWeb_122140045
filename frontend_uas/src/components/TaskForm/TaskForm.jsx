import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TaskContext } from '../../context/TaskContext';
import './TaskForm.css';
import { toast } from 'react-toastify';

function TaskForm({ editTarget, clearEdit }) {
  const { addTask, updateTask } = useContext(TaskContext);
  const [form, setForm] = useState({ title: '', tenggat: '', status: 'selesai' });

  useEffect(() => {
    if (editTarget) setForm(editTarget);
  }, [editTarget]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.tenggat) {
      toast.error('Judul tugas dan deadline wajib diisi');
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
    setForm({ title: '', tenggat: '', status: 'selesai' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Judul Tugas" value={form.title} onChange={handleChange} />
      <input
        type="date" // Mengubah tipe input menjadi date
        name="tenggat" // Pastikan name sesuai dengan state
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



export default TaskForm;