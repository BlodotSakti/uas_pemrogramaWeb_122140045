import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TaskContext } from '../../context/TaskContext';
import './TaskForm.css';
import { toast } from 'react-toastify';
// ...existing import...
import { SubjectContext } from '../../context/SubjectContext';

function TaskForm({ editTarget, clearEdit }) {
  const { subjects, loading: loadingSubjects } = useContext(SubjectContext);
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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title || !form.tenggat || !form.matkul) {
      toast.error('Judul tugas, mata kuliah, dan deadline wajib diisi');
      return;
    }
    const taskData = {
      title: form.title,
      matkul_id: Number(form.matkul_id),
      tenggat: form.tenggat,
      status: form.status
    };
    if (editTarget) {
      await updateTask({ ...taskData, id: editTarget.id });
      toast.success('Tugas diperbarui!');
      clearEdit();
    } else {
      const success = await addTask(taskData);
      if (success) {
        toast.success('Tugas baru ditambahkan!');
      } else {
        toast.error('Gagal menambah tugas!');
      }
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
      <select
        name="matkul"
        value={form.matkul}
        onChange={handleChange}
        disabled={loadingSubjects}
      >
      <option value="">Pilih Mata Kuliah</option>
      {subjects.map(subject => (
        <option key={subject.id} value={subject.id}>
          {subject.kode} - {subject.name} ({subject.dosen})
        </option>
      ))}
</select>
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