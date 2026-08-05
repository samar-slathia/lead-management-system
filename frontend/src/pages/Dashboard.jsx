import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeadTable from '../components/LeadTable';
import LeadCard from '../components/LeadCard';
import api from '../services/api';

function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');

  const fetchLeads = async () => {
    try {
      const response = await api.get(`/leads?page=${page}&limit=5${status ? `&status=${status}` : ''}`);
      setLeads(response.data.leads || []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, status]);

  const handleStatusChange = async (id, newStatus) => {
    await api.patch(`/leads/${id}/status`, { status: newStatus });
    fetchLeads();
  };

  const handleAddNote = async (id, text) => {
    if (!text) return;
    await api.post(`/leads/${id}/notes`, { text });
    fetchLeads();
  };

  return (
    <div className="dashboard-page">
    
     <div className="stats">
  <div className="stat-card">
    <h3>{leads.length}</h3>
    <p>Total Leads</p>
  </div>

  <div className="stat-card">
    <h3>{leads.filter((lead) => lead.status === "New").length}</h3>
    <p>New</p>
  </div>

  <div className="stat-card">
    <h3>{leads.filter((lead) => lead.status === "Contacted").length}</h3>
    <p>Contacted</p>
  </div>

  <div className="stat-card">
    <h3>{leads.filter((lead) => lead.status === "Won").length}</h3>
    <p>Won</p>
  </div>
</div>

      <div className="toolbar">
        <h2>Dashboard</h2>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="desktop-only">
        <LeadTable leads={leads} onStatusChange={handleStatusChange} onAddNote={handleAddNote} />
      </div>
      <div className="mobile-only">
        {leads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} onStatusChange={handleStatusChange} onAddNote={handleAddNote} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Dashboard;
