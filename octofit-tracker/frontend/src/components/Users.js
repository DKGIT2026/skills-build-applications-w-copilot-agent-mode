import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;


function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Users from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched Users:', results);
      })
      .catch(err => console.error('Error fetching Users:', err));
  }, []);

  return (
    <div className="card p-4">
      <h2 className="card-title mb-4">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, idx) => (
              <tr key={user.id || idx}>
                <td>{user.id || idx + 1}</td>
                <td>{user.username || '-'}</td>
                <td>{user.email || '-'}</td>
                <td><button className="btn btn-primary btn-sm" onClick={() => alert(JSON.stringify(user, null, 2))}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
