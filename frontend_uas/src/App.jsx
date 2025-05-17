import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Stats from './pages/Stats'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import History from './pages/History';
import Chart from './pages/Chart';
import Calendar from './pages/Calendar';

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <h2>My Dashboard</h2>
      <nav>
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>Home</Link>
        <Link to="/stats" className={location.pathname === "/stats" ? "nav-link active" : "nav-link"}>Statistics</Link>
        <Link to="/history" className={location.pathname === "/history" ? "nav-link active" : "nav-link"}>Riwayat Tugas</Link>
        <Link to="/chart" className={location.pathname === "/chart" ? "nav-link active" : "nav-link"}>Grafik Tugas</Link>
        <Link to="/calendar" className={location.pathname === "/calendar" ? "nav-link active" : "nav-link"}>Kalender Deadline</Link>
      </nav>
    </aside>
  );
}

function AppLayout() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <div>Welcome to 📚 MANTUDOT (Manajemen Tugas Blodot)</div>
          <div className="user-info">👤</div>
        </header>
        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/history" element={<History />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;