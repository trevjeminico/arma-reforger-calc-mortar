import { useContext } from "react";
import {
  Box,
  Tabs,
  Flex,
  Heading,
  useBreakpointValue,
  ScrollArea,
} from "@chakra-ui/react";
import { TeamSaveDataContext } from "../../context/TeamSaveDataProvider";
import { TEAMBASECOLOR } from "../../config";
import TeamSavedViewDetails from "./TeamSavedViewDetails";
export default function TeamSavedTargetWrapper() {
  const { teamNatoData, teamSovietData, team } =
    useContext(TeamSaveDataContext);
  const teamShow = team === "nato" ? teamNatoData : teamSovietData;
  const { DEFAULT_COLOR: teamColor } = TEAMBASECOLOR;
  const defaultTeamColor = teamColor[team];
  const orientation = useBreakpointValue({
    base: "horizontal",
    lg: "vertical",
  });

  return (
    <>
      {teamShow.length > 0 ? (
        <>
          <Box p="15px">
            <Tabs.Root variant="subtle" orientation={orientation}>
              <ScrollArea.Root w={{ base: "100%", lg: "30%" }}>
                <ScrollArea.Viewport>
                  <ScrollArea.Content>
                    <Tabs.List overflow={"auto"} w="100%">
                      {teamShow.map((item) => (
                        <Tabs.Trigger value={item.id} key={item.id}>
                          <Flex>
                            <Box m="auto" color={defaultTeamColor}>
                              {item.tName}
                            </Box>
                          </Flex>
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation={orientation} />
                <ScrollArea.Corner />
              </ScrollArea.Root>

              <Tabs.ContentGroup
                ml={{ base: "0", lg: "15px" }}
                mt={{ base: "5px", lg: "0" }}
                w="100%"
              >
                {teamShow.map((item) => (
                  <Tabs.Content
                    value={item.id}
                    key={item.id}
                    borderWidth={1}
                    w="100%"
                    p="15px"
                  >
                    <Box color={defaultTeamColor}>
                      Degree / Mils : {item.tMilDeg}
                    </Box>
                    <TeamSavedViewDetails dataItems={item} />
                  </Tabs.Content>
                ))}
              </Tabs.ContentGroup>
            </Tabs.Root>
          </Box>
        </>
      ) : (
        <>
          <Box p="25px" textAlign={"center"} w="100%">
            <Heading>NO DATA</Heading>
          </Box>
        </>
      )}
    </>
  );
}
