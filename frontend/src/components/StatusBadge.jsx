function StatusBadge({ status }) {
  const colorMap = {
    New: 'blue',
    Contacted: 'teal',
    Qualified: 'violet',
    'Proposal Sent': 'orange',
    Won: 'green',
    Lost: 'red',
  };

  return <span className={`badge ${colorMap[status] || 'gray'}`}>{status}</span>;
}

export default StatusBadge;
