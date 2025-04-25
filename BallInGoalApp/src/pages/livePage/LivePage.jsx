import React from "react";
import Header from "../includes/Header";
import espanLogo from "../../assets/images/espanLogo.webp";
import "../livePage/LivePageStyle.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import Footer from "../includes/Footer";
// import { faM } from "@fortawesome/free-solid-svg-icons";

const LivePage = () => {
  const[validation, setValidation] = useState({passer: true,venir: false});
  return (
    <>
      <Header />
      <div className="container">
        <div className="live">
          <h2>⚽ Football Match</h2>

          <div className="match">
            <div className="links">
              <button
                href="#"
                onClick={() => setValidation({ passer: true, venir: false })}
              >
                Matchs passés
              </button>
              <button
                onClick={() => setValidation({ passer: false, venir: true })}
                className="active"
              >
                Match en direct
              </button>
              <button>Matchs à venir</button>
            </div>
            {validation.passer && (
              <>
                <div className="containerCenter">
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  Argentina
                  <div className="score">3-4</div>
                  Argentina
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  <div className="fullTime">À temps plein</div>
                  <div className="date">18 December 2022</div>
                </div>

                <div className="containerCenter">
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  Argentina
                  <div className="score">3-4</div>
                  Argentina
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  <div className="fullTime">À temps plein</div>
                  <div className="date">18 December 2022</div>
                </div>

                <div className="containerCenter">
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  Argentina
                  <div className="score">3-4</div>
                  Argentina
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  <div className="fullTime">À temps plein</div>
                  <div className="date">18 December 2022</div>
                </div>

                <div className="containerCenter">
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  Argentina
                  <div className="score">3-4</div>
                  Argentina
                  <div className="divImg">
                    <img src={espanLogo} alt="" />
                  </div>
                  <div className="fullTime">À temps plein</div>
                  <div className="date">18 December 2022</div>
                </div>
              </>
            )}
          </div>
          {validation.venir && (
            <>
              <div className="match">
                <div className="containerCenter">
                  <div className="divPlay">
                    <FontAwesomeIcon className="icon" icon={faCirclePlay} />
                  </div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                    Argentina
                  </span>
                  <div className="direct">en direct</div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Argentina
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                  </span>
                  <div className="commentateur">
                    <FontAwesomeIcon icon={faMicrophone} />
                    ahmad
                  </div>
                </div>

                <div className="containerCenter">
                  <div className="divPlay">
                    <FontAwesomeIcon className="icon" icon={faCirclePlay} />
                  </div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                    Argentina
                  </span>
                  <div className="direct">en direct</div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Argentina
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                  </span>
                  <div className="commentateur">
                    <FontAwesomeIcon icon={faMicrophone} />
                    ahmad
                  </div>
                </div>

                <div className="containerCenter">
                  <div className="divPlay">
                    <FontAwesomeIcon className="icon" icon={faCirclePlay} />
                  </div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                    Argentina
                  </span>
                  <div className="direct">en direct</div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Argentina
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                  </span>
                  <div className="commentateur">
                    <FontAwesomeIcon icon={faMicrophone} />
                    ahmad
                  </div>
                </div>

                <div className="containerCenter">
                  <div className="divPlay">
                    <FontAwesomeIcon className="icon" icon={faCirclePlay} />
                  </div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                    Argentina
                  </span>
                  <div className="direct">en direct</div>
                  <span
                    style={{
                      display: "flex",
                      jutifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Argentina
                    <div className="divImg">
                      <img src={espanLogo} alt="" />
                    </div>
                  </span>
                  <div className="commentateur">
                    <FontAwesomeIcon icon={faMicrophone} /> ahmad
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default LivePage;
