import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  NumberInput,
  Separator,
  Button,
  Flex,
  InputGroup,
  Heading,
  Box,
} from "@chakra-ui/react";
import { ToggleTip } from "./ui/toggle-tip";
import { AltitudeIcon } from "./icons/IconsIndex";

export default function RangeCalculator({
  setTotalRange,
  setTargetAltDiff,
  teamSelected,
}) {
  const [range1, setRange1] = useState(0);
  const [range2, setRange2] = useState(0);
  const [range3, setRange3] = useState(0);
  const [target1Alt, setTarget1Alt] = useState(0);
  const [target2Alt, setTarget2Alt] = useState(0);
  let maxRuler = 900;
  const minRuler = 0;

  if (teamSelected === "nato") {
    maxRuler = 1000;
  }

  useEffect(() => {
    const total = parseInt(range1) + parseInt(range2) + parseInt(range3);
    setTotalRange(parseInt(total));
    const altDifference = target1Alt - target2Alt;
    setTargetAltDiff(altDifference);
  }, [
    range1,
    range2,
    range3,
    setTotalRange,
    setTargetAltDiff,
    target1Alt,
    target2Alt,
  ]);

  return (
    <Box my="15px">
      <Heading size={{ base: "md", lg: "sm" }} my="15px">
        Calculator for Altitude Difference and Range
      </Heading>
      <Stack
        gap="4"
        m={{ base: "0px", lg: "15px" }}
        direction="row"
        alignItems="normal"
        separator={<Separator orientation={{ lg: "vertical" }} />}
      >
        <NumberInput.Root
          value={range1}
          onValueChange={(e) => setRange1(e.value)}
          min={minRuler}
          max={maxRuler}
          w="100%"
        >
          <NumberInput.Input />
        </NumberInput.Root>
        <NumberInput.Root
          value={range2}
          onValueChange={(e) => setRange2(e.value)}
          min={minRuler}
          max={maxRuler}
          w="100%"
        >
          <NumberInput.Input />
        </NumberInput.Root>
        <NumberInput.Root
          value={range3}
          onValueChange={(e) => setRange3(e.value)}
          min={minRuler}
          max={maxRuler}
          w="100%"
        >
          <NumberInput.Input />
        </NumberInput.Root>
      </Stack>
      <Flex
        justify="space-between"
        flexBasis="100%"
        direction="row"
        w="100%"
        mt={{ base: "15px", lg: "0" }}
        mb={{ base: "15px", lg: "0px" }}
      >
        <ToggleTip
          content="Altitude Difference between two points mortar postion (MP) - target positon (TP)"
          openDelay={500}
          closeDelay={100}
        >
          <Button variant="ghost">
            <AltitudeIcon
              size="lg"
              mt="4.5%"
              color={teamSelected === "nato" ? "blue.500" : "red.500"}
            />
          </Button>
        </ToggleTip>

        <NumberInput.Root
          value={target1Alt}
          onValueChange={(e) => setTarget1Alt(e.value)}
          min={minRuler}
          max={maxRuler}
          w="100%"
        >
          <InputGroup startElement={<Heading size="sm">MP</Heading>}>
            <NumberInput.Input />
          </InputGroup>
        </NumberInput.Root>
        <Button disabled variant="ghost">
          <Heading size="md">-+</Heading>
        </Button>
        <NumberInput.Root
          value={target2Alt}
          onValueChange={(e) => setTarget2Alt(e.value)}
          min={minRuler}
          max={maxRuler}
          w="100%"
        >
          <InputGroup startElement={<Heading size="sm">T2</Heading>}>
            <NumberInput.Input />
          </InputGroup>
        </NumberInput.Root>
      </Flex>
    </Box>
  );
}

RangeCalculator.prototype = {
  setTotalRange: PropTypes.func,
  setTargetAltDiff: PropTypes.func,
  teamSelected: PropTypes.string,
};
