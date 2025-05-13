import React from "react";
import { Heading, Box, Card, Grid, GridItem, Table } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  ExplosiveIcon,
  FlareIcon,
  SmokeIcon,
  CompassIcon,
  TargetIcon,
  AltitudeIcon,
  MortarIcon,
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
                    <Table.Root>
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader textAlign="center">
                            Shell Type
                          </Table.ColumnHeader>
                          <Table.ColumnHeader textAlign="center">
                            <CompassIcon
                              size="lg"
                              color={
                                key.team === "nato" ? "blue.500" : "red.500"
                              }
                            />
                          </Table.ColumnHeader>
                          <Table.ColumnHeader textAlign="center">
                            <MortarIcon
                              size="lg"
                              color={
                                key.team === "nato" ? "blue.500" : "red.500"
                              }
                            />
                          </Table.ColumnHeader>
                          <Table.ColumnHeader textAlign="center">
                            <AltitudeIcon
                              size="lg"
                              color={
                                key.team === "nato" ? "blue.500" : "red.500"
                              }
                            />
                          </Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell textAlign="center">
                            {key.type === "HE" && (
                              <ExplosiveIcon
                                size="lg"
                                color={
                                  key.team === "nato" ? "blue.500" : "red.500"
                                }
                              />
                            )}
                            {key.type === "SMOKE" && (
                              <SmokeIcon
                                size="lg"
                                color={
                                  key.team === "nato" ? "blue.500" : "red.500"
                                }
                              />
                            )}
                            {key.type === "ILLUMINATION" && (
                              <FlareIcon
                                size="lg"
                                color={
                                  key.team === "nato" ? "blue.500" : "red.500"
                                }
                              />
                            )}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.targetMils}
                          </Table.Cell>
                          <Table.Cell textAlign="center">{key.elev}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.altDiff}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table.Root>
                  </Card.Body>
                  <Card.Footer />
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
