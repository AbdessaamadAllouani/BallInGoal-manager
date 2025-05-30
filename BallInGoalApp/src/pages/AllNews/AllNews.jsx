import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../includes/Header";
import Footer from "../includes/Footer";
import "./AllNews.css";

const AllNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/allNews");
        setNews(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des nouvelles.");
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <Header />
      <div className="all-news-container">
        <h2>📰 Toutes les Nouvelles</h2>
        {error && <p>{error}</p>}
        <div className="news-grid">
          {news.map((item, index) => (
            <Link
              key={item.id}
              to={`/news/${item.id}`}
              className={`news-card ${index % 10 === 0 ? "featured" : ""}`}
            >
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
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllNews;
