import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const { id } = useParams();
  const [readiness, setReadiness] = useState(0);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    api.get(`/students/${id}/readiness`)
      .then(res => setReadiness(res.data.readiness));

    api.get(`/students/${id}/eligible-drives`)
      .then(res => setDrives(res.data));
  }, [id]);

  return (
    <div>
      <h2>Placement Readiness: {readiness}%</h2>

      <h3>Eligible Drives:</h3>
      <ul>
        {drives.map(d => (
          <li key={d._id}>{d.companyName}</li>
        ))}
      </ul>
    </div>
  );
}
