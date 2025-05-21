import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const SubjectContext = createContext();

export function SubjectProvider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/subjects')
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        setLoading(false);
      });
  }, []);

  const addSubject = async subject => {
    const res = await fetch('/api/subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subject)
    });
    const newSubject = await res.json();
    setSubjects(prev => [...prev, newSubject]);
  };

  const updateSubject = async updated => {
    await fetch(`/api/subjects/${updated.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updated)
    });
    setSubjects(prev => prev.map(s => (s.id === updated.id ? updated : s)));
  };

  const deleteSubject = async id => {
    await fetch(`/api/subjects/${id}`, {
      method: 'DELETE'
    });
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, updateSubject, deleteSubject, loading }}>
      {children}
    </SubjectContext.Provider>
  );
}

SubjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};