import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { useParams } from "react-router-dom";

const TeamStatisticsPage = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clubId } = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/Statistique/Club/${clubId}`
        );
        setTeam(res.data);
      } catch (err) {
        console.error("Erreur de chargement des données:", err);
        setError("Erreur de chargement des données de l'équipe");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [clubId]);

  // Solution temporaire pour le Loader
  if (loading) {
    return <div className="p-4 text-center">Loading team statistics...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!team) {
    return (
      <div className="p-4">Aucune donnée disponible pour cette équipe</div>
    );
  }

  const chartData = [
    { name: "Matchs Gagnés", value: team.matches_won || 0 },
    { name: "Matchs Nuls", value: team.matches_drawn || 0 },
    { name: "Matchs Perdus", value: team.matches_lost || 0 },
    { name: "Buts Marqués", value: team.goals_scored || 0 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Statistiques de l'Équipe</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div key={team.id} className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center gap-4 mb-4">
            {team.logo && (
              <img
                src={team.logo}
                alt={team.name}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentNode.replaceChild(
                    document.createTextNode("🏆"),
                    e.target
                  );
                }}
              />
            )}
            <h2 className="text-xl font-semibold">
              {team.name || "Équipe sans nom"}
            </h2>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <h3 className="mt-4 font-medium text-gray-700">Joueurs Clés :</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {team.players && team.players.length > 0 ? (
              team.players.map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col items-center w-20"
                >
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      className="w-14 h-14 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.className =
                          "w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center";
                        e.target.innerHTML = "👤";
                      }}
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                      👤
                    </div>
                  )}
                  <p className="text-sm text-center mt-1 truncate w-full">
                    {player.name || "Joueur sans nom"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucun joueur disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatisticsPage;
