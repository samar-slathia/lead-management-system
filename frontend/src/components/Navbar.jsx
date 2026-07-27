import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="brand">Lead CRM</div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/public-lead">Public Lead Form</Link>
        {token ? (
          <button className="ghost-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
