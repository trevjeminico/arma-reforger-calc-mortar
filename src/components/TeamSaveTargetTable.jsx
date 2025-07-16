import React, { useContext } from "react";
import { Box, Button, Table } from "@chakra-ui/react";
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

import { TeamSaveDataContext } from "../context/TeamSaveDataProvider";

export default function TeamSaveTargetTable({ teamSelected }) {
  const { teamNatoData, teamSovietData, setTeamSovietData, setTeamNatoData } =
    useContext(TeamSaveDataContext);
  const hasData = teamSelected === "nato" ? teamNatoData : teamSovietData;

  const HandleRemoveItem = (id) => {
    const teamDataIndexRemoveArray =
      teamSelected !== "nato" ? teamSovietData : teamNatoData;
    const teamNewArray = teamDataIndexRemoveArray.filter(
      (item, index) => index !== id
    );
    if (teamSelected !== "nato") {
      setTeamSovietData(teamNewArray);
    } else {
      setTeamNatoData(teamNewArray);
    }
  };

  return (
    <>
      {hasData?.length === 0 ? (
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
                <Table.ColumnHeader
                  textAlign="center"
                  color={{
                    base: teamSelected === "nato" ? "blue.500" : "red.500",
                  }}
                >
                  Ring
                </Table.ColumnHeader>
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
                <Table.ColumnHeader
                  textAlign="center"
                  color={{
                    base: teamSelected === "nato" ? "blue.500" : "red.500",
                  }}
                >
                  Action
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            {hasData?.map((key, i) => {
              return (
                <Table.Body
                  color={teamSelected === "nato" ? "blue.500" : "red.500"}
                  key={i}
                >
                  <Table.Row>
                    <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                    <Table.Cell textAlign="center">{key.ring}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {key.type === "HE" && (
                        <ExplosiveIcon
                          size="lg"
                          color={
                            teamSelected === "nato" ? "blue.500" : "red.500"
                          }
                        />
                      )}
                      {key.type === "SMOKE" && (
                        <SmokeIcon
                          size="lg"
                          color={
                            teamSelected === "nato" ? "blue.500" : "red.500"
                          }
                        />
                      )}
                      {key.type === "ILLUMINATION" && (
                        <FlareIcon
                          size="lg"
                          color={
                            teamSelected === "nato" ? "blue.500" : "red.500"
                          }
                        />
                      )}
                      {key.roundName}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{key.targetMils}</Table.Cell>
                    <Table.Cell textAlign="center">{key.elev}</Table.Cell>
                    <Table.Cell textAlign="center">{key.altDiff}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        onClick={() => {
                          HandleRemoveItem(i);
                        }}
                        colorPalette={teamSelected === "nato" ? "blue" : "red"}
                        variant="outline"
                      >
                        X
                      </Button>
                    </Table.Cell>
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
