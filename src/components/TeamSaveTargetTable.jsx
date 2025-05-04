import React from "react";
import {
  Accordion,
  Span,
  Button,
  Box,
  AbsoluteCenter,
  Stat,
  HStack,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  ExplosiveIcon,
  FlareIcon,
  SmokeIcon,
  CompassIcon,
  TargetIcon,
} from "./icons/IconsIndex";

function TeamDataListWrapper({ data, teamSelected }) {
  return (
    <Stat.Root>
      {data?.map((key, i) => {
        return (
          <div key={i}>
            <HStack justify="space-between">
              <Stat.Label fontSize="lg">Ring {key.ring}</Stat.Label>
              {key.type === "HE" && (
                <ExplosiveIcon
                  size="lg"
                  color={teamSelected === "nato" ? "blue.500" : "red.500"}
                />
              )}
              {key.type === "SMOKE" && (
                <SmokeIcon
                  size="lg"
                  color={teamSelected === "nato" ? "blue.500" : "red.500"}
                />
              )}
              {key.type === "ILLUMINATION" && (
                <FlareIcon
                  size="lg"
                  color={teamSelected === "nato" ? "blue.500" : "red.500"}
                />
              )}
            </HStack>
            <HStack>
              <Stat.ValueText>Elevation: {key.elev} Mils</Stat.ValueText>
            </HStack>
          </div>
        );
      })}
    </Stat.Root>
  );
}

export default function TeamSaveTargetTable({
  teamSaveData,
  handleRemove,
  teamSelected,
}) {
  return (
    <>
      {teamSaveData.length === 0 ? (
        <Box
          textAlign="center"
          p="15px"
          color={{ base: teamSelected === "nato" ? "blue.500" : "red.500" }}
          textTransform="uppercase"
        >
          no target saved {teamSelected}
        </Box>
      ) : (
        <Accordion.Root collapsible variant="enclosed">
          {teamSaveData.map((key, i) => {
            return (
              <Accordion.Item key={i} value={key.name} p="15px">
                <Box position="relative">
                  <Accordion.ItemTrigger>
                    <Span flex="1">
                      <HStack>
                        <TargetIcon
                          size="lg"
                          color={
                            teamSelected === "nato" ? "blue.500" : "red.500"
                          }
                        />
                        <Text>: {key.name}</Text>
                        <CompassIcon
                          size="lg"
                          color={
                            teamSelected === "nato" ? "blue.500" : "red.500"
                          }
                        />
                        <Text>
                          : {key.deg}
                          <span>&#176;</span>
                        </Text>
                      </HStack>
                    </Span>
                    <Accordion.ItemIndicator />
                  </Accordion.ItemTrigger>
                  <AbsoluteCenter axis="vertical" insetEnd="0">
                    <Button
                      onClick={handleRemove}
                      colorPalette="red"
                      value={key.name}
                      size="sm"
                    >
                      x
                    </Button>
                  </AbsoluteCenter>
                </Box>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <TeamDataListWrapper
                      data={[key]}
                      teamSelected={teamSelected}
                    />
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      )}
    </>
  );
}

TeamSaveTargetTable.prototype = {
  teamSaveData: PropTypes.array,
  handleRemove: PropTypes.func,
  teamSelected: PropTypes.string,
};
