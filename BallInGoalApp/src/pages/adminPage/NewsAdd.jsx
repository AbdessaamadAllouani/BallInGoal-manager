import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AdminPage.css";

const NewsAdd = () => {
  const [news, setNews] = useState({
    title: "",
    description: "",
    image: null,
    content: "",
  });
  const [message, setMessage] = useState(null);
  const textareaRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("description", news.description);
    formData.append("image", news.image);
    formData.append("content", news.content);


    try {
      const response = await axios.post(
        "http://localhost:8000/api/news",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      // Reset the form after successful submission
      setNews({
        title: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const handleChange = (e) => {
    setNews({ ...news, description: e.target.value });
    autoResize();
  };
  const autoResize = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };
  const handleFileChange = (e) => {
    setNews({ ...news, image: e.target.files[0] });
  };

  return (
    <div className="news-add">
      <h1>Add News</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={news.title}
            onChange={(e) => setNews({ ...news, title: e.target.value })}
            required
          />
        </div>
        <div>
          <textarea
            ref={textareaRef}
            placeholder="Description"
            value={news.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            ref={textareaRef}
            placeholder="Content"
            value={news.content}
            onChange={(e) => setNews({ ...news, content: e.target.value })}
            required
          />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={e=>handleFileChange(e)} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
export default NewsAdd;
