import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import "./profile.css";
import { FiEdit2 } from "react-icons/fi";
const Profile = ({ user, setActived }) => {
  const [error, seterror] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [activeedit, setActiveEdit] = useState({
    name: false,
    email: false,
    phone: false,
    image: false,
    password: false,
  });
  const [newUser, setNewUser] = useState({
    image: user.image,
    name: user.name,
    email: user.email,
    phone: user.telephone,
    password: "",
    password_confirmation: "",
  });
  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signOut",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      localStorage.removeItem("token");
      location.reload();
    } catch (err) {
      seterror(err.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newUser.name);
    formData.append("email", newUser.email);
    formData.append("phone", newUser.phone);
    if (newUser.password) {
      formData.append("password", newUser.password);
      formData.append("password_confirmation", newUser.password_confirmation);
    }
    if (newUser.image instanceof File) {
      formData.append("image", newUser.image);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/updateUser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setNewUser({
        image: response.data.user.image,
        name: response.data.user.name,
        email: response.data.user.email,
        phone: response.data.user.telephone,
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      seterror(err.response?.data || err.message);
      console.error(err.response?.data || err);
    }
  };
  

  const pathimg = `http://localhost:8000/storage/${newUser.image}`;

  return (
    <div className="profile-card">
      <button
        className="close"
        onClick={() => {
          setActived(false);
          location.reload();
        }}
      >
        x
      </button>
      <div className="profile-avatar-container">
        <label htmlFor="avatar-upload">
          <img
            className="profile-avatar"
            src={newUser.image ? pathimg : profile}
            alt="User avatar"
          />
        </label>
        <input
          type="file"
          accept="image/*"
          id="avatar-upload"
          className="modifier-avatar"
          onChange={(e) => {
            setNewUser({ ...newUser, image: e.target.files[0] });
            setActiveEdit({ ...activeedit, image: !activeedit.image });
          }}
        />
        <span className="avatar-edit-icon">modifier</span>
      </div>
      <p>nom:</p>
      <div className="profile-name-container">
        <input
          type="text"
          className="modifier-name"
          disabled={!activeedit.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          value={newUser.name}
        />
        <button
          className="btn-icon-edit"
          onClick={() =>
            setActiveEdit({ ...activeedit, name: !activeedit.name })
          }
        >
          <FiEdit2 className="icon-edit" />
        </button>{" "}
      </div>
      <p>email:</p>
      <div className="profile-email-container">
        <input
          type="text"
          className="modifier-email"
          disabled={!activeedit.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          value={newUser.email}
        />
        <button
          className="btn-icon-edit"
          onClick={() =>
            setActiveEdit({ ...activeedit, email: !activeedit.email })
          }
        >
          <FiEdit2 className="icon-edit" />
        </button>{" "}
      </div>
      <p>telephone:</p>
      <div className="profile-phone-container">
        <input
          type="text"
          className="modifier-phone"
          disabled={!activeedit.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          value={newUser.phone}
        />
        <button
          className="btn-icon-edit"
          onClick={() =>
            setActiveEdit({ ...activeedit, phone: !activeedit.phone })
          }
        >
          <FiEdit2 className="icon-edit" />
        </button>
      </div>
      <button
        onClick={() =>
          setActiveEdit({ ...activeedit, password: !activeedit.password })
        }
        className="btn-password-edit"
      >
        {activeedit.password
          ? "annuler le changement de mot de passe"
          : "changer le mot de passe"}
      </button>
      <div
        className="profile-password-container"
        style={
          activeedit.password ? { display: "block" } : { display: "none" }
        }
      >
        <input
          type="password"
          className="modifier-password"
          placeholder="nouveau mot de passe"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          value={newUser.password}
        />
        <input
          type="password"
          className="modifier-password"
          placeholder="confirmer le mot de passe"
          onChange={(e) =>
            setNewUser({ ...newUser, password_confirmation: e.target.value })
          }
          value={newUser.password_confirmation}
        />
        </div>
      <button
        className="btn-modifier"
        style={
          activeedit.email ||
          activeedit.name ||
          activeedit.phone ||
          activeedit.image ||
          activeedit.password
            ? { display: "block" }
            : { display: "none" }
        }
        onClick={(e) => handleEdit(e)}
      >
        valider les modification
      </button>
      <button className="logout-button" onClick={(e) => onLogout(e)}>
        Déconnexion
      </button>
    </div>
  );
};

export default Profile;
