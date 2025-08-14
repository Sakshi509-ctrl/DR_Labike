import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const navigate = useNavigate();

  const projects = [
    { id: "66b6d7d7baf", title: "Medical Page" },
    ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <ul>
        {projects.map((p) => (
          <li
            key={p.id}
            className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 rounded mb-2"
            onClick={() => navigate(`/dashboard/edit-project/${p.id}`)}
          >
            {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
