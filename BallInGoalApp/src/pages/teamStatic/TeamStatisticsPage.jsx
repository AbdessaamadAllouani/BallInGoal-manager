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
  const [team, setTeam] = useState({});
  const { clubId } = useParams();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/Statistique/Club/${clubId}`
        );
        setTeam(res.data);
        console.log(res.data.players);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, [clubId]);

  if (!team || Object.keys(team).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Statistiques des Équipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div key={team.id} className="bg-white shadow-md rounded-2xl p-4">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={team.logo}
              alt={team.name}
              className="w-12 h-12 object-contain"
            />
            <h2 className="text-xl font-semibold">{team.name}</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={[
                { name: "Matchs Gagnés", value: team.matches_won },
                { name: "Matchs Nuls", value: team.matches_drawn },
                { name: "Matchs Perdus", value: team.matches_lost },
                { name: "Buts Marqués", value: team.goals_scored },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <h3 className="mt-4 font-medium text-gray-700">Joueurs Clés :</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {/* {console.log(team.players)} */}
            {Array.isArray(team.players) &&
              team.players.map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col items-center w-20"
                >
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <p className="text-sm text-center mt-1">{player.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStatisticsPage;
