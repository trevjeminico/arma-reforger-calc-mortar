import { useState, createContext } from "react";

export const TeamSaveDataContext = createContext();

export const TeamSaveDataProvider = ({ children }) => {
  const [teamNatoData, setTeamNatoData] = useState([]);
  const [teamSovietData, setTeamSovietData] = useState([]);
  const [team, setTeam] = useState("russian");
  const teamValue = {
    team,
    teamSovietData,
    teamNatoData,
    setTeamNatoData,
    setTeamSovietData,
    setTeam,
  };
  return (
    <TeamSaveDataContext.Provider value={teamValue}>
      {children}
    </TeamSaveDataContext.Provider>
  );
};
