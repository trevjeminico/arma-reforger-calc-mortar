import React from "react";
import { getShellType } from "../tools/Calculate";
import { Box, Flex, Tabs } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function RingSelector({
  ringSelected,
  shellTypeIs,
  teamSelected,
}) {
  const handleRingValue = (data) => {
    ringSelected({
      ring: data.value,
      min: data.minMaxRange[0],
      max: data.minMaxRange[1],
    });
  };

  const getShellTypeRangeTable = getShellType(shellTypeIs, teamSelected);
  const rangeTableList = getShellTypeRangeTable[0]?.rangeTableList;
  return (
    <Flex gap="4" justify="center" align="center">
      <Box>RING:</Box>
      <Tabs.Root
        variant="enclosed"
        w="100%"
        fitted
        onValueChange={(e) => {
          const rangeValue = rangeTableList.filter((d) => d.value === e.value);
          handleRingValue(rangeValue[0]);
        }}
      >
        <Tabs.List>
          {rangeTableList?.map((key) => {
            return (
              <Tabs.Trigger value={key.value} key={key.value}>
                {key.value}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs.Root>
    </Flex>
  );
}

RingSelector.prototype = {
  ringSelected: PropTypes.func,
  shellTypeIs: PropTypes.string,
  teamSelected: PropTypes.string,
};
