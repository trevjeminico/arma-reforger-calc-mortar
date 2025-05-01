import React from "react";
import PropTypes from "prop-types";
import { Box, Tabs } from "@chakra-ui/react";
import { MortarShellType } from "../tools/ShellType";
export default function ShellTypeSelector({ typeSelected }) {
  return (
    <Box my="15px">
      <Tabs.Root
        fitted
        onValueChange={(e) => {
          typeSelected(e.value);
        }}
      >
        <Tabs.List>
          {MortarShellType.map((key, index) => {
            return (
              <Tabs.Trigger value={key.name} key={index}>
                {key.name}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs.Root>
    </Box>
  );
}

ShellTypeSelector.prototype = {
  typeSelected: PropTypes.func,
};
