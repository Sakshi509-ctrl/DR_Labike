import React, { useEffect, useState } from "react";
// @ts-expect-error - JavaScript module without TypeScript declarations
import apiService from "../services/apiService";

const BlogChangeLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    apiService
      .get("/blog/change-logs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Error fetching blog logs:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blog Change Logs</h2>
      <div className="space-y-3">
        {logs.map((log: any) => (
          <div
            key={log._id}
            className="p-4 border rounded bg-white shadow-md"
          >
            <p>
              <strong>{log.editorName}</strong> ({log.editorEmail})
            </p>
            <p>Action: {log.action}</p>
            <p>Blog: {log.blogId?.title || "Deleted Blog"}</p>
            <p className="text-gray-600">
              Time: {new Date(log.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogChangeLogs;
