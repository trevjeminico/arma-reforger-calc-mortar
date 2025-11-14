import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NumberInput, Field, Flex, Heading, Box } from "@chakra-ui/react";
import { TEAMBASECOLOR } from "../config";

import { getMinMaxRange } from "../tools/ToolKit";
export default function RangeCalculatorInputWrapper({
  setTotalRange,
  setTargetAltDiff,
  setIsLoading,
  teamSelected,
}) {
  const maxRuler = getMinMaxRange(teamSelected)[1];
  const minRuler = getMinMaxRange(teamSelected)[0];
  const [range, setRange] = useState(0);
  const [target1Alt, setTarget1Alt] = useState(0);
  const [target2Alt, setTarget2Alt] = useState(0);
  useEffect(() => {
    const total = parseInt(range);
    setTotalRange(parseInt(total));

    const altDifference = target1Alt - target2Alt;
    setTargetAltDiff(altDifference);
  }, [range, setTotalRange, setTargetAltDiff, target1Alt, target2Alt]);
  // const isInvalid = range >= minRuler && range <= maxRuler;
  const { DEFAULT_COLOR: teamColor } = TEAMBASECOLOR;
  const defaultTeamColor = teamColor[teamSelected];
  return (
    <Box color={defaultTeamColor}>
      <Heading size={{ base: "md", lg: "sm" }} my="15px">
        Input Range and Altitude Difference
      </Heading>
      <Box p={{ base: "0px" }} borderBottomWidth="0px">
        <Field.Root mx="auto" mb="15px">
          <Field.Label>
            Range between {minRuler} and {maxRuler} (M)
          </Field.Label>
          <NumberInput.Root
            value={range}
            onValueChange={(e) => {
              setRange(e.value);
              setIsLoading(true);
            }}
            w="100%"
          >
            <NumberInput.Input maxLength="4" />
          </NumberInput.Root>
          {/* <Field.ErrorText>
            Please input valid range between: {minRuler} and {maxRuler} (M)
          </Field.ErrorText> */}
        </Field.Root>
        <Flex
          flexBasis="100%"
          direction="row"
          w="100%"
          mt={{ base: "15px", lg: "0" }}
          mb={{ base: "15px", lg: "0px" }}
          gap={2}
        >
          <Field.Root>
            <Field.Label>Mortar Position:</Field.Label>
            <NumberInput.Root
              value={target1Alt}
              onValueChange={(e) => {
                setTarget1Alt(e.value);
                setIsLoading(true);
              }}
              w="100%"
            >
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
          <Field.Root width={{ base: "15%", lg: "10%" }}>
            <Heading size="md" mt="32px" mx="auto">
              -+
            </Heading>
          </Field.Root>
          <Field.Root>
            <Field.Label>Target Position:</Field.Label>
            <NumberInput.Root
              value={target2Alt}
              onValueChange={(e) => {
                setTarget2Alt(e.value);
                setIsLoading(true);
              }}
              w="100%"
            >
              <NumberInput.Input />
            </NumberInput.Root>
          </Field.Root>
        </Flex>
      </Box>
    </Box>
  );
}

RangeCalculatorInputWrapper.prototype = {
  setTotalRange: PropTypes.func,
  setTargetAltDiff: PropTypes.func,
  setIsLoading: PropTypes.func,
  teamSelected: PropTypes.string,
};
