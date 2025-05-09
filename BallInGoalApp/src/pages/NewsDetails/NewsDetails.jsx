import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../includes/Header";
import Footer from "../includes/Footer";
import "./NewsDetails.css"; // Import your CSS file for styling

const NewsDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/news/${id}`
        );
        setArticle(response.data);
      } catch (err) {
        setError("Erreur lors du chargement de l'article");
      }
    };
    fetchArticle();
  }, [id]);

  return (
    <>
      <Header />
      <div className="container">
        {error && <p>{error}</p>}
        {article && (
          <div className="news-details">
            <h1>{article.title}</h1>
            <img src={article.image} alt={article.title} />
            <h5>{article.source}</h5>
            <h3>{article.description}</h3>
            <p>{article.content}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5>{article.published_at}</h5>
            <h5>{article.author}</h5>
            </div>
          </div>
        )}
        {!article && !error && <p>Chargement...</p>}
      </div>
      <Footer />
    </>
  );
};

export default NewsDetails;
