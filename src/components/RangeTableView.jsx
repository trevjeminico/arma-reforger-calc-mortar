import React from "react";
import PropTypes from "prop-types";
import { getRangeTableByRing } from "../tools/Calculate";
import { Table, Box, Flex } from "@chakra-ui/react";
import { ExplosiveIcon, FlareIcon, SmokeIcon } from "./icons/IconsIndex";
export default function RangeTableView({ shellType, index, teamSelected }) {
  const wrapToArray = getRangeTableByRing(shellType, index, teamSelected);
  const rangeAndMils = wrapToArray[0]?.range;
  return (
    <>
      <Box py="15px" px="20px" borderBottomWidth="1px">
        <Flex flexWrap="wrap" direction="row" justify="space-between">
          <Box
            py="5px"
            textStyle={{ base: "md", lg: "lg" }}
            fontWeight="medium"
          >
            {shellType === "HE" && (
              <ExplosiveIcon
                size="md"
                color={teamSelected === "nato" ? "blue.500" : "red.500"}
              />
            )}
            {shellType === "SMOKE" && (
              <SmokeIcon
                size="lg"
                color={teamSelected === "nato" ? "blue.500" : "red.500"}
              />
            )}
            {shellType === "ILLUMINATION" && (
              <FlareIcon
                size="lg"
                color={teamSelected === "nato" ? "blue.500" : "red.500"}
              />
            )}{" "}
            round ({index} RINGS)
          </Box>
          {rangeAndMils && (
            <Box
              textAlign="end"
              py="5px"
              pl="15px"
              textStyle={{ base: "md", lg: "lg" }}
              fontWeight="medium"
              borderLeftWidth="1px"
            >
              Avg. D {wrapToArray[0].fix_mil} M
            </Box>
          )}
        </Flex>
      </Box>

      {rangeAndMils ? (
        <Table.ScrollArea maxH="480px" overflow="auto">
          <Table.Root size="lg" striped stickyHeader>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  textAlign="center"
                  textStyle={{ base: "sm", lg: "md" }}
                >
                  Range (M)
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  textStyle={{ base: "sm", lg: "md" }}
                >
                  Elevation (MIL)
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  textStyle={{ base: "sm", lg: "md" }}
                >
                  Time of Flight (SEC)
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rangeAndMils.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell textAlign="center">{item.r}</Table.Cell>
                  <Table.Cell textAlign="center">{item.mils}</Table.Cell>
                  <Table.Cell textAlign="center">{item.time}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      ) : (
        <Box
          textAlign="center"
          p="15px"
          color="red"
          fontWeight="medium"
          textTransform="uppercase"
        >
          NO {index} RING FOR {shellType} please select other rings
        </Box>
      )}
    </>
  );
}

RangeTableView.prototype = {
  index: PropTypes.number,
  shellType: PropTypes.string,
  teamSelected: PropTypes.string,
};
