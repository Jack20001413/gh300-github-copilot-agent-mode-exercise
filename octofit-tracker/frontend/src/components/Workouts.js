import React, { useEffect, useState, useCallback } from 'react';
import { fetchWithErrorHandling } from '../utils/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Workouts API endpoint:', endpoint);
    fetchWithErrorHandling(endpoint, 'workouts')
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message || 'Failed to load workouts. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="content-card">
      <div className="section-header">
        <h2 className="h4 mb-0">Workouts</h2>
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
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{idx + 1}</td>
                <td><code className="text-wrap d-block">{JSON.stringify(workout)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workouts;
