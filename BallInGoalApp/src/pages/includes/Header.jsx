import React, { use, useEffect, useState } from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChartBar,
  faCircleInfo,
  faHeadset,
  faHouse,
  faLeaf,
  faNewspaper,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import logoBallInGool from "../../assets/images/logoGoolInBall.png";
import listicon from "../../assets/images/listicon.png";
import useAuth from "../../hook/useAuth";
import profile from "../../assets/images/profile.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Profile from "../../components/profile/profile";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import SignUp from "../signUp/SignUp";
import SignIn from "../SignIn/SignIn";
import SoppingCart from "../../components/shoppingcart/SoppingCart";
import "../../App.css";
const Header = () => {

  const isAuthenticated = useAuth();
  const [user, setuser] = useState({});
  const [error, seterror] = useState("");
  const [actived, setActived] = useState({profile: false, cart: false});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'login' ou 'registrter'
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchuser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setuser(response.data);
      } catch (err) {
        seterror(err.message);
      }
    };
    fetchuser();
  }, [isAuthenticated]);

  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <nav>
        <img style={{ width: "20px" }} src={listicon} alt="" />
        <img src={logoBallInGool} alt="logo" />
        <div className="princpalLink">
          <Link to={"/"}>
            {" "}
            <FontAwesomeIcon icon={faHouse} /> Accueil
          </Link>
          <Link to={"/Diffusion"}>
            {" "}
            <FontAwesomeIcon icon={faVideo} /> Diffusion en direct
          </Link>
          <Link to={"/C"}>
            {" "}
            <FontAwesomeIcon icon={faChartBar} />
            Classement & Statistique
          </Link>
          <Link to={"/news"}>
            <FontAwesomeIcon icon={faNewspaper} /> Nouvelles
          </Link>
        </div>
        <div className="helpIcon">
          {isAuthenticated && (
            <>
              <FontAwesomeIcon icon={faBell} />
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ cursor: "pointer" }}
                onClick={() => setActived({...actived, cart: !actived.cart})}
              />
            </>
          )}
          <FontAwesomeIcon icon={faCircleInfo} />
          <FontAwesomeIcon icon={faHeadset} />
          {isAuthenticated ? (
            <div
              className="profile"
              onClick={() =>
                setActived({ ...actived, profile: !actived.profile })
              }
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  user.image
                    ? `http://localhost:8000/storage/${user.image}`
                    : profile
                }
                alt="profile"
              />
            </div>
          ) : (
            <>
              <button className="connexion" onClick={() => openModal("login")}>
                Connexion
              </button>
              <button
                className="inscription"
                onClick={() => openModal("register")}
              >
                Inscription
              </button>
            </>
          )}
        </div>
      </nav>
      <div className="searchBar">
        {/* <span>
          <FontAwesomeIcon className="search" icon={faSearch} />
          <input type="text" placeholder="recherche..." />
        </span> */}
        <div>
          <Link to={"/CM"}>Competition</Link>
          <Link to={"/CL"}>Clubs</Link>
        </div>
      </div>
      {actived.profile && <Profile user={user} setActived={setActived} />}
      {actived.cart && <SoppingCart setActived={setActived} />}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-sign" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setIsModalOpen(false)}
            >
              x
            </button>
            {modalType === "login" ? (
              <SignIn onClose={() => setIsModalOpen(false)} />
            ) : (
              <SignUp
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                  console.log("Inscription reussie !");
                }}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
