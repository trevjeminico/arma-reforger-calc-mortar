import RangeTableView from "./RangeTableView";
import { Tabs, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import TeamSavedTargetWrapper from "./TeamSavedTarget/TeamSavedTargetWrapper";
export default function RangeTableAndTargetViewer({
  index,
  shellType,
  teamSelected,
}) {
  return (
    <Tabs.Root defaultValue={"saved"}>
      <Tabs.List>
        <Tabs.Trigger value="saved">Saved Target</Tabs.Trigger>
        <Tabs.Trigger value="range">Range Table</Tabs.Trigger>
        <Tabs.Trigger value="doc" disabled>
          Documentation
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="saved">
        <TeamSavedTargetWrapper />
      </Tabs.Content>
      <Tabs.Content value="range">
        <RangeTableView
          index={index}
          shellType={shellType}
          teamSelected={teamSelected}
        />
      </Tabs.Content>
      <Tabs.Content value="doc" py="15px">
        <Box textAlign="center">link to documentation</Box>
      </Tabs.Content>
    </Tabs.Root>
  );
}

RangeTableAndTargetViewer.prototype = {
  index: PropTypes.number,
  shellType: PropTypes.string,
  teamSelected: PropTypes.string,
};
