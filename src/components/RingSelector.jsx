import React, { useEffect, useState } from "react";
import { getShellType } from "../tools/Calculate";
import { Box, Flex, Tabs } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function RingSelector({
  ringSelected,
  shellTypeIs,
  shellTypeName,
  teamSelected,
}) {
  const [tabValue, setTabValue] = useState(1);

  const getShellTypeRangeTable = getShellType(shellTypeIs, teamSelected);
  const rangeTableList = getShellTypeRangeTable[0]?.rangeTableList;
  const shellName = getShellTypeRangeTable[0]?.round_name;

  const handleRingValue = (data) => {
    if (data.value >= 0) {
      ringSelected({
        ring: data.value,
        min: data.minMaxRange[0],
        max: data.minMaxRange[1],
      });
      shellTypeName(shellName);
    }
  };

  useEffect(() => {
    const teamhasChange = teamSelected === "nato" || "russian";
    if (teamhasChange) {
      const newRange = rangeTableList.filter((d) => d.value === tabValue);
      if (newRange[0]?.value) {
        ringSelected({
          ring: newRange[0].value,
          min: newRange[0].minMaxRange[0],
          max: newRange[0].minMaxRange[1],
        });
        shellTypeName(shellName);
      }
    }
  }, [
    tabValue,
    teamSelected,
    ringSelected,
    rangeTableList,
    shellTypeName,
    shellName,
  ]);
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
          setTabValue(e.value);
        }}
        value={tabValue}
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
  shellTypeName: PropTypes.func,
  teamSelected: PropTypes.string,
};
