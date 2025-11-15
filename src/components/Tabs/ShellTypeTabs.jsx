import { Tabs, useBreakpointValue, Group, Box } from "@chakra-ui/react";

import { ExplosiveIcon, FlareIcon, SmokeIcon } from "../icons/IconsIndex";
import { MortarShellType } from "../../tools/ShellType";

import DataSheetTable from "../Tables/DataSheetTable";

export default function ShellTypeTabs({
  defaultTeamColor,
  roundNames,
  explosiveResult,
  smokeResult,
  illuminationResult,
  isLoading,
}) {
  const orientation = useBreakpointValue({
    base: "horizontal",
    lg: "vertical",
  });

  return (
    <Tabs.Root
      variant="subtle"
      defaultValue="HE"
      orientation={orientation}
      color={defaultTeamColor}
    >
      <Tabs.List>
        {MortarShellType.map((key, index) => {
          return (
            <Tabs.Trigger value={key.name} key={index}>
              {key.name === "HE" && (
                <ExplosiveIcon size="md" color={defaultTeamColor} />
              )}
              {key.name === "SMOKE" && (
                <SmokeIcon size="lg" color={defaultTeamColor} />
              )}
              {key.name === "ILLUMINATION" && (
                <FlareIcon size="lg" color={defaultTeamColor} />
              )}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      <Tabs.Content value="HE" w="100%">
        <Group>
          <Box borderRightWidth="1px" px="15px">
            Name: {roundNames.HE}
          </Box>
          <Box px="15px">Type: Explosive</Box>
        </Group>
        <DataSheetTable
          item={explosiveResult}
          defaultTeamColor={defaultTeamColor}
          isLoading={isLoading}
        />
      </Tabs.Content>

      <Tabs.Content value="SMOKE" w="100%">
        <Group>
          <Box borderRightWidth="1px" px="15px">
            Name: {roundNames.smoke}
          </Box>
          <Box px="15px">Type: Smoke</Box>
        </Group>
        <DataSheetTable
          item={smokeResult}
          defaultTeamColor={defaultTeamColor}
          isLoading={isLoading}
        />
      </Tabs.Content>

      <Tabs.Content value="ILLUMINATION" w="100%">
        <Group>
          <Box borderRightWidth="1px" px="15px">
            Name: {roundNames.illu}
          </Box>
          <Box px="15px">Type: Illumination</Box>
        </Group>
        <DataSheetTable
          item={illuminationResult}
          defaultTeamColor={defaultTeamColor}
          isLoading={isLoading}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}
