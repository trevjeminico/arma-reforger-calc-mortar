import React, { useEffect, useState } from "react";
import {
  Slider,
  HStack,
  Box,
  Input,
  Flex,
  Button,
  Table,
  ButtonGroup,
  Field,
} from "@chakra-ui/react";
import { calculateElevation } from "../tools/Calculate";
import PropTypes from "prop-types";

import { ExplosiveIcon, FlareIcon, SmokeIcon } from "./icons/IconsIndex";

export default function RangeSlider({ rangeValues, shellType, teamSelected }) {
  const [targetRange, setTargetRange] = useState(0);
  const [targetAltDiff, setTargetAltDiff] = useState(0);
  const [saveElevationTarget, setSaveElevationTarget] = useState(0);
  const [targetName, setTargetName] = useState(0);
  const [targetDegree, setTargetDegree] = useState("0");
  const [savePreviousTargetNato, setSavePreviousTargetNato] = useState([]);
  const [savePreviousTargetRU, setSavePreviousTargetRU] = useState([]);
  const handleTargetRange = (e) => {
    console.log(e.target);
    setTargetRange(e.target.value);
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

  useEffect(() => {
    if (targetRange > 0) {
      const getElevation = calculateElevation(
        targetRange,
        rangeValues.ring,
        targetAltDiff,
        shellType,
        teamSelected
      );
      setSaveElevationTarget(getElevation?.elevationTotal);
    }
  }, [targetAltDiff, targetRange, rangeValues, shellType, teamSelected]);

  return (
    <>
      <Box mt="5px">
        <Flex gap="2" direction="column">
          <Slider.Root
            defaultValue={[rangeValues?.min]}
            size="lg"
            max={rangeValues?.max}
            min={rangeValues?.min}
            readOnly
            value={[targetRange]}
          >
            <HStack justify="space-between">
              <Field.Root>
                <Flex justify="space-between">
                  <Field.Label>Alt Difference:</Field.Label>
                  <Input
                    name="altDiff"
                    onChange={handleTargetAltDiff}
                    w="60%"
                  />
                </Flex>
              </Field.Root>
              <Slider.Label>Range(M):</Slider.Label>
              <Input onChange={handleTargetRange} />
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
          <form>
            <Flex gap="2" direction="row">
              <Input
                placeholder="target degree"
                name="targetDegree"
                onChange={(e) => {
                  setTargetDegree(e.target.value);
                }}
                width="35%"
              />
              <Box p="10px">{saveElevationTarget} mil</Box>
              <ButtonGroup variant="outline">
                <Button onClick={handleSaveTarget} colorPalette="blue">
                  Save
                </Button>
                <Button onClick={handleClearBtn} colorPalette="red">
                  Clear
                </Button>
              </ButtonGroup>
            </Flex>
          </form>
        </Box>
      </Box>
      <Box mt="15px" borderWidth="1px">
        {teamSelected === "nato" && (
          <>
            {savePreviousTargetNato.length === 0 ? (
              <Box
                textAlign="center"
                p="15px"
                color="blue.500"
                textTransform="uppercase"
              >
                no target saved NATO
              </Box>
            ) : (
              <Table.ScrollArea borderWidth="1px" rounded="md" maxH="250px">
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
                      <Table.ColumnHeader textAlign="center">
                        Ring
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">
                        Round Type
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">
                        Remove
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {savePreviousTargetNato.map((key, i) => {
                      return (
                        <Table.Row
                          key={i}
                          bg={{
                            base: "blue.100",
                          }}
                        >
                          <Table.Cell textAlign="center">{key.name}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.deg}
                            <span>&#176;</span>
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.elev} mil
                          </Table.Cell>
                          <Table.Cell textAlign="center">{key.ring}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.type === "HE" && <ExplosiveIcon size="md" />}
                            {key.type === "SMOKE" && <SmokeIcon size="lg" />}
                            {key.type === "ILLUMINATION" && (
                              <FlareIcon size="lg" />
                            )}
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
        )}
        {teamSelected === "russian" && (
          <>
            {savePreviousTargetRU.length === 0 ? (
              <Box
                textAlign="center"
                p="15px"
                color="red.500"
                textTransform="uppercase"
              >
                no target saved
              </Box>
            ) : (
              <Table.ScrollArea borderWidth="1px" rounded="md" maxH="250px">
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
                      <Table.ColumnHeader textAlign="center">
                        Ring
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">
                        Round Type
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="center">
                        Remove
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {savePreviousTargetRU.map((key, i) => {
                      return (
                        <Table.Row
                          key={i}
                          bg={{
                            base: "red.100",
                          }}
                        >
                          <Table.Cell textAlign="center">{key.name}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.deg}
                            <span>&#176;</span>
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.elev} mil
                          </Table.Cell>
                          <Table.Cell textAlign="center">{key.ring}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {key.type === "HE" && <ExplosiveIcon size="md" />}
                            {key.type === "SMOKE" && <SmokeIcon size="lg" />}
                            {key.type === "ILLUMINATION" && (
                              <FlareIcon size="lg" />
                            )}
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
