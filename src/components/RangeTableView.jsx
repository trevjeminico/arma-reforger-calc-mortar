import React from "react";
import PropTypes from "prop-types";
import { getRangeTableByRing } from "../tools/Calculate";
import { Table } from "@chakra-ui/react";
export default function RangeTableView({ shellType, index }) {
  const wrapToArray = getRangeTableByRing(shellType, index);
  const rangeAndMils = wrapToArray[0]?.range;
  return (
    <>
      {rangeAndMils && (
        <Table.Root size="lg" striped stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Range Data</Table.ColumnHeader>
              <Table.ColumnHeader>{index} Ring</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                {wrapToArray[0].fix_mil} M
              </Table.ColumnHeader>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader textAlign="center">
                Distance (M)
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Elevation (Mils)
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Time</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Time Diff. 100 M
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
      )}
    </>
  );
}

RangeTableView.prototype = {
  index: PropTypes.number,
  shellType: PropTypes.string,
};
