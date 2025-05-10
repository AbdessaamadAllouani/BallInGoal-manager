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
const Header = ({ onOpenLogin, onOpenRegister }) => {
  const isAuthenticated = useAuth();
  const [user, setuser] = useState({});
  const [error, seterror] = useState("");
  const [actived, setActived] = useState(false);

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
          {isAuthenticated && <FontAwesomeIcon icon={faBell} />}
          <FontAwesomeIcon icon={faCircleInfo} />
          <FontAwesomeIcon icon={faHeadset} />
          {isAuthenticated ? (
            <div
              className="profile"
              onClick={() => setActived(true)}
              style={{ cursor: "pointer" }}
            >
              <img src={user.image ? `${user.image}` : profile} alt="profile" />
            </div>
          ) : (
            <>
              <button className="connexion" onClick={onOpenLogin}>
                Connexion
              </button>
              <button className="inscription" onClick={onOpenRegister}>
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
      {actived && <Profile user={user} setActived={setActived} />}
    </header>
  );
};

export default Header;
