import { useEffect, useState } from "react";
import axios from "axios";

interface Submission {
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/forms")
      .then(res => setSubmissions(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <table border={1}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Submitted At</th></tr>
        </thead>
        <tbody>
          {submissions.map((entry, i) => (
            <tr key={i}>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{new Date(entry.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
