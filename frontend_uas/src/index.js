import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TaskProvider } from './context/TaskContext';
import { SubjectProvider } from './context/SubjectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SubjectProvider>
    <TaskProvider>
      <App />
    </TaskProvider>
  </SubjectProvider>
  
);