import React from "react";
import logoGoolInBall from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import linkedin_icon from "../../assets/images/linkedin_icon.png";
import facebook_icon from '../../assets/images/facebook_icon.png';
import instagram_icon from "../../assets/images/instagram_icon.png";
import youtube_icon from '../../assets/images/youtube_icon.png'
import twitter_icon from "../../assets/images/twitter_icon.png"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        <img src={logoGoolInBall} alt="" />
        <h3>Ball In Gool</h3>
        <p>© 2023 Ball In Gool. Tous droits réservés.</p>
        <p>Politique de confidentialité | Conditions d'utilisation</p>
      </div>
      <div className="socialMediaIcons">
        <h2>SUIVEZ-NOUS</h2>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={facebook_icon} alt="" /> Facebook
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitter_icon} alt="" /> Twitter
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram_icon} alt="" /> Instagram
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={youtube_icon} alt="" /> YouTube
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={linkedin_icon} alt="" /> LinkedIn
        </a>
      </div>
      <div className="footerLinks">
        <h2>plus</h2>
        <a href="/about">À propos</a>
        <a href="/contact">Contact</a>
        <a href="/terms">Conditions d'utilisation</a>

        <a href="/privacy">Politique de confidentialité</a>
        <a href="/help">Aide</a>
      </div>
    </footer>
  );
};

export default Footer;
