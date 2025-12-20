import React, { useEffect, useState, useCallback } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Teams API endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch teams: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message || 'Failed to load teams. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="content-card">
      <div className="section-header">
        <h2 className="h4 mb-0">Teams</h2>
        <button type="button" className="btn btn-primary" onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div className="table-wrapper">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: '80px' }}>#</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{idx + 1}</td>
                <td><code className="text-wrap d-block">{JSON.stringify(team)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
