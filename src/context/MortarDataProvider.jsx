import React, { createContext, useState } from "react";

export const MortarDataContext = createContext("");

export const MortarDataProvider = ({ children }) => {
  const [hasRangeValues, setHasRangeValues] = useState(0);
  const [hasRingValues, setHasRingValues] = useState({});
  const [shellType, setShellType] = useState("HE");
  const [shellTypeName, setShellTypeName] = useState("");
  const [targetRange, setTargetRange] = useState([]);

  const [targetAltDiff, setTargetAltDiff] = useState(0);
  const value = {
    hasRangeValues,
    hasRingValues,
    shellType,
    shellTypeName,
    targetRange,
    targetAltDiff,
    setTargetAltDiff,
    setTargetRange,
    setShellTypeName,
    setShellType,
    setHasRingValues,
    setHasRangeValues,
  };
  return (
    <MortarDataContext.Provider value={value}>
      {children}
    </MortarDataContext.Provider>
  );
};
