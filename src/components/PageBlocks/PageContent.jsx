import React, { useContext } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import ShellTypeSelector from "../ShellTypeSelector";
import RingSelector from "../RingSelector";
import { TeamSaveDataContext } from "../../context/TeamSaveDataProvider";
import { MortarDataContext } from "../../context/MortarDataProvider";
import RangeCalculator from "../RangeCalculator";
import RangeSlider from "../RangeSlider";
import RangeTableAndTargetViewer from "../RangeTableAndTargetViewer";
export default function PageContent() {
  const { team } = useContext(TeamSaveDataContext);

  const {
    hasRangeValues,
    hasRingValues,
    shellType,
    shellTypeName,
    targetAltDiff,
    setTargetAltDiff,
    setTargetRange,
    setShellTypeName,
    setHasRingValues,
    setHasRangeValues,
    setShellType,
  } = useContext(MortarDataContext);
  return (
    <Container flex={1}>
      <Flex
        gap="3"
        direction={{ base: "column", lg: "row" }}
        align="flex-start"
        flexBasis="100%"
      >
        <Flex
          direction="column"
          gap="4"
          justify="center"
          width={{ base: "100%", lg: "50%" }}
        >
          <Box width="100%" borderWidth="1px" padding="25px">
            <ShellTypeSelector
              typeSelected={setShellType}
              teamSelected={team}
            />
            <RingSelector
              ringSelected={setHasRingValues}
              shellTypeIs={shellType}
              shellTypeName={setShellTypeName}
              teamSelected={team}
            />
            {hasRingValues?.min && (
              <>
                <RangeCalculator
                  setTotalRange={setHasRangeValues}
                  setTargetAltDiff={setTargetAltDiff}
                  ringValues={hasRingValues}
                  teamSelected={team}
                />
                <RangeSlider
                  rangeTotal={hasRangeValues}
                  ringValues={hasRingValues}
                  shellType={shellType}
                  targetAltDiff={targetAltDiff}
                  teamSelected={team}
                  setTargetRangeValue={setTargetRange}
                  shellTypeName={shellTypeName}
                />
              </>
            )}
          </Box>
        </Flex>
        <Box width={{ base: "100%", lg: "50%" }} borderWidth="1px">
          <RangeTableAndTargetViewer
            index={hasRingValues.ring}
            shellType={shellType}
            teamSelected={team}
          />
        </Box>
      </Flex>
    </Container>
  );
}
