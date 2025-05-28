// src/pages/ClassementEtStatistique.jsx
import React from "react";
import { useState, useEffect } from "react";
import ClassementTable from "./ClassementTable";
import axios from "axios";
import '../../App.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../includes/Header";

const ClassementChart = ({
  standings,

}) => {
  const data = standings
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        import {XAxis} from "recharts";
        <XAxis
          dataKey="team_logo"
          interval={0}
          tick={({ x, y, payload }) => (
            <image
              href={payload.value}
              x={x - 12}
              y={y + 10}
              height={30}
              width={30}
              preserveAspectRatio="xMidYMid slice"
            />
          )}
          height={50}
        />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const team = payload[0].payload;
              return (
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    border: "1px solid #ccc",
                  }}
                >
                  <div>
                    <img src={team.team_logo} alt="Team logo" height={24} />
                    {team.team_name}
                  </div>
                  <br />
                  points: {team.points}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="points" fill="#16a34a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const TopScorers = ({ selectedLeagueId }) => {
  const [topScorers, setTopScorers] = useState([]);

  useEffect(() => {
    const fetchTopScorers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/league/top/${selectedLeagueId}`
        );
        setTopScorers(response.data);
        console.log("Top Scorers:", response.data);
      } catch (error) {
        console.error("Error fetching top scorers:", error);
      }
    };
    fetchTopScorers();
  }, [selectedLeagueId]);

  return (
    <div className="space-y-3">
      {topScorers.map((p, index) => (
        <div
          key={index}
          className="bg-gray-50 p-3 rounded-lg shadow flex justify-between"
        >
          <div>
            <div className="div_img">
              <img
                src={p.player.photo}

                alt={p.player.name}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {p.player.name}
            </div>
            <div className="text-sm text-gray-600">{p.team.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const GlobalStats = () => {
  const stats = [
    { label: "Total Buts", value: 22 },
    { label: "Cartons Jaunes", value: 14 },
    { label: "Cartons Rouges", value: 3 },
    { label: "Équipe + offensive", value: "Netherlands" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-50 p-4 rounded-xl shadow text-center"
        >
          <div className="text-lg font-bold text-green-600">{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const ClassementEtStatistique = () => {
    const [error, seterror] = useState(null);
    const [standings, setstandings] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [selectedLeagueId, setSelectedLeagueId] = useState(1);
    const groupAData = standings.filter(
      (item) => item.group_name === "Group A"
    );
    const otherGroupsData = standings.filter(
      (item) => item.group_name !== "Group A"
    );

      

    useEffect(() => {
      const fetchStandings = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/standings/${selectedLeagueId}`
          );
          setstandings(response.data);
        } catch (err) {
          seterror(err.message);
        }
      };
      fetchStandings();
    }, [selectedLeagueId]);

    useEffect(() => {
      const fetchLeagues = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/leagues");
          setLeagues(response.data);
        } catch (err) {
          seterror(err.message);
        }
      };
      fetchLeagues();
    }, []);
  return (
    <>
      <Header />
      <div className="container">
        <ClassementTable
          standings={standings}
          leagues={leagues}
          selectedLeagueId={selectedLeagueId}
          setSelectedLeagueId={setSelectedLeagueId}
        />

        {/* Diagramme points */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            📈 Diagramme des points
          </h2>
          <ClassementChart
            standings={standings}
            leagues={leagues}
            selectedLeagueId={selectedLeagueId}
            setSelectedLeagueId={setSelectedLeagueId}
            groupAData={groupAData}
            otherGroupsData={otherGroupsData}
          />
        </section>

        {/* Meilleurs buteurs */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">⚽ Top 5 des buteurs</h2>
          <TopScorers selectedLeagueId={selectedLeagueId} />
        </section>

        {/* Statistiques globales */}
        <section className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            📊 Statistiques générales
          </h2>
          <GlobalStats />
        </section>
      </div>
    </>
  );
};

export default ClassementEtStatistique;
