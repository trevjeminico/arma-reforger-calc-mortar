import React, { useContext, useEffect, useState } from "react";
import {
  Slider,
  HStack,
  Box,
  Input,
  Flex,
  Button,
  ButtonGroup,
  Stat,
  Field,
  Spinner,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { calculateElevation } from "../tools/Calculate";
import PropTypes from "prop-types";
import { MortarIcon, MaxIcon, MinIcon, TimeIcon } from "./icons/IconsIndex";
import { TeamSaveDataContext } from "../context/TeamSaveDataProvider";

import { TEAMBASECOLOR } from "../config";
export default function RangeSlider({
  rangeTotal,
  ringValues,
  shellType,
  targetAltDiff,
  teamSelected,
  setTargetRangeValue,
  shellTypeName,
}) {
  const [targetRange, setTargetRange] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [saveElevationTarget, setSaveElevationTarget] = useState(0);
  const [saveTimeFlight, setSaveTimeFlight] = useState(0);
  const [targetDegree, setTargetDegree] = useState("0");

  const { teamSovietData, teamNatoData, setTeamNatoData, setTeamSovietData } =
    useContext(TeamSaveDataContext);
  const { DEFAULT_COLOR: teamColor } = TEAMBASECOLOR;

  const handleTargetRange = (e) => {
    setTargetRange(e.target.value);
    setShowSpinner(true);
  };

  const handleSaveTarget = (e) => {
    if (saveElevationTarget > 0) {
      const param = {
        targetMils: targetDegree,
        elev: saveElevationTarget,
        ring: ringValues.ring,
        type: shellType,
        altDiff: targetAltDiff,
        roundName: shellTypeName,
      };
      if (teamSelected === "nato") {
        setTeamNatoData([...teamNatoData, param]);
      } else {
        setTeamSovietData([...teamSovietData, param]);
      }
    }
  };

  useEffect(() => {
    if (targetRange > 0) {
      const getElevation = calculateElevation(
        targetRange,
        ringValues.ring,
        targetAltDiff,
        shellType,
        teamSelected
      );

      setTimeout(() => {
        setShowSpinner(false);
      }, 2000);
      setTimeout(() => {
        const total = getElevation?.elevationTotal || "Nan";
        setSaveTimeFlight(getElevation?.timeOfFlight || "00.00");
        setSaveElevationTarget(total);
      }, 1000);
    }
    const teamhasChange = teamSelected === "nato" || "russian";
    if (teamhasChange) {
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
      }, 2000);
    }

    setTargetRange(rangeTotal > 0 ? rangeTotal : ringValues.min);
  }, [
    targetRange,
    ringValues,
    targetAltDiff,
    shellType,
    teamSelected,
    rangeTotal,
  ]);

  return (
    <Box
      borderLeftWidth={{ base: "0px", lg: "1px" }}
      borderBottomWidth={{ base: "0px", lg: "1px" }}
      borderRightWidth={{ base: "0px", lg: "1px" }}
      p={{ base: "0px", lg: "15px" }}
      borderTopWidth="0px"
    >
      <Stack css={{ "--field-label-width": "96px" }}>
        <Field.Root my="5px" orientation="horizontal">
          <Field.Label my={{ base: "5px", lg: "0px" }} w="100%">
            Target in Mil:
          </Field.Label>
          <Input
            name="targetDegree"
            onChange={(e) => {
              setTargetDegree(e.target.value);
            }}
            w="100%"
          />
        </Field.Root>
      </Stack>

      <Box mt="5px">
        <Flex gap="2" direction="column" flexBasis="100%">
          <Slider.Root
            size="lg"
            max={ringValues?.max}
            min={ringValues?.min}
            readOnly
            value={[targetRange]}
          >
            <HStack justify="space-between">
              <Flex direction={{ base: "column", lg: "row" }} flexBasis="100%">
                <Slider.Label
                  my={{ lg: "10px", base: "5px" }}
                  mx={{ lg: "5px", base: "0px" }}
                >
                  Range(M):
                </Slider.Label>
                <InputGroup
                  startElement={
                    <MinIcon size="md" color={teamColor[teamSelected]} />
                  }
                >
                  <Input
                    onChange={handleTargetRange}
                    value={ringValues?.min}
                    readOnly
                    disabled
                  />
                </InputGroup>
                <InputGroup
                  startElement={
                    <MaxIcon size="md" color={teamColor[teamSelected]} />
                  }
                  endElement={<div>Max: {ringValues?.max} (m)</div>}
                >
                  <Input
                    onChange={handleTargetRange}
                    value={targetRange}
                    readOnly
                    disabled
                  />
                </InputGroup>
              </Flex>
            </HStack>
            <Slider.Control display="none">
              <Slider.Track>
                <Slider.Range />
              </Slider.Track>
              <Slider.Thumbs />
            </Slider.Control>
          </Slider.Root>
        </Flex>

        <Box mt="5px">
          <Flex
            gap="2"
            flexWrap="wrap"
            direction={{ base: "column", lg: "row" }}
            w={{ base: "100%" }}
            flexBasis="100%"
          >
            <Stat.Root
              maxW="200px"
              borderWidth="1px"
              p="4"
              rounded="md"
              visual
              mt="5px"
              mb="15px"
            >
              <HStack justify="space-between">
                <Stat.Label> Elevation:</Stat.Label>
              </HStack>
              <Stat.ValueText>
                <MortarIcon
                  size={{ base: "lg", lg: "md" }}
                  mt="4.5%"
                  color={teamColor[teamSelected]}
                />
                {showSpinner ? (
                  <Spinner size="md" mt="5%" />
                ) : (
                  <Text textStyle={{ base: "lg", lg: "md" }} mt="5px">
                    {saveElevationTarget} MIL
                  </Text>
                )}
              </Stat.ValueText>
            </Stat.Root>
            <Stat.Root
              maxW="200px"
              borderWidth="1px"
              p="4"
              rounded="md"
              visual
              mt="5px"
              mb="15px"
            >
              <HStack justify="space-between">
                <Stat.Label> Time of Flight:</Stat.Label>
              </HStack>
              <Stat.ValueText>
                <TimeIcon
                  size={{ base: "lg", lg: "md" }}
                  mt="4.5%"
                  color={teamColor[teamSelected]}
                />
                {showSpinner ? (
                  <Spinner size="md" mt="5%" />
                ) : (
                  <Text textStyle={{ base: "lg", lg: "md" }} mt="5px">
                    {saveTimeFlight} sec
                  </Text>
                )}
              </Stat.ValueText>
            </Stat.Root>
          </Flex>
          <ButtonGroup variant="outline">
            <Button
              onClick={handleSaveTarget}
              colorPalette="blue"
              disabled={targetDegree.length === 0 || !!showSpinner}
            >
              Save
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}

RangeSlider.prototype = {
  rangeTotal: PropTypes.any,
  ringValues: PropTypes.any,
  shellType: PropTypes.string,
  targetAltDiff: PropTypes.any,
  teamSelected: PropTypes.string,
  setTargetRangeValue: PropTypes.func,
  shellTypeName: PropTypes.string,
};
