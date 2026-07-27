import { useState } from 'react';
import StatusBadge from './StatusBadge';

function LeadCard({ lead, onStatusChange, onAddNote }) {
  const [note, setNote] = useState('');

  return (
    <div className="card">
      <div className="card-header">
        <h4>{lead.name}</h4>
        <StatusBadge status={lead.status} />
      </div>
      <p>{lead.company}</p>
      <p>{lead.email}</p>
      <select
        value={lead.status}
        onChange={(e) => onStatusChange(lead._id, e.target.value)}
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>

      <div className="notes-block">
        <h5>Notes</h5>
        {lead.notes?.length ? (
          lead.notes.map((item, index) => (
            <div key={index} className="note-item">{item.text}</div>
          ))
        ) : (
          <p>No notes yet.</p>
        )}
      </div>

      <div className="note-form">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note"
        />
        <button onClick={() => onAddNote(lead._id, note)}>Add</button>
      </div>
    </div>
  );
}

export default LeadCard;
