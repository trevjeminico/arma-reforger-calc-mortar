import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { calculateElevation } from "../tools/Calculate";
import PropTypes from "prop-types";
import { MortarIcon, MaxIcon, MinIcon } from "./icons/IconsIndex";

export default function RangeSlider({
  rangeTotal,
  ringValues,
  shellType,
  targetAltDiff,
  teamSelected,
  setTargetRangeValue,
}) {
  const [targetRange, setTargetRange] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [saveElevationTarget, setSaveElevationTarget] = useState(0);
  const [targetName, setTargetName] = useState(0);
  const [targetDegree, setTargetDegree] = useState("0");
  const [currentTargets, setCurrentTargets] = useState([]);

  const handleTargetRange = (e) => {
    setTargetRange(e.target.value);
    setShowSpinner(true);
  };

  const handleSaveTarget = (e) => {
    if (saveElevationTarget > 0) {
      setTargetName(targetName + 1);
      const param = {
        name: targetName,
        targetMils: targetDegree,
        elev: saveElevationTarget,
        ring: ringValues.ring,
        type: shellType,
        team: teamSelected,
        altDiff: targetAltDiff,
      };

      setCurrentTargets([...currentTargets, param]);
      setTargetRangeValue([...currentTargets, param]);
    }
  };

  const handleClearBtn = () => {
    setTargetName(0);
    setCurrentTargets([]);
    setTargetRangeValue([]);
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
    <>
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
                  my={{ lg: "10px", base: "0px" }}
                  mx={{ lg: "5px", base: "0px" }}
                >
                  Range(M):
                </Slider.Label>
                <InputGroup
                  startElement={
                    <MinIcon
                      size="md"
                      color={teamSelected === "nato" ? "blue.500" : "red.500"}
                    />
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
                    <MaxIcon
                      size="md"
                      color={teamSelected === "nato" ? "blue.500" : "red.500"}
                    />
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
            <Slider.Control>
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
                  color={teamSelected === "nato" ? "blue.500" : "red.500"}
                />
                {showSpinner ? (
                  <Spinner size="md" mt="5%" />
                ) : (
                  <> {saveElevationTarget} </>
                )}
                MIL
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
            <Button onClick={handleClearBtn} colorPalette="red">
              Clear
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
}

RangeSlider.prototype = {
  rangeTotal: PropTypes.any,
  ringValues: PropTypes.any,
  shellType: PropTypes.string,
  targetAltDiff: PropTypes.any,
  teamSelected: PropTypes.string,
  setTargetRangeValue: PropTypes.func,
};
