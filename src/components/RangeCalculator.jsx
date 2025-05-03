import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Stack, NumberInput, Separator, Collapsible } from "@chakra-ui/react";

function CollapsibleWrapper({ children, rest }) {
  return (
    <Collapsible.Root {...rest}>
      <Collapsible.Trigger
        borderWidth="1px"
        w="100%"
        my="10px"
        cursor="pointer"
        p="2%"
      >
        Show and Add Ruler Values for Range
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
}

export default function RangeCalculator({ setTotalRange, teamSelected }) {
  const [range1, setRange1] = useState(0);
  const [range2, setRange2] = useState(0);
  const [range3, setRange3] = useState(0);
  let maxRuler = 900;
  const minRuler = 0;

  if (teamSelected === "nato") {
    maxRuler = 1000;
  }

  useEffect(() => {
    const total = parseInt(range1) + parseInt(range2) + parseInt(range3);
    setTotalRange(parseInt(total));
  }, [range1, range2, range3, setTotalRange]);

  return (
    <CollapsibleWrapper rest={{ mb: "15px" }}>
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
    </CollapsibleWrapper>
  );
}

RangeCalculator.prototype = {
  setTotalRange: PropTypes.func,
  teamSelected: PropTypes.string,
};
