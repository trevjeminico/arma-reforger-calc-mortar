import React from "react";

import { TeamSaveDataProvider, MortarDataProvider } from "./context";
import Layout from "./Layout";

function App() {
  return (
    <MortarDataProvider>
      <TeamSaveDataProvider>
        <Layout />
      </TeamSaveDataProvider>
    </MortarDataProvider>
  );
}

export default App;
