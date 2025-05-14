import React from "react";
import { Box, Table } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  ExplosiveIcon,
  FlareIcon,
  SmokeIcon,
  CompassIcon,
  TargetIcon,
  AltitudeIcon,
  MortarIcon,
  MapIcon,
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
        <Box>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign="center">
                  <TargetIcon
                    size="lg"
                    color={{
                      base: teamSelected === "nato" ? "blue.500" : "red.500",
                    }}
                  />
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Ring</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  <MortarIcon
                    size="lg"
                    color={{
                      base: teamSelected === "nato" ? "blue.500" : "red.500",
                    }}
                  />
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  <CompassIcon
                    size="lg"
                    color={{
                      base: teamSelected === "nato" ? "blue.500" : "red.500",
                    }}
                  />
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  <MapIcon
                    size="lg"
                    color={{
                      base: teamSelected === "nato" ? "blue.500" : "red.500",
                    }}
                  />
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  <AltitudeIcon
                    size="lg"
                    color={{
                      base: teamSelected === "nato" ? "blue.500" : "red.500",
                    }}
                  />
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            {teamSaveData?.map((key, i) => {
              return (
                <Table.Body
                  color={key.team === "nato" ? "blue.500" : "red.500"}
                >
                  <Table.Row>
                    <Table.Cell textAlign="center">{key.name}</Table.Cell>
                    <Table.Cell textAlign="center">{key.ring}</Table.Cell>
                    <Table.Cell textAlign="center">
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
                      {key.roundName}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{key.targetMils}</Table.Cell>
                    <Table.Cell textAlign="center">{key.elev}</Table.Cell>
                    <Table.Cell textAlign="center">{key.altDiff}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table.Root>
        </Box>
      )}
    </>
  );
}

TeamSaveTargetTable.prototype = {
  teamSaveData: PropTypes.array,
  teamSelected: PropTypes.string,
};
