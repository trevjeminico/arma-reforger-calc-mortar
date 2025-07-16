import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  NumberInput,
  Field,
  Button,
  Flex,
  InputGroup,
  Heading,
  Box,
} from "@chakra-ui/react";
import { ToggleTip } from "./ui/toggle-tip";
import { AltitudeIcon } from "./icons/IconsIndex";

export default function RangeCalculator({
  ringValues,
  setTotalRange,
  setTargetAltDiff,
  teamSelected,
}) {
  const maxRuler = ringValues?.max || 0;
  const minRuler = ringValues?.min || 0;
  const [range, setRange] = useState(minRuler);
  const [target1Alt, setTarget1Alt] = useState(0);
  const [target2Alt, setTarget2Alt] = useState(0);
  useEffect(() => {
    const total = parseInt(range);
    setTotalRange(parseInt(total));
    const altDifference = target1Alt - target2Alt;
    setTargetAltDiff(altDifference);
  }, [range, setTotalRange, setTargetAltDiff, target1Alt, target2Alt]);
  const isInvalid = range >= minRuler && range <= maxRuler;

  return (
    <Box>
      <Heading size={{ base: "md", lg: "sm" }} my="15px">
        Calculator for Altitude Difference and Range
      </Heading>
      <Box
        borderLeftWidth={{ base: "0px", lg: "1px" }}
        borderTopWidth={{ base: "0px", lg: "1px" }}
        borderRightWidth={{ base: "0px", lg: "1px" }}
        mt="15px"
        p={{ base: "0px", lg: "15px" }}
        borderBottomWidth="0px"
      >
        <Field.Root mx="auto" my="15px" invalid={!isInvalid}>
          <Field.Label>
            Input Range between: {minRuler} and {maxRuler} (M)
          </Field.Label>
          <NumberInput.Root
            value={range}
            onValueChange={(e) => setRange(e.value)}
            w="100%"
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Field.ErrorText>
            Please input valid range between: {minRuler} and {maxRuler} (M)
          </Field.ErrorText>
        </Field.Root>
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
            w="100%"
          >
            <InputGroup startElement={<Heading size="sm">T2</Heading>}>
              <NumberInput.Input />
            </InputGroup>
          </NumberInput.Root>
        </Flex>
      </Box>
    </Box>
  );
}

RangeCalculator.prototype = {
  ringValues: PropTypes.any,
  setTotalRange: PropTypes.func,
  setTargetAltDiff: PropTypes.func,
  teamSelected: PropTypes.string,
};
