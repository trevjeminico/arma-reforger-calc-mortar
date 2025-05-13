import React from "react";
import TeamSaveTargetTable from "./TeamSaveTargetTable";
import RangeTableView from "./RangeTableView";
import { Tabs, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function RangeTableAndTargetViewer({
  index,
  shellType,
  teamSelected,
  targetRange,
}) {
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
          <TeamSaveTargetTable
            teamSaveData={targetRange}
            teamSelected={teamSelected}
          />
        </Box>
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
  targetRange: PropTypes.any,
};
