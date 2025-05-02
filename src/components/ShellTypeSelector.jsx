import React from "react";
import PropTypes from "prop-types";
import { Box, Tabs } from "@chakra-ui/react";
import { MortarShellType } from "../tools/ShellType";
import { ExplosiveIcon, FlareIcon, SmokeIcon } from "./icons/IconsIndex";
export default function ShellTypeSelector({ typeSelected }) {
  return (
    <Box my="15px">
      <Tabs.Root
        fitted
        onValueChange={(e) => {
          typeSelected(e.value);
        }}
        defaultValue="HE"
      >
        <Tabs.List>
          {MortarShellType.map((key, index) => {
            return (
              <Tabs.Trigger value={key.name} key={index}>
                {key.name === "HE" && <ExplosiveIcon size="md" />}
                {key.name === "SMOKE" && <SmokeIcon size="lg" />}
                {key.name === "ILLUMINATION" && <FlareIcon size="lg" />}
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
