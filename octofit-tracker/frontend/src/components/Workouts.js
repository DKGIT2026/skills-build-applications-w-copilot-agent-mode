import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;


function Workouts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Workouts from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Fetched Workouts:', results);
      })
      .catch(err => console.error('Error fetching Workouts:', err));
  }, []);

  return (
    <div className="card p-4">
      <h2 className="card-title mb-4">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <td>{workout.id || idx + 1}</td>
                <td>{workout.name || '-'}</td>
                <td>{workout.duration || '-'}</td>
                <td>{workout.calories || '-'}</td>
                <td><button className="btn btn-primary btn-sm" onClick={() => alert(JSON.stringify(workout, null, 2))}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
