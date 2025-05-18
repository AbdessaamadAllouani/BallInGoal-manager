import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../includes/Header";
import Footer from "../includes/Footer";
import "./NewsDetails.css";
import useUser from "../../hook/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { comment } from "postcss";
const NewsDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const [messageLike, setMessageLike] = useState(false);
  const [typeButtonFunction, setTypeButtonFunction] = useState({
    type: "ajouter",
    comment_id: null,
  });

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/news/${id}`);
      setArticle(response.data);
    } catch (err) {
      setError("Erreur lors du chargement de l'article");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/news/${id}/comments/`
      );
      setComments(response.data.comments);
      console.log(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des commentaires");
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/news/comments`,
        {
          news_id: id,
          comment: newComment,
          is_response: replyingTo,
          user_id: user.id,
        }
      );
      setComments((prev) => [...prev, response.data.comment]);
      setNewComment("");
      setReplyingTo(null);
    } catch (err) {
      setError("Erreur lors de l'ajout du commentaire");
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/comments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, like_count: response.data.comment.like_count }
            : comment
        )
      );
      setMessageLike(response.data.message);
    } catch (err) {
      setError("Erreur lors de l'ajout du like");
    }
  };

  const handleDislike = async (commentId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/comments/${commentId}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, dislike_count: response.data.comment.dislike_count }
            : comment
        )
      );
    } catch (err) {
      setError("Erreur lors de l'ajout du dislike");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/news/comments/${commentId}`
      );
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      setError("Erreur lors de la suppression du commentaire");
    }
  };

  const handleEditComment = async (commentId, newText) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/comments/${commentId}`,
        { comment: newText }
      );
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, comment: response.data.comment.comment }
            : comment
        )
      );
      setNewComment("");
      setTypeButtonFunction("ajouter");
    } catch (err) {
      setError("Erreur lors de la modification du commentaire");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {article && (
          <div className="news-details">
            <h1>{article.title}</h1>
            <img src={article.image} alt={article.title} />
            <h5>{article.source}</h5>
            <h3>{article.description}</h3>
            <p>{article.content}</p>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h5>{article.published_at}</h5>
              <h5>{article.author}</h5>
            </div>
            <hr />

            <div className="comments-section">
              <h2>Commentaires</h2>

              {comments.length === 0 ? (
                <p>Aucun commentaire</p>
              ) : (
                comments
                  .filter((comment) => comment.is_response === null)
                  .map((comment) => (
                    <div key={comment.id} className="comment">
                      <p style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            // marginRight: "10px",
                            maxWidth: "60px",
                            maxHeight: "60px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "gray",
                            display: "inline-block",
                            marginRight: "10px",
                          }}
                        >
                          <img
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                            src={`http://127.0.0.1:8000/storage/${comment.user.image}`}
                            alt=""
                          />
                        </div>
                        <div
                          style={{
                            backgroundColor: "#e2e5e9",
                            borderRadius: "6px",
                            padding: "3px 10px",
                          }}
                        >
                          <div style={{fontWeight:"bold",fontSize:"19px"}}>{comment.user.name}</div>
                          {comment.comment}
                        </div>
                      </p>
                      {/* <p>{comment.created_at}</p> */}
                      {comment.is_edited == 1 && (
                        <p style={{ color: "gray" }}>Commentaire modifié</p>
                      )}
                      <div className="reactions">
                        <button onClick={() => handleLike(comment.id)}>
                          {messageLike ? (
                            <FontAwesomeIcon icon={faThumbsUp} />
                          ) : (
                            <FontAwesomeIcon icon={faThumbsUpRegular} />
                          )}
                          {" " + comment.like_count}
                        </button>
                        <button onClick={() => handleDislike(comment.id)}>
                          👎 {comment.dislike_count}
                        </button>
                        <button onClick={() => setReplyingTo(comment.id)}>
                          ↩️ Répondre
                        </button>
                        {comment.user.id === user.id && (
                          <>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              🗑️ Supprimer
                            </button>
                            <button
                              onClick={() => {
                                setTypeButtonFunction({
                                  type: "modifier",
                                  comment_id: comment.id,
                                });
                                setNewComment(comment.comment);
                              }}
                            >
                              ✏️ Modifier
                            </button>
                          </>
                        )}
                      </div>

                      {/* Réponses */}
                      <div className="replies">
                        {comments
                          .filter((reply) => reply.is_response === comment.id)
                          .map((reply) => (
                            <div key={reply.id} className="reply">
                              <p>
                                <strong>{reply.user.name}</strong>:{" "}
                                {reply.comment}
                              </p>
                              <div className="reactions">
                                <button onClick={() => handleLike(reply.id)}>
                                  messageLike ? "❤️" : "🤍" {reply.like_count}
                                </button>
                                <button onClick={() => handleDislike(reply.id)}>
                                  👎 {reply.dislike_count}
                                </button>
                                {reply.user.id === user.id && (
                                  <button
                                    onClick={() =>
                                      handleDeleteComment(reply.id)
                                    }
                                  >
                                    🗑️ Supprimer
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
              )}

              <div className="add-comment">
                {replyingTo && (
                  <p>
                    Répondre à un commentaire{" "}
                    <button onClick={() => setReplyingTo(null)}>Annuler</button>
                  </p>
                )}
                <textarea
                  placeholder="Ajouter un commentaire..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                {typeButtonFunction.type === "modifier" ? (
                  <button
                    onClick={() =>
                      handleEditComment(
                        typeButtonFunction.comment_id,
                        newComment
                      )
                    }
                  >
                    Modifier
                  </button>
                ) : (
                  <button onClick={handleAddComment}>Ajouter</button>
                )}
                {/* <button onClick={handleAddComment}>Publier</button>
                <button
                  onClick={() => handleEditComment(comment.id, newComment)}
                >
                  Modifier
                </button> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsDetails;
