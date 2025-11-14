import React, { useContext } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";

import { TeamSaveDataContext } from "../../context/TeamSaveDataProvider";
import { MortarDataContext } from "../../context/MortarDataProvider";
import RangeCalculatorInputWrapper from "../RangeCalculatorInputWrapper";
import RangeTableAndTargetViewer from "../RangeTableAndTargetViewer";
import RangeCalculatorDataSheet from "../RangeCalculatorDataSheet";
export default function PageContent() {
  const { team } = useContext(TeamSaveDataContext);

  const {
    hasRangeValues,
    hasRingValues,
    isLoading,
    shellType,
    targetAltDiff,
    setTargetAltDiff,
    setHasRangeValues,
    setIsLoading,
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
          <Box width="100%" borderWidth="1px" padding="15px">
            <RangeCalculatorInputWrapper
              setTotalRange={setHasRangeValues}
              setTargetAltDiff={setTargetAltDiff}
              setIsLoading={setIsLoading}
              teamSelected={team}
            />
          </Box>
          <Box width="100%" borderWidth="1px" padding="15px">
            <RangeCalculatorDataSheet
              altDiff={targetAltDiff}
              rangeValue={hasRangeValues}
              teamSelected={team}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Box>
        </Flex>
        <Box width={{ base: "100%", lg: "50%" }} borderWidth="1px">
          {/* <RingSelector /> */}
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
