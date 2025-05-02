import React from "react";
import PropTypes from "prop-types";
import { getRangeTableByRing } from "../tools/Calculate";
import { Table, Box, Flex } from "@chakra-ui/react";
import { MortarIcon } from "./icons/IconsIndex";
export default function RangeTableView({ shellType, index, teamSelected }) {
  const wrapToArray = getRangeTableByRing(shellType, index, teamSelected);
  const rangeAndMils = wrapToArray[0]?.range;
  return (
    <>
      <Box py="15px" px="20px" borderBottomWidth="1px">
        <Flex flexWrap="wrap" direction="row" justify="space-between">
          <Box py="5px" pl="15px" textStyle="lg" fontWeight="medium">
            {shellType} round ({index} RINGS)
            <MortarIcon size="xl" />
          </Box>
          {rangeAndMils && (
            <Box
              textAlign="end"
              py="5px"
              pl="15px"
              textStyle="lg"
              fontWeight="medium"
              borderLeftWidth="1px"
            >
              Average Dispersion {wrapToArray[0].fix_mil} M
            </Box>
          )}
        </Flex>
      </Box>

      {rangeAndMils ? (
        <Table.Root size="lg" striped stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader textAlign="center">
                Range (M)
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Elevation (MIL)
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Time of Flight (SEC)
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Time of Flight per 100 M DR (SEC)
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rangeAndMils.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="center">{item.r}</Table.Cell>
                <Table.Cell textAlign="center">{item.mils}</Table.Cell>
                <Table.Cell textAlign="center">{item.time}</Table.Cell>
                <Table.Cell textAlign="center">{item.timeDiff}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
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
