// CreateCompetition.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateCompetition() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [logo, setLogo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, age, gender, logo });
    // Appeler une API ici ou sauvegarder localement
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          placeholder="saisir le nom de compétition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="l’âge ciblé"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="le genre"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
          className="w-full p-2"
        />
        <Link to={"/ListCompetition"}>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-800"
          >
            Créer
          </button>
        </Link>
      </form>
    </div>
  );
}
