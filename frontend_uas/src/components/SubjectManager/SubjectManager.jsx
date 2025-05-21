import React, { useContext, useState } from 'react';
import { SubjectContext } from '../../context/SubjectContext';
import './SubjectManager.css';
import { toast } from 'react-toastify';

function SubjectManager() {
  const { subjects, addSubject, updateSubject, deleteSubject, loading } = useContext(SubjectContext);
  const [form, setForm] = useState({ kode: '', name: '', dosen: '' });
  const [editId, setEditId] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.kode.trim() || !form.name.trim() || !form.dosen.trim()) {
      toast.error('Semua field wajib diisi!');
      return;
    }
    try {
      if (editId) {
        await updateSubject({ id: editId, ...form });
        toast.success('Mata kuliah berhasil diupdate!');
        setEditId(null);
      } else {
        await addSubject(form);
        toast.success('Mata kuliah berhasil ditambahkan!');
      }
      setForm({ kode: '', name: '', dosen: '' });
    } catch (err) {
      toast.error('Terjadi kesalahan saat menyimpan data!');
    }
  };

  const handleEdit = subject => {
    setEditId(subject.id);
    setForm({ kode: subject.kode, name: subject.name, dosen: subject.dosen });
    toast.info('Edit mode diaktifkan!');
  };

  const handleDelete = async id => {
    try {
      await deleteSubject(id);
      toast.success('Mata kuliah berhasil dihapus!');
      if (editId === id) {
        setEditId(null);
        setForm({ kode: '', name: '', dosen: '' });
      }
    } catch (err) {
      toast.error('Gagal menghapus data!');
    }
  };

  return (
    <div className="subject-manager-container">
      <h2>Kelola Mata Kuliah</h2>
      <form onSubmit={handleSubmit} className="subject-form">
        <input
          type="text"
          name="kode"
          placeholder="Kode Mata Kuliah"
          value={form.kode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Nama Mata Kuliah"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dosen"
          placeholder="Nama Dosen"
          value={form.dosen}
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`aksi-btn ${editId ? 'edit-btn' : 'tambah-btn'}`}
        >
          {editId ? 'Update' : 'Tambah'}
        </button>
        {editId && (
          <button
            type="button"
            className="aksi-btn batal-btn"
            onClick={() => {
              setEditId(null);
              setForm({ kode: '', name: '', dosen: '' });
              toast.info('Edit mode dibatalkan');
            }}
          >
            Batal
          </button>
        )}
      </form>
      <table className="subject-list-table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Mata Kuliah</th>
            <th>Nama Dosen</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(subject => (
            <tr key={subject.id}>
              <td>{subject.kode}</td>
              <td>{subject.name}</td>
              <td>{subject.dosen}</td>
              <td>
                <button
                  className="aksi-btn edit-btn"
                  onClick={() => handleEdit(subject)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="hapus-btn"
                  onClick={() => handleDelete(subject.id)}
                  type="button"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default SubjectManager;