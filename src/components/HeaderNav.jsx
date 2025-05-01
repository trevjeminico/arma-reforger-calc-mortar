import React, { useState } from "react";
import { Box, Tabs } from "@chakra-ui/react";
import PropTypes from "prop-types";
export default function HeaderNav({ selectedTeam }) {
  const [teamColor, setTeamColor] = useState("russian");

  return (
    <Box w="100%" py="15px" px="35px" mb="15px">
      <Tabs.Root
        variant="subtle"
        fitted
        defaultValue="russian"
        colorPalette={teamColor === "russian" ? "red" : "blue"}
        onValueChange={(e) => {
          setTeamColor(e.value);
          selectedTeam(e.value);
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

HeaderNav.prototype = {
  selectedTeam: PropTypes.any,
};
