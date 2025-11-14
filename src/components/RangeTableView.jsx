import { useState } from "react";
import PropTypes from "prop-types";
import { getRangeTableByRing, getShellType } from "../tools/ToolKit";
import { Table, Box, Flex, Group } from "@chakra-ui/react";
import { ExplosiveIcon, FlareIcon, SmokeIcon } from "./icons/IconsIndex";
import ShellTypeSelector from "./ShellTypeSelector";
import RingSelector from "./RingSelector";
export default function RangeTableView({ teamSelected }) {
  const [ringValue, setRingValue] = useState(1);
  const [shellType, setShellType] = useState("HE");
  const wrapToArray = getRangeTableByRing(shellType, ringValue, teamSelected);
  const shellNumberOfRings = getShellType(shellType, teamSelected);
  const rangeAndMils = wrapToArray[0]?.range;
  return (
    <>
      <Box w="100%" textAlign={"center"}>
        <Group>
          <Box>
            <ShellTypeSelector
              typeSelected={setShellType}
              teamSelected={teamSelected}
            />
          </Box>
          <Box>
            <RingSelector
              ringSelected={setRingValue}
              teamSelected={teamSelected}
              ringData={shellNumberOfRings}
            />
          </Box>
        </Group>
      </Box>
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
            round ({ringValue} RINGS)
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
          NO {ringValue} RING FOR {shellType} please select other rings
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
