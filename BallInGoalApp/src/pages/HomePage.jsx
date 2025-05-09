// import { useState } from "react";
// import { useEffect } from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import "./HomePage.css";
import { BrowserRouter } from "react-router-dom";
import newsimg1 from "../assets/images/newsimg1.webp";
import newsimg2 from "../assets/images/newsimg2.jpg";
import newsimg3 from "../assets/images/newsimg3.png";
import newsimg from "../assets/images/newsimg.jpg";
import newsimg4 from "../assets/images/newsimg4.jpg";
import marocLogo from "../assets/images/marocLogo.webp";
import espanLogo from "../assets/images/espanLogo.webp";
import barcelona from "../assets/images/barcelona.png";
import real from "../assets/images/real.png";
import chelsea from "../assets/images/chelsea.webp";
import city from "../assets/images/city.png";
import raja from "../assets/images/raja.png";
import jsk from "../assets/images/jsk.png";
import england from "../assets/images/england.png";
import maroctuni from "../assets/images/maroctuni.png";
import league from "../assets/images/league.png";
import liverppolLogo from "../assets/images/liverppollogo.jpg";
import manchesterSityLogo from "../assets/images/manchestercitylogo.png";
import arsenalLogo from "../assets/images/arsenallogo.png";
import chelseaLogo from "../assets/images/chelsealogo.png";
import westHamLogo from "../assets/images/westhamlogo.png";
import manchesterUnitedLogo from "../assets/images/manchesterunitedlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
const HomePage = () => {
  const [news, setNews] = useState([]);
  const [error, seterror] = useState(null);
  const [standings, setstandings] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const furstLeagueId = leagues?.[0]?.id || null; // ID de la ligue par défaut
  const [selectedLeagueId, setSelectedLeagueId] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (leagues.length > 0) {
      setSelectedLeagueId(furstLeagueId); // Définit la ligue par défaut lors du premier rendu
    }
  }, [leagues]);

  
  useEffect(() => { 
    const fetchNews = async () => {
      try {
        const response = await axios.get(
                    "http://127.0.0.1:8000/api/news"
                );

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
        const response = await axios.get(
          "http://127.0.0.1:8000/api/leagues"
        );
        setLeagues(response.data);
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
        const response = await axios.get(
          "http://localhost:8000/api/products"
        );
        setProducts(response.data);
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchProducts();
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

  return (
    <>
      <Header />
      <div className="container">
        <div className="news">
          <h2>📰 Actualités du jour</h2>
          <div className="newsInfo">
            {error && <p>{error}</p>}
            {news.map((item) => (
              <div key={item.id}>
                <Link to={`/news/${item.id}`} key={item.id}>
                  <div className="newsimg">
                    <img src={item.image} alt="" />
                  </div>

                  <h5>{item.source}</h5>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              </div>
            ))}
            {/* <div>
              <div className="newsimg">
                <img src={newsimg} alt="" />
              </div>

              <h5>Le catigore de la nouvelle</h5>
              <h3>Le titre de la nouvelle</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                reiciendis possimus? Dolorum nulla earum quia fugit perspiciatis
                omnis deleniti, porro sit aperiam, ipsam molestiae maiores
                accusamus magnam, voluptatibus quod provident!
              </p>
            </div>

            <div>
              <div className="newsimg">
                <img src={newsimg1} alt="" />
              </div>

              <h5>Le catigore de la nouvelle</h5>
              <h3>Le titre de la nouvelle</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                reiciendis possimus? Dolorum nulla earum quia fugit perspiciatis
                omnis deleniti, porro sit aperiam, ipsam molestiae maiores
                accusamus magnam, voluptatibus quod provident!
              </p>
            </div>

            <div>
              <div className="newsimg">
                <img src={newsimg2} alt="" />
              </div>

              <h5>Le catigore de la nouvelle</h5>
              <h3>Le titre de la nouvelle</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                reiciendis possimus? Dolorum nulla earum quia fugit perspiciatis
                omnis deleniti, porro sit aperiam, ipsam molestiae maiores
                accusamus magnam, voluptatibus quod provident!
              </p>
            </div>

            <div>
              <div className="newsimg">
                <img src={newsimg3} alt="" />
              </div>

              <h5>Le catigore de la nouvelle</h5>
              <h3>Le titre de la nouvelle</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                reiciendis possimus? Dolorum nulla earum quia fugit perspiciatis
                omnis deleniti, porro sit aperiam, ipsam molestiae maiores
                accusamus magnam, voluptatibus quod provident!
              </p>
            </div>

            <div>
              <div className="newsimg">
                <img src={newsimg4} alt="" />
              </div>

              <h5>Le catigore de la nouvelle</h5>
              <h3>Le titre de la nouvelle</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                reiciendis possimus? Dolorum nulla earum quia fugit perspiciatis
                omnis deleniti, porro sit aperiam, ipsam molestiae maiores
                accusamus magnam, voluptatibus quod provident!
              </p>
            </div> */}
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
        <div className="statistics">
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
        </div>
        {selectedProduct && (
          
          <div className="overlay" 
          onClick={() => setSelectedProduct(null)}
          >
          <div className="modal">
            <button
              onClick={()=>setSelectedProduct(null)}
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
            <p className="product-description">{selectedProduct.description}</p>
        
            <div className="quantity-section">
              <label className="quantity-label">Quantité</label>
              <input
                type="number"
                defaultValue="1"
                min="1"
                className="quantity-input"
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
        
            <button className="add-to-cart-button">
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
              <div className="shoppingArtecl" key={product.id}
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
            <div className="clubsInfo">
              <div>
                <img src={liverppolLogo} alt="" />
              </div>
              <h3>Liverpool</h3>
            </div>

            <div className="clubsInfo">
              <div>
                <img src={manchesterSityLogo} alt="" />
              </div>
              <h3>Manchester City</h3>
            </div>

            <div className="clubsInfo">
              <div>
                <img src={arsenalLogo} alt="" />
              </div>
              <h3>Arsenal</h3>
            </div>

            <div className="clubsInfo">
              <div>
                <img src={chelseaLogo} alt="" />
              </div>
              <h3>Chelsea</h3>
            </div>

            <div className="clubsInfo">
              <div>
                <img src={westHamLogo} alt="" />
              </div>
              <h3>West Ham</h3>
            </div>

            <div className="clubsInfo">
              <div>
                <img src={manchesterUnitedLogo} alt="" />
              </div>
              <h3>Manchester United</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
