import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./ClassementTable.css"; // ملف CSS خاص بالأنيميشن

const ClassementTable = ({
  standings,
  leagues,
  selectedLeagueId,
  setSelectedLeagueId,
}) => {
  const nodeRef = useRef(null);

  const firstLeagueId = leagues?.[0]?.id || null;

  useEffect(() => {
    if (leagues.length > 0) {
      setSelectedLeagueId(firstLeagueId);
    }
  }, [leagues]);

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const groups = [...new Set(standings.map((team) => team.group_name))];
  const currentGroup = groups[currentGroupIndex];
  const currentGroupTeams = standings.filter(
    (team) => team.group_name === currentGroup
  );

  // Transition automatique كل 6 ثواني إذا لم يكن الفأرة فوق
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % groups.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, groups.length]);

  const handlePrev = () => {
    setCurrentGroupIndex((prevIndex) =>
      prevIndex === 0 ? groups.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % groups.length);
  };

  return (
    <div className="statistics">
      <h2>🏆 Classement & Statistique</h2>
      <div className="containerStatistics">
        <div className="filter">
          <div>
            <img
              src={
                leagues.find((league) => league.id == selectedLeagueId)?.logo
              }
              alt="League Logo"
              className="leagueLogo"
            />
            <select
              value={selectedLeagueId}
              onChange={(e) => setSelectedLeagueId(e.target.value)}
            >
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>

          <div className="groupControl">
            <button onClick={handlePrev}>⟨</button>
            <h3>{currentGroup}</h3>
            <button onClick={handleNext}>⟩</button>
          </div>
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SwitchTransition>
            <CSSTransition
              key={currentGroup}
              timeout={500}
              classNames="fade-slide"
              nodeRef={nodeRef}
              unmountOnExit

              appear
              in={true}
              onEnter={() => setIsHovered(true)}
              onExited={() => setIsHovered(false)}
            >
              <div className="statisticsInfo">
                <table>
                  <thead>
                    <tr>
                      <th>Club</th>
                      <th>victoires</th>
                      <th>tirages</th>
                      <th>pertes</th>
                      <th>points</th>
                      <th>jouée</th>
                      <th>différences de buts</th>
                      <th>Derniers Matchs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentGroupTeams.map((team) => (
                      <tr key={team.id}>
                        <td>
                          <div>
                            {team.rank}{" "}
                            <div className="imgStatDiv">
                              <img src={team.team_logo} alt="" />
                            </div>{" "}
                            {team.team_name}
                          </div>
                        </td>
                        <td>{team.wins}</td>
                        <td>{team.draws}</td>
                        <td>{team.losses}</td>
                        <td>{team.points}</td>
                        <td>{team.played}</td>
                        <td>{team.goals_diff}</td>
                        <td>
                          {team.form &&
                            team.form.split("").map((item, index) => {
                              return item === "W" ? (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faCircleCheck}
                                  style={{ color: "green", margin: "0 0.5px" }}
                                />
                              ) : item === "L" ? (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faCircleXmark}
                                  style={{ color: "red", margin: "0 0.5px" }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faCircleXmark}
                                  style={{ color: "gray", margin: "0 0.5px" }}
                                />
                              );
                            })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
};

export default ClassementTable;
