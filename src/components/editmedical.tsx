import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditMedicalPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    axios.get(`https://your-backend.com/api/medical-page/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSave = () => {
    axios.put(`https://your-backend.com/api/medical-page/${id}`, {
      title, content, image
    })
    .then(() => alert("Page updated successfully"))
    .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Medical Page</h2>
      <input
        className="border p-2 w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Page Title"
      />
      <textarea
        className="border p-2 w-full mb-3"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Page Content"
      />
      <input
        className="border p-2 w-full mb-3"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditMedicalPage;
