import React, { useState, useContext } from "react";
import { Box, Tabs } from "@chakra-ui/react";
import { TeamSaveDataContext } from "../../../context/TeamSaveDataProvider";
export default function HeaderNav({ selectedTeam }) {
  const [teamColor, setTeamColor] = useState("russian");
  const { setTeam } = useContext(TeamSaveDataContext);
  return (
    <Box w="100%" py="15px" px="35px" mb="15px">
      <Tabs.Root
        variant="subtle"
        fitted
        defaultValue="russian"
        colorPalette={teamColor === "russian" ? "red" : "blue"}
        onValueChange={(e) => {
          setTeamColor(e.value);
          setTeam(e.value);
        }}
      >
        <Tabs.List>
          <Tabs.Trigger value="russian">Russian</Tabs.Trigger>
          <Tabs.Trigger value="nato">Nato</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
}
