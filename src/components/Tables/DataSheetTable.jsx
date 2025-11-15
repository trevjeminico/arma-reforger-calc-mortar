import PropTypes from "prop-types";
import { Table, Spinner } from "@chakra-ui/react";
import { MortarIcon, TimeIcon } from "../icons/IconsIndex";
export default function DataSheetTable({ item, defaultTeamColor, isLoading }) {
  return (
    <Table.Root size="sm" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader color={defaultTeamColor} textAlign="center">
            Ring #
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">
            <MortarIcon
              size={{ base: "lg", lg: "md" }}
              mt="4.5%"
              color={defaultTeamColor}
            />
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">
            <TimeIcon
              size={{ base: "lg", lg: "md" }}
              mt="4.5%"
              color={defaultTeamColor}
            />
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {item?.map((key) => (
          <Table.Row
            key={key?.value}
            textAlign="center"
            color={defaultTeamColor}
          >
            <Table.Cell textAlign="center">{key?.value}</Table.Cell>
            <Table.Cell textAlign="center">
              {isLoading ? (
                <Spinner size="md" mt="5%" />
              ) : (
                <>{key?.result?.elevationTotal || "N/A"}</>
              )}
            </Table.Cell>
            <Table.Cell textAlign="center">
              {isLoading ? (
                <Spinner size="md" mt="5%" />
              ) : (
                <>{key?.result?.timeOfFlight || "N/A"}</>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

DataSheetTable.prototype = {
  item: PropTypes.obj,
  isLoading: PropTypes.bool,
  defaultTeamColor: PropTypes.string,
};
