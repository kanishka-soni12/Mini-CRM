import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/api/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(err => {
        console.error("Not authorized:", err);
        setError(true);
      });
  }, []);

  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/auth/logout';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleLogout} style={{ marginRight: '1rem' }}>Logout</button>
        <Link to="/new-campaign">
          <button>Create New Campaign</button>
        </Link>
      </div>

      {error ? (
        <p style={{ color: 'red' }}>Not authorized or session expired. Please log in again.</p>
      ) : campaigns.length > 0 ? (
        <ul>
          {campaigns.map((c) => (
            <li key={c._id}>
              <strong>{c.title}</strong> — Sent: {c.sent}, Failed: {c.failed}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading campaigns...</p>
      )}
    </div>
  );
};

export default Dashboard;
