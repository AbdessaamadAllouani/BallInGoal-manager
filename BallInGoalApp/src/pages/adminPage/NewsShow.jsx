import react, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPage.css";

const NewsShow = ({ setVoir, setAdd, setEdit, setProduct }) => {
  const [news, setNews] = useState([]);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/allNews", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setNews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/news/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(response.data.message);
      setNews(news.filter((news) => news.id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  const filteredNews = news.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      +news.id === +searchTerm ||
      news.source.toLowerCase().includes(searchTerm.toUpperCase())
  );

  return (
    <div className="all-news-container product-show ">
      <h2>List des nouvelles</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* {error && <p>{error}</p>} */}
      <div className="news-grid">
        {filteredNews.map((item) => (
          <div key={item.id} to={`/news/${item.id}`} className={`news-card`}>
            <img
              src={
                item.image.includes("https")
                  ? item.image
                  : `http://localhost:8000/Storage/${item.image}`
              }
              alt={item.title}
            />
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.source}</p>
            </div>
            <button onClick={()=>handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NewsShow;
