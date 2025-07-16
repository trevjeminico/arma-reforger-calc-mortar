import PropTypes from "prop-types";
import { Box, Tabs } from "@chakra-ui/react";
import { MortarShellType } from "../tools/ShellType";
import { ExplosiveIcon, FlareIcon, SmokeIcon } from "./icons/IconsIndex";
import { TEAMBASECOLOR } from "../config";
export default function ShellTypeSelector({ typeSelected, teamSelected }) {
  const { DEFAULT_COLOR: teamColor } = TEAMBASECOLOR;
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
                {key.name === "HE" && (
                  <ExplosiveIcon size="md" color={teamColor[teamSelected]} />
                )}
                {key.name === "SMOKE" && (
                  <SmokeIcon size="lg" color={teamColor[teamSelected]} />
                )}
                {key.name === "ILLUMINATION" && (
                  <FlareIcon size="lg" color={teamColor[teamSelected]} />
                )}
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
  teamSelected: PropTypes.string,
};
