// CompetitionsList.js
import React from "react";
import Header from "../includes/Header";
import { Link } from "react-router-dom";

const competitions = [
  {
    id: 1,
    name: "nom de compétition",
    date: "20/2/2025",
    icon: "🏆",
  },
];

export default function CompetitionsList() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex gap-6">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="bg-white border rounded-lg shadow p-4 w-64 flex flex-col items-center text-center"
            >
              <div className="text-yellow-500 text-4xl">{comp.icon}</div>
              <h3 className="font-bold mt-2">{comp.name}</h3>
              <p className="text-gray-500">{comp.date}</p>
            </div>
          ))}

          <div className="bg-gray-200 rounded-lg shadow p-4 w-64 flex flex-col items-center justify-center cursor-pointer">
            <Link to="/Competition">
              <div className="text-4xl text-teal-800">＋</div>
              <p className="text-gray-600 mt-2">ajouter une compétition</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
