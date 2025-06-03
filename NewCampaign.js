import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const NewCampaign = () => {
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [ageOp, setAgeOp] = useState('>');         // > or <
  const [ageVal, setAgeVal] = useState('30');
  const [location, setLocation] = useState('Delhi');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const rule = {
      age: `${ageOp}${ageVal}`,
      location: `=${location}`
    };

    try {
      await api.post('/api/campaigns', {
        title,
        objective,
        rule
      });

      alert("Campaign created!");
      navigate('/dashboard');
    } catch (err) {
      console.error("Create failed:", err);
      setError("Failed to create campaign. Please check inputs.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2>Create New Campaign</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div>
          <label>Objective:</label><br />
          <input value={objective} onChange={e => setObjective(e.target.value)} required />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Age Rule:</label><br />
          <select value={ageOp} onChange={e => setAgeOp(e.target.value)}>
            <option value=">">{'>'}</option>
            <option value="<">{'<'}</option>
            <option value=">=">{'>='}</option>
            <option value="<=">{'<='}</option>
          </select>
          <input
            type="number"
            value={ageVal}
            onChange={e => setAgeVal(e.target.value)}
            style={{ width: "80px", marginLeft: "10px" }}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Location:</label><br />
          <select value={location} onChange={e => setLocation(e.target.value)}>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Create Campaign</button>
      </form>
    </div>
  );
};

export default NewCampaign;
