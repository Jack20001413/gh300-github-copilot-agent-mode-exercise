import React, { useEffect, useState, useCallback } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME 
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/users/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    console.log('Users API endpoint:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
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
