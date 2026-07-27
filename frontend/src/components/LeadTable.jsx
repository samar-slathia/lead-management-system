import StatusBadge from './StatusBadge';

function LeadTable({ leads, onStatusChange, onAddNote }) {
  return (
    <div className="table-wrap">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.company}</td>
              <td>{lead.email}</td>
              <td>
                <select value={lead.status} onChange={(e) => onStatusChange(lead._id, e.target.value)}>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>
              <td>
                <div className="notes-cell">
                  <StatusBadge status={lead.status} />
                  <button onClick={() => onAddNote(lead._id, 'Follow up needed')}>Add Note</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
