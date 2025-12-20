import React, { useEffect, useState, useCallback } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Activities API endpoint:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch activities: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError(err.message || 'Failed to load activities. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="content-card">
      <div className="section-header">
        <h2 className="h4 mb-0">Activities</h2>
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
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <td>{idx + 1}</td>
                <td><code className="text-wrap d-block">{JSON.stringify(activity)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
