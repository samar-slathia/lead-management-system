import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/public-lead', label: 'Public Lead Form' },
  ];

  return (
    <aside className="sidebar">
      <h3>Menu</h3>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={location.pathname === link.to ? 'active' : ''}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
