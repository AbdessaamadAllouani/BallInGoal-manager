import React from "react";
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
  faNewspaper,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import logoBallInGool from "../../assets/images/logoGoolInBall.png";
import listicon from "../../assets/images/listIcon.png";

import { Link } from "react-router-dom";
const Header = () => {
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
          <Link to={"/N"}>
            <FontAwesomeIcon icon={faNewspaper} /> Nouvelles
          </Link>
        </div>
        <div className="helpIcon">
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faCircleInfo} />
          <FontAwesomeIcon icon={faHeadset} />
          <Link to={"/"} className="connexion">
            connexion
          </Link>
          <Link to={"/Inscription"}>inscription</Link>
        </div>
      </nav>
      <div className="searchBar">
        <span>
          <FontAwesomeIcon className="search" icon={faSearch} />
          <input type="text" placeholder="recherche..." />
        </span>
        <div>
          <Link to={"/CM"}>Competition</Link>
          <Link to={"/CL"}>Clubs</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
