import React, { useState } from "react";
import glogo from "../../assets/images/g-logo.png";
import "./signUp.css";
import axios from "axios";
import { Await } from "react-router-dom";
export default function SignUp({ onClose }) {
  // const [userType, setUserType] = useState("user");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signUp", {
        name,
        email,
        telephone,
        password,
        password_confirmation: confirmPassword,
        userType,
      });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      <span className="form-title">Créer un compte</span>
      <form>
        <select
          name="userType"
          id="userType"
          onChange={(e) => setUserType(e.target.value)}
          value={userType}
          required
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
          <option value="league">Gistion de Competition</option>
          <option value="team">Gistion de Club</option>
        </select>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="Numéro de telephone"
          required
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirmer le mot de passe"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="btns">
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Continuer
          </button>
          <a href="http://localhost:8000/api/auth/google/redirect">
            <div className="google-sign">
              <img className="glogo" src={glogo} alt="Google logo" />
              S'inscrire avec Google
            </div>
          </a>
        </div>
      </form>
    </React.Fragment>
  );
}
