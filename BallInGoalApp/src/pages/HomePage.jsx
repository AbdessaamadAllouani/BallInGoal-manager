// import { useState } from "react";

// import { useEffect } from "react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
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
import SignUp from "./signUp/SignUp";
import SignIn from "./SignIn/SignIn";
const HomePage = () => {
  const [news, setNews] = useState([]);
  const [error, seterror] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState(''); // 'login' ou 'registrter'

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
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Header
        onOpenLogin={() => openModal('login')}
        onOpenRegister={() => openModal('register')}

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
                    <img src={item.image} alt="" />
                  </div>

                  <h5>{item.source}</h5>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              </div>
            ))}
            {
              isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                  <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <button className="close-modal" onClick={() => setIsModalOpen(false)}>x</button>
                    {modalType === 'login' ? (
                      <SignIn onClose={() => setIsModalOpen(false)} />
                    ) : (
                      <SignUp
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={() => {
                          console.log('Inscription reussie !');
                        }}

                      />
                    )}
                  </div>
                </div>
              )
            }
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
                  <img src={england} alt="" />
                </div>
                <div>
                  <img src={league} alt="" />
                </div>
                <select name="" id="">
                  <option value="">Premier League</option>
                  <option value="">Premier League</option>
                  <option value="">Premier League</option>
                </select>
              </div>
              <Link to="/statistiques">voir plus</Link>
            </div>
            <div className="statisticsInfo">
              <table>
                <thead>
                  <tr>
                    <th>Club</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Pts</th>
                    <th>Dernieres Match</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        1{" "}
                        <div className="imgStatDiv">
                          <img src={manchesterSityLogo} alt="" />
                        </div>{" "}
                        Manchester City
                      </div>
                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faCircleXmark}
                      />{" "}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div>
                        1{" "}
                        <div className="imgStatDiv">
                          <img src={westHamLogo} alt="" />
                        </div>{" "}
                        Wesst Ham
                      </div>
                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faCircleXmark}
                      />{" "}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div>
                        1{" "}
                        <div className="imgStatDiv">
                          <img src={arsenalLogo} alt="" />
                        </div>{" "}
                        Arsenal
                      </div>
                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faCircleXmark}
                      />{" "}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div>
                        1{" "}
                        <div className="imgStatDiv">
                          <img src={chelseaLogo} alt="" />
                        </div>{" "}
                        Chelsea
                      </div>
                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faCircleXmark}
                      />{" "}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div>
                        1{" "}
                        <div className="imgStatDiv">
                          <img src={manchesterUnitedLogo} alt="" />
                        </div>{" "}
                        Manchester United
                      </div>
                    </td>

                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faCircleXmark}
                      />{" "}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div>
                        1{" "}
                        <div className="imgStatDiv">
                          <img src={liverppolLogo} alt="" />
                        </div>{" "}
                        Liverpool
                      </div>
                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCircleCheck}
                      />{" "}
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faCircleXmark}
                      />{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

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
            <div className="shoppingArtecl">
              <div>
                <img src={jsk} alt="" />
              </div>
              <p>nom de ticheurte</p>
              <h3>23.8 $</h3>
            </div>

            <div className="shoppingArtecl">
              <div>
                <img src={maroctuni} alt="" />
              </div>
              <p>nom de ticheurte</p>
              <h3>23.8 $</h3>
            </div>

            <div className="shoppingArtecl">
              <div>
                <img src={raja} alt="" />
              </div>
              <p>nom de ticheurte</p>
              <h3>23.8 $</h3>
            </div>

            <div className="shoppingArtecl">
              <div>
                <img src={city} alt="" />
              </div>
              <p>nom de ticheurte</p>
              <h3>23.8 $</h3>
            </div>

            <div className="shoppingArtecl">
              <div>
                <img src={chelsea} alt="" />
              </div>
              <p>nom de ticheurte</p>
              <h3>23.8 $</h3>
            </div>

            <div className="shoppingArtecl">
              <div>
                <img src={real} alt="" />
              </div>
              <p>nom de ticheurte</p>
              <h3>23.8 $</h3>
            </div>

            <div className="shoppingArtecl">
              <div>
                <img src={barcelona} alt="" />
              </div>
              <p>nom de ticheurte</p>
              <h3>23.8 $</h3>
            </div>
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
