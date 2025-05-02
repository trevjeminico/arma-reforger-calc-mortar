import React from "react";
import { Table, Button, Box } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { ExplosiveIcon, FlareIcon, SmokeIcon } from "./icons/IconsIndex";
export default function TeamSaveTargetTable({
  teamSaveData,
  handleRemove,
  teamSelected,
}) {
  console.log(teamSelected);
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
        <Table.ScrollArea borderWidth="1px" maxH="250px">
          <Table.Root size="lg" stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign="center">
                  Target #
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Degree
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Elevation
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Ring</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Round Type
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  Remove
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {teamSaveData.map((key, i) => {
                return (
                  <Table.Row
                    key={i}
                    bg={{
                      base: teamSelected === "nato" ? "blue.200" : "red.200",
                    }}
                  >
                    <Table.Cell textAlign="center">{key.name}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {key.deg}
                      <span>&#176;</span>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{key.elev} mil</Table.Cell>
                    <Table.Cell textAlign="center">{key.ring}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {key.type === "HE" && <ExplosiveIcon size="md" />}
                      {key.type === "SMOKE" && <SmokeIcon size="lg" />}
                      {key.type === "ILLUMINATION" && <FlareIcon size="lg" />}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        onClick={handleRemove}
                        colorPalette="red"
                        value={key.name}
                        size="sm"
                      >
                        x
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}
    </>
  );
}

TeamSaveTargetTable.prototype = {
  teamSaveData: PropTypes.array,
  handleRemove: PropTypes.func,
  teamSelected: PropTypes.string,
};
