import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PublicLeadForm from './pages/PublicLeadForm';
import './App.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <div className="content-layout">
          <Sidebar />

          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/public-lead" element={<PublicLeadForm />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <footer className="footer">
          Built for{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
          >
            Digital Heroes Training Task
          </a>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;