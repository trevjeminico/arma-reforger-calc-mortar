import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { calculateElevation } from "../tools/Calculate";
import PropTypes from "prop-types";
import TeamSaveTargetTable from "./TeamSaveTargetTable";
import { MortarIcon } from "./icons/IconsIndex";

export default function RangeSlider({ rangeValues, shellType, teamSelected }) {
  const [targetRange, setTargetRange] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [targetAltDiff, setTargetAltDiff] = useState(0);
  const [saveElevationTarget, setSaveElevationTarget] = useState(0);
  const [targetName, setTargetName] = useState(0);
  const [targetDegree, setTargetDegree] = useState("0");
  const [savePreviousTargetNato, setSavePreviousTargetNato] = useState([]);
  const [savePreviousTargetRU, setSavePreviousTargetRU] = useState([]);
  const handleTargetRange = (e) => {
    setTargetRange(e.target.value);
    setShowSpinner(true);
    if (e.target.value > 0) {
      const getElevation = calculateElevation(
        e.target.value,
        rangeValues.ring,
        targetAltDiff,
        shellType,
        teamSelected
      );

      setTimeout(() => {
        setShowSpinner(false);
      }, 2000);
      setTimeout(() => {
        setSaveElevationTarget(getElevation?.elevationTotal);
      }, 1000);
    }
  };

  const handleTargetAltDiff = (e) => {
    setTimeout(() => {
      setTargetAltDiff(e.target.value);
    }, 500);
  };

  const handleSaveTarget = (e) => {
    if (saveElevationTarget > 0) {
      setTargetName(targetName + 1);
      const param = {
        name: targetName,
        deg: targetDegree,
        elev: saveElevationTarget,
        ring: rangeValues.ring,
        type: shellType,
        team: teamSelected,
      };

      if (teamSelected === "nato") {
        setSavePreviousTargetNato([...savePreviousTargetNato, param]);
      } else {
        setSavePreviousTargetRU([...savePreviousTargetRU, param]);
      }
    }
  };

  const handleClearBtn = () => {
    setTargetName(0);
    setSavePreviousTargetRU([]);
    setSavePreviousTargetNato([]);
  };

  const handleRemove = (e) => {
    if (teamSelected === "nato") {
      const newNatoList = savePreviousTargetNato.filter((nato) => {
        return nato.name !== parseInt(e.target.value);
      });
      console.log(newNatoList);
      setSavePreviousTargetNato(newNatoList);
    } else {
      const newRUList = savePreviousTargetRU.filter(
        (ru) => ru.name !== parseInt(e.target.value)
      );
      setSavePreviousTargetRU(newRUList);
    }
  };

  return (
    <>
      <Box mt="5px">
        <Flex gap="2" direction="column" flexBasis="100%">
          <Slider.Root
            defaultValue={[rangeValues?.min]}
            size="lg"
            max={rangeValues?.max}
            min={rangeValues?.min}
            readOnly
            value={[targetRange]}
          >
            <HStack justify="space-between">
              <Flex direction={{ base: "column", lg: "row" }} flexBasis="100%">
                <Field.Root>
                  <Flex
                    justify="space-between"
                    flexBasis="100%"
                    direction={{ base: "column", lg: "row" }}
                    w="100%"
                  >
                    <Field.Label>Alt Difference:</Field.Label>
                    <Input
                      name="altDiff"
                      onChange={handleTargetAltDiff}
                      w={{ base: "100%", lg: "60%" }}
                    />
                  </Flex>
                </Field.Root>
                <Slider.Label
                  my={{ lg: "10px", base: "0px" }}
                  mx={{ lg: "5px", base: "0px" }}
                >
                  Range(M):
                </Slider.Label>
                <Input onChange={handleTargetRange} />
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
            <Box>
              <Field.Root my="5px">
                <Field.Label my={{ base: "5px", lg: "0px" }}>
                  Target Degree:
                </Field.Label>
                <Input
                  placeholder="target degree"
                  name="targetDegree"
                  onChange={(e) => {
                    setTargetDegree(e.target.value);
                  }}
                  w="100%"
                />
              </Field.Root>
            </Box>
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
                <MortarIcon size={{ base: "lg", lg: "md" }} mt="5px" />
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
            <Button onClick={handleSaveTarget} colorPalette="blue">
              Save
            </Button>
            <Button onClick={handleClearBtn} colorPalette="red">
              Clear
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box mt="15px" borderWidth="1px">
        {teamSelected === "nato" && (
          <TeamSaveTargetTable
            teamSaveData={savePreviousTargetNato}
            handleRemove={handleRemove}
            teamSelected={teamSelected}
          />
        )}
        {teamSelected === "russian" && (
          <TeamSaveTargetTable
            teamSaveData={savePreviousTargetRU}
            handleRemove={handleRemove}
            teamSelected={teamSelected}
          />
        )}
      </Box>
    </>
  );
}

RangeSlider.prototype = {
  rangeValues: PropTypes.any,
  shellType: PropTypes.string,
  teamSelected: PropTypes.string,
};
