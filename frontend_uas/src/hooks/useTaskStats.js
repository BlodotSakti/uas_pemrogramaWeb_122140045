import { useContext, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function useTaskStats() {
  const { tasks } = useContext(TaskContext);
  return useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(b => b.status === 'selesai').length;
    const progres= tasks.filter(b => b.status === 'dikerjakan').length;
    const notyet = tasks.filter(b => b.status === 'belum').length;
    return { total, done, progres, notyet };
  }, [tasks]);
}