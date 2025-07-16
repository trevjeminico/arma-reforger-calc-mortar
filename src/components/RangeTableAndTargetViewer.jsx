import { useContext } from "react";
import TeamSaveTargetTable from "./TeamSaveTargetTable";
import RangeTableView from "./RangeTableView";
import { Tabs, Box, Button, ButtonGroup } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { TeamSaveDataContext } from "../context/TeamSaveDataProvider";
export default function RangeTableAndTargetViewer({
  index,
  shellType,
  teamSelected,
}) {
  const { teamNatoData, teamSovietData, setTeamNatoData, setTeamSovietData } =
    useContext(TeamSaveDataContext);
  const hasData = teamSelected === "nato" ? teamNatoData : teamSovietData;

  const handleClearData = (e) => {
    e.preventDefault();
    if (teamSelected === "nato") {
      setTeamNatoData([]);
    } else {
      setTeamSovietData([]);
    }
  };

  return (
    <Tabs.Root defaultValue={"saved"}>
      <Tabs.List>
        <Tabs.Trigger value="saved">Saved Target</Tabs.Trigger>
        <Tabs.Trigger value="range">Range Table</Tabs.Trigger>
        <Tabs.Trigger value="document" disabled>
          Documentation
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="saved">
        <Box overflowY="auto" maxH="500px">
          <TeamSaveTargetTable teamSelected={teamSelected} />
        </Box>
        {hasData?.length !== 0 && (
          <ButtonGroup variant="outline" w="100%">
            <Button
              colorPalette={teamSelected === "nato" ? "blue" : "red"}
              mx="auto"
              onClick={handleClearData}
              my={{ base: "25px", lg: "15px" }}
            >
              Clear All
            </Button>
          </ButtonGroup>
        )}
      </Tabs.Content>
      <Tabs.Content value="range">
        {index >= 0 ? (
          <RangeTableView
            index={index}
            shellType={shellType}
            teamSelected={teamSelected}
          />
        ) : (
          <Box p="15px" textAlign="center">
            SELECT A Ring to see the table
          </Box>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}

RangeTableAndTargetViewer.prototype = {
  index: PropTypes.number,
  shellType: PropTypes.string,
  teamSelected: PropTypes.string,
};
