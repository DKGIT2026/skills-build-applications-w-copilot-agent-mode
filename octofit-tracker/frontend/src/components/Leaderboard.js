import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;


function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Leaderboard from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => console.error('Error fetching Leaderboard:', err));
  }, []);

  return (
    <div className="card p-4">
      <h2 className="card-title mb-4">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Score</th>
              <th>Rank</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr key={entry.id || idx}>
                <td>{entry.id || idx + 1}</td>
                <td>{entry.user || '-'}</td>
                <td>{entry.score || '-'}</td>
                <td>{entry.rank || '-'}</td>
                <td><button className="btn btn-primary btn-sm" onClick={() => alert(JSON.stringify(entry, null, 2))}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
