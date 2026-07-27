import { useState } from 'react';
import api from '../services/api';

function PublicLeadForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leads', form);
      setMessage('Lead submitted successfully');
      setForm({ name: '', email: '', phone: '', company: '' });
    } catch (err) {
      setMessage('Unable to submit lead');
    }
  };

  return (
    <div className="form-card">
      <h2>Public Lead Form</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        {message && <p className="success">{message}</p>}
        <button type="submit">Submit Lead</button>
      </form>
    </div>
  );
}

export default PublicLeadForm;
