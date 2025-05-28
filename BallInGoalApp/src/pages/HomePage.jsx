// import { useState } from "react";
// import { useEffect } from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import "./HomePage.css";
import marocLogo from "../assets/images/marocLogo.webp";
import espanLogo from "../assets/images/espanLogo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import SignUp from "./signUp/SignUp";
import SignIn from "./SignIn/SignIn";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/CartSlices";
import ClassementTable from "./classement/ClassementTable";

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [error, seterror] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'login' ou 'registrter'
  const [team, setTeam] = useState([]);
  const [standings, setstandings] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/news");

        setNews(response.data);
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/leagues");
        setLeagues(response.data);
        // if (response.data.length > 0) {
        //   setSelectedLeagueId(response.data[0].id);
        // }
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/standings/${selectedLeagueId}`
        );
        setstandings(response.data);
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchStandings();
  }, [selectedLeagueId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data);
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/teams");
        setTeam(response.data);
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchTeams();
  }, []);

  const shoppingContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = shoppingContainerRef.current;
    if (container) {
      const scrollAmount = 500; // Ajustez cette valeur selon la largeur de vos articles + gap
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };
  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Header
      // onOpenLogin={() => openModal("login")}
      // onOpenRegister={() => openModal("register")}
      />
      <div className="container">
        <div className="news">
          <h2>📰 Actualités du jour</h2>
          <div className="newsInfo">
            {error && <p>{error}</p>}
            {news.map((item) => (
              <div key={item.id}>
                <Link to={`/news/${item.id}`} key={item.id}>
                  <div className="newsimg">
                    <img
                      src={
                        item.image.includes("https")
                          ? item.image
                          : `http://localhost:8000/Storage/${item.image}`
                      }
                      alt=""
                    />
                  </div>

                  <h5>{item.source}</h5>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="live">
          <h2>⚽ Match en cours</h2>
          <div className="allMatch">
            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span className="animationcolor">en dirict</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span className="animationcolor">en dirict</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span className="animationcolor">en dirict</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span className="animationcolor">en dirict</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="statistics">
        {standings.length === 0 ? (
          <p>Chargement du classement...</p>
        ) : (
          <>
          <h2>🏆 Classement & Statistique</h2>
          <div className="containerStatistics">
            <div className="filter">
              <div>
                <div>
                  <img
                    src={
                      leagues.find((league) => league.id == selectedLeagueId)
                        ?.logo
                    }
                    alt="League Logo"
                    className="leagueLogo"
                  />
                </div>
                <select
                  value={selectedLeagueId}
                  onChange={(e) => setSelectedLeagueId(e.target.value)}
                >
                  {leagues.map((league) => (
                    <option key={league.id} value={league.id}>
                      {league.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {standings.length > 0 ? (
              <div className="statisticsInfo">
                <table>
                  <thead>
                    <tr>
                      <th>Club</th>
                      <th>victoires</th>
                      <th>tirages</th>
                      <th>pertes</th>
                      <th>points</th>
                      <th>jouée</th>
                      <th>différences de buts</th>
                      <th>Derniers Matchs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team) => (
                      <tr key={team.id}>
                        <td>
                          <div>
                            {team.rank}{" "}
                            <div className="imgStatDiv">
                              <img src={team.team_logo} alt="" />
                            </div>{" "}
                            {team.team_name}
                          </div>
                        </td>
                        <td>{team.wins}</td>
                        <td>{team.draws}</td>
                        <td>{team.losses}</td>
                        <td>{team.points}</td>
                        <td>{team.played}</td>
                        <td>{team.goals_diff}</td>
                        <td>
                          {team.form &&
                            team.form.split("").map((item, index) => {
                              return item === "W" ? (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faCircleCheck}
                                  style={{ color: "green", margin: "0 0.5px" }}
                                />
                              ) : item === "L" ? (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faCircleXmark}
                                  style={{ color: "red", margin: "0 0.5px" }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faCircleXmark}
                                  style={{ color: "gray", margin: "0 0.5px" }}
                                />
                              );
                            })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Aucun classement disponible pour cette ligue.</p>
            )}
          </div>
          </>
           )}
        </div> */}

        <ClassementTable
          standings={standings}
          leagues={leagues}
          selectedLeagueId={selectedLeagueId}
          setSelectedLeagueId={setSelectedLeagueId}
        />

        {selectedProduct && (
          <div
            className="modal-overlay"
            // onClick={() => setSelectedProduct(null)}
          >
            <div className="modal">
              <button
                onClick={() => setSelectedProduct(null)}
                className="close-button"
              >
                ×
              </button>

              <img
                src={`http://localhost:8000/storage/${selectedProduct.image}`}
                alt={selectedProduct.name}
                className="product-image"
              />

              <h2 className="product-title">{selectedProduct.name}</h2>
              <p className="product-description">
                {selectedProduct.description}
              </p>

              <div className="quantity-section">
                <label className="quantity-label">Quantité</label>
                <input
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="quantity-input"
                  onChange={(e) => {
                    const quantity = e.target.value;
                    setSelectedProduct((prev) => ({
                      ...prev,
                      quantity: parseInt(quantity),
                    }));
                  }}
                />
              </div>

              {/* <div className="color-section">
              <label className="color-label">Couleur</label>
              <select className="color-select">
                {
                selectedProduct.colors.map((color, index) => (
                  <option key={index} value={color}>{color}</option>
                ))}
              </select>
            </div> */}

              <button
                className="add-to-cart-button"
                onClick={() => {
                  dispatch(addToCart(selectedProduct));
                  setSelectedProduct(null);
                }}
              >
                Ajouter au panier - {selectedProduct.price} $
              </button>
            </div>
          </div>
        )}

        <div className="shopping">
          <div className="sommer">
            <h2>👕 Shopping</h2>
            <div>
              <button onClick={() => scroll("left")}>
                {" "}
                <FontAwesomeIcon icon={faArrowLeft} />{" "}
              </button>
              <button onClick={() => scroll("right")}>
                {" "}
                <FontAwesomeIcon icon={faArrowRight} />{" "}
              </button>
            </div>
          </div>
          <div className="containerShopping" ref={shoppingContainerRef}>
            {products.map((product) => (
              <div
                className="shoppingArtecl"
                key={product.id}
                onClick={() => setSelectedProduct(product)}
              >
                <div>
                  <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    alt=""
                  />
                </div>
                <p>{product.name}</p>
                <h3>{product.price} $</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="live">
          <h2>⚽ Matchs de ce mois </h2>
          <div className="allMatch">
            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span>12/5/2025</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span>12/5/2025</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span>12/5/2025</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>

            <div className="separator"></div>

            <div className="containerLiveMatch">
              <h3>premier league</h3>
              <div className="liveMatch">
                <div>
                  <div className="liveImg">
                    <img src={marocLogo} alt="" />
                  </div>
                  maroc
                </div>

                <div className="vs">
                  <span>17:00</span>
                  <span>12/5/2025</span>
                </div>

                <div>
                  <div className="liveImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  espagne
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clubs">
          <h2>🏆 Clubs</h2>

          <div className="containerClubs">
            {team.map((item) => (
              <Link to={`/Statistique-Club/${item.id}`} key={item.id}>
                <div className="clubsInfo">
                  <div>
                    <img src={item.logo} alt="" />
                  </div>
                  <h3>{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
