import React, { useEffect, useState, useCallback } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Users API endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError(err.message || 'Failed to load users. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="content-card">
      <div className="section-header">
        <h2 className="h4 mb-0">Users</h2>
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
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{idx + 1}</td>
                <td><code className="text-wrap d-block">{JSON.stringify(user)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
