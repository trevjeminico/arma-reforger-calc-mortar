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

export default function RangeSlider({ rangeValues, shellType }) {
  const [targetRange, setTargetRange] = useState(0);
  const [targetAltDiff, setTargetAltDiff] = useState(0);
  const [saveElevationTarget, setSaveElevationTarget] = useState(0);
  const [targetName, setTargetName] = useState(0);
  const [targetDegree, setTargetDegree] = useState("0");
  const [savePreviousTarget, setSavePreviousTarget] = useState([]);
  const handleTargetRange = (e) => {
    setTargetRange(e.target.value);
  };

  const handleTargetAltDiff = (e) => {
    setTimeout(() => {
      setTargetAltDiff(e.target.value);
    }, 500);
  };

  const handleSaveTarget = (e) => {
    e.preventDefault();

    if (saveElevationTarget > 0) {
      setTargetName(targetName + 1);
      const param = {
        name: targetName,
        deg: targetDegree,
        elev: saveElevationTarget,
        ring: rangeValues.ring,
        type: shellType,
      };

      setSavePreviousTarget([...savePreviousTarget, param]);
    }
  };

  const handleClearBtn = () => {
    setTargetName(0);
    setSavePreviousTarget([]);
  };

  useEffect(() => {
    if (targetRange > 0) {
      const getElevation = calculateElevation(
        targetRange,
        rangeValues.ring,
        targetAltDiff,
        shellType
      );
      setSaveElevationTarget(getElevation?.elevationTotal);
    }
  }, [targetAltDiff, targetRange, rangeValues, shellType]);

  return (
    <>
      <Box mt="5px">
        <Flex gap="2" direction="column">
          <Field.Root>
            <Field.Label>Altitude Difference:</Field.Label>
            <Input
              name="altDiff"
              placeholder="altitude difference"
              onChange={handleTargetAltDiff}
            />
          </Field.Root>

          <Slider.Root
            defaultValue={[rangeValues?.min]}
            size="lg"
            max={rangeValues?.max}
            min={rangeValues?.min}
            readOnly
            value={[targetRange]}
          >
            <HStack justify="space-between">
              <Slider.Label>Range:</Slider.Label>
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
        {savePreviousTarget.length === 0 ? (
          <Box textAlign="center" p="15px">
            no target saved
          </Box>
        ) : (
          <Table.Root size="lg" striped>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Target #</Table.ColumnHeader>
                <Table.ColumnHeader>Degree</Table.ColumnHeader>
                <Table.ColumnHeader>Elevation</Table.ColumnHeader>
                <Table.ColumnHeader>Ring</Table.ColumnHeader>
                <Table.ColumnHeader>Shell Type</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {savePreviousTarget.map((key, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>{key.name}</Table.Cell>
                    <Table.Cell>
                      {key.deg}
                      <span>&#176;</span>
                    </Table.Cell>
                    <Table.Cell>{key.elev} mil</Table.Cell>
                    <Table.Cell>{key.ring}</Table.Cell>
                    <Table.Cell>{key.type}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        )}
      </Box>
    </>
  );
}

RangeSlider.prototype = {
  rangeValues: PropTypes.any,
  shellType: PropTypes.string,
};
