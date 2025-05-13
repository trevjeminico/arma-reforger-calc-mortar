import React from "react";
import {
  Heading,
  Box,
  Card,
  Grid,
  GridItem,
  Stat,
  HStack,
  Span,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  ExplosiveIcon,
  FlareIcon,
  SmokeIcon,
  CompassIcon,
  TargetIcon,
  AltitudeIcon,
} from "./icons/IconsIndex";

export default function TeamSaveTargetTable({ teamSaveData, teamSelected }) {
  return (
    <>
      {teamSaveData?.length === 0 ? (
        <Box
          textAlign="center"
          p="15px"
          color={{ base: teamSelected === "nato" ? "blue.500" : "red.500" }}
          textTransform="uppercase"
        >
          no target saved {teamSelected}
        </Box>
      ) : (
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          padding={{ base: "15px" }}
          gap="5"
        >
          {teamSaveData?.map((key, i) => {
            return (
              <GridItem key={i}>
                <Card.Root
                  color={key.team === "nato" ? "blue.500" : "red.500"}
                  size="sm"
                >
                  <Card.Header>
                    <Heading size="md">
                      <TargetIcon
                        size="sm"
                        color={key.team === "nato" ? "blue.500" : "red.500"}
                      />
                      Target #: {key.name} - {key.ring} Ring
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <Stat.Root>
                      <Stat.Label>
                        {key.type} Round baring {key.targetMils} Mils{" "}
                        <CompassIcon
                          size="lg"
                          color={key.team === "nato" ? "blue.500" : "red.500"}
                        />
                      </Stat.Label>
                      <HStack>
                        <Stat.ValueText>
                          Elevation: {key.elev}(M)
                        </Stat.ValueText>
                      </HStack>
                      <Stat.HelpText>
                        <AltitudeIcon
                          size="lg"
                          color={key.team === "nato" ? "blue.500" : "red.500"}
                        />
                        <Span>Altitude Difference of {key.altDiff} (M)</Span>
                      </Stat.HelpText>
                    </Stat.Root>
                  </Card.Body>
                  <Card.Footer>
                    {key.type === "HE" && (
                      <ExplosiveIcon
                        size="lg"
                        color={key.team === "nato" ? "blue.500" : "red.500"}
                      />
                    )}
                    {key.type === "SMOKE" && (
                      <SmokeIcon
                        size="lg"
                        color={key.team === "nato" ? "blue.500" : "red.500"}
                      />
                    )}
                    {key.type === "ILLUMINATION" && (
                      <FlareIcon
                        size="lg"
                        color={key.team === "nato" ? "blue.500" : "red.500"}
                      />
                    )}
                  </Card.Footer>
                </Card.Root>
              </GridItem>
            );
          })}
        </Grid>
      )}
    </>
  );
}

TeamSaveTargetTable.prototype = {
  teamSaveData: PropTypes.array,
  teamSelected: PropTypes.string,
};
