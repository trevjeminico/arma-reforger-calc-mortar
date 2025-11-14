import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Tabs,
  Table,
  Spinner,
  useBreakpointValue,
  Group,
  Box,
  Button,
  ButtonGroup,
  Field,
  Input,
  Flex,
} from "@chakra-ui/react";
import { getRangeResultByShellType } from "../tools/ToolKit";
import { TEAMBASECOLOR } from "../config";
import {
  MortarIcon,
  TimeIcon,
  ExplosiveIcon,
  FlareIcon,
  SmokeIcon,
} from "./icons/IconsIndex";
import { MortarShellType } from "../tools/ShellType";
function ResultTableData({ item, defaultTeamColor, isLoading }) {
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

export default function RangeCalculatorDataSheet({
  altDiff,
  isLoading,
  rangeValue,
  teamSelected,
  setIsLoading,
}) {
  const [explosiveResult, setExplosiveResult] = useState([]);
  const [smokeResult, setSmokeResult] = useState([]);
  const [illuminationResult, setIlluminationResult] = useState([]);
  const [roundNames, setRoundNames] = useState({});
  const [showSaveOpt, setShowSaveOpt] = useState(false);
  const { DEFAULT_COLOR: teamColor } = TEAMBASECOLOR;
  const defaultTeamColor = teamColor[teamSelected];

  useEffect(() => {
    const handleResult = () => {
      const { result: result1, roundName: roundNameHE } =
        getRangeResultByShellType("HE", rangeValue, altDiff, teamSelected);
      const { result: result2, roundName: roundNameSmoke } =
        getRangeResultByShellType("smoke", rangeValue, altDiff, teamSelected);
      const { result: result3, roundName: roundNameIllu } =
        getRangeResultByShellType(
          "illumination",
          rangeValue,
          altDiff,
          teamSelected
        );

      if (result1?.length > 0) {
        setExplosiveResult(result1);
        setSmokeResult(result2);
        setIlluminationResult(result3);
        setRoundNames({
          HE: roundNameHE,
          smoke: roundNameSmoke,
          illu: roundNameIllu,
        });
      }
    };
    handleResult();

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [rangeValue, altDiff, teamSelected, setIsLoading]);

  const orientation = useBreakpointValue({
    base: "horizontal",
    lg: "vertical",
  });

  return (
    <>
      <h3>Data Sheet:</h3>

      <Tabs.Root
        variant="subtle"
        defaultValue="HE"
        orientation={orientation}
        color={defaultTeamColor}
      >
        <Tabs.List>
          {MortarShellType.map((key, index) => {
            return (
              <Tabs.Trigger value={key.name} key={index}>
                {key.name === "HE" && (
                  <ExplosiveIcon size="md" color={defaultTeamColor} />
                )}
                {key.name === "SMOKE" && (
                  <SmokeIcon size="lg" color={defaultTeamColor} />
                )}
                {key.name === "ILLUMINATION" && (
                  <FlareIcon size="lg" color={defaultTeamColor} />
                )}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>

        <Tabs.Content value="HE" w="100%">
          <Group>
            <Box borderRightWidth="1px" px="15px">
              Type: Explosive
            </Box>
            <Box px="15px">Name: {roundNames.HE}</Box>
          </Group>
          <ResultTableData
            item={explosiveResult}
            defaultTeamColor={defaultTeamColor}
            isLoading={isLoading}
          />
        </Tabs.Content>

        <Tabs.Content value="SMOKE" w="100%">
          <Group>
            <Box borderRightWidth="1px" px="15px">
              Type: Smoke
            </Box>
            <Box px="15px">Name: {roundNames.smoke}</Box>
          </Group>
          <ResultTableData
            item={smokeResult}
            defaultTeamColor={defaultTeamColor}
            isLoading={isLoading}
          />
        </Tabs.Content>

        <Tabs.Content value="ILLUMINATION" w="100%">
          <Group>
            <Box borderRightWidth="1px" px="15px">
              Type: Illumination
            </Box>
            <Box px="15px">Name: {roundNames.illu}</Box>
          </Group>
          <ResultTableData
            item={illuminationResult}
            defaultTeamColor={defaultTeamColor}
            isLoading={isLoading}
          />
        </Tabs.Content>
      </Tabs.Root>
      <Box textAlign="center" mt="15px">
        {!showSaveOpt ? (
          <Button onClick={() => setShowSaveOpt(true)}>
            Saved This Data Sheet?
          </Button>
        ) : (
          <>
            <Flex gap="3" direction="row">
              <Field.Root>
                <Field.Label>Target Name:</Field.Label>
                <Input placeholder="" />
              </Field.Root>
              <Field.Root>
                <Field.Label>Target in Mil / Degree:</Field.Label>
                <Input placeholder="" />
              </Field.Root>
            </Flex>
            <ButtonGroup mt="15px">
              <Button>confirm save</Button>
              <Button onClick={() => setShowSaveOpt(false)}>cancel</Button>
            </ButtonGroup>
          </>
        )}
      </Box>
    </>
  );
}

RangeCalculatorDataSheet.prototype = {
  altDiff: PropTypes.number,
  isLoading: PropTypes.bool,
  rangeValue: PropTypes.number,
  teamSelected: PropTypes.string,
  setIsLoading: PropTypes.func,
};
