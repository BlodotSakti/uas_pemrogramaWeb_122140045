import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import { TaskContext } from '../../context/TaskContext';
import './TaskCalendar.css';

function TaskCalendar() {
  const { tasks } = useContext(TaskContext);

  // Ambil semua tugas yang punya tenggat (deadline)
  const deadlines = tasks
    .filter(task => task.tenggat)
    .map(task => ({
      date: new Date(task.tenggat),
      title: task.title,
    }));

  // Untuk menandai tanggal yang punya deadline
  const getDeadlineForDate = (date) =>
    deadlines.filter(
      d =>
        d.date.getFullYear() === date.getFullYear() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getDate() === date.getDate()
    );

  return (
    <div className="calendar-container">
      <Calendar
        tileContent={({ date, view }) => {
          const todayDeadlines = getDeadlineForDate(date);
          return view === 'month' && todayDeadlines.length > 0 ? (
            <div className="calendar-deadline-dot" title={todayDeadlines.map(d => d.title).join(', ')}>
              <span className="calendar-dot"></span>
              {/* Judul tugas tampil di bawah tanggal */}
              <div className="calendar-task-title">
                {todayDeadlines.map((d, i) => (
                  <div key={i}>{d.title}</div>
                ))}
              </div>
              <span className="calendar-tooltip">
                {todayDeadlines.map((d, i) => (
                  <div key={i}>{d.title}</div>
                ))}
              </span>
            </div>
          ) : null;
        }}
        tileClassName={({ date, view }) =>
          view === 'month' && getDeadlineForDate(date).length > 0 ? 'deadline' : ''
        }
      />
      <div className="calendar-note">
        <span className="calendar-dot inline-block mr-2"></span>
        Tanggal dengan titik oranye adalah deadline tugas. Judul tugas juga tampil di bawah tanggal.
      </div>
    </div>
  );
}

export default TaskCalendar;