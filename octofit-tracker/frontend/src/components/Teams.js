import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;


function Teams() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Teams from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched Teams:', results);
      })
      .catch(err => console.error('Error fetching Teams:', err));
  }, []);

  return (
    <div className="card p-4">
      <h2 className="card-title mb-4">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Members</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((team, idx) => (
              <tr key={team.id || idx}>
                <td>{team.id || idx + 1}</td>
                <td>{team.name || '-'}</td>
                <td>{Array.isArray(team.members) ? team.members.length : '-'}</td>
                <td><button className="btn btn-primary btn-sm" onClick={() => alert(JSON.stringify(team, null, 2))}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
