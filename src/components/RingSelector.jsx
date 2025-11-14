import PropTypes from "prop-types";
import { Box, Tabs } from "@chakra-ui/react";

import { TEAMBASECOLOR } from "../config";
export default function RingSelector({ ringSelected, teamSelected, ringData }) {
  const { DEFAULT_COLOR: teamColor } = TEAMBASECOLOR;
  const defaultTeamColor = teamColor[teamSelected];
  const { rangeTableList } = ringData[0];
  return (
    <Box my="15px">
      <Tabs.Root
        variant="subtle"
        onValueChange={(e) => {
          ringSelected(e.value);
        }}
        defaultValue="1"
        size="sm"
      >
        <Tabs.List>
          {rangeTableList.map((key, index) => {
            return (
              <Tabs.Trigger
                value={key.value}
                key={index}
                color={defaultTeamColor}
              >
                {key.value}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
}

RingSelector.prototype = {
  typeSelected: PropTypes.func,
  teamSelected: PropTypes.string,
  ringData: PropTypes.any,
};
