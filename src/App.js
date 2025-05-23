import React, { useState } from "react";
import { Container, Flex, Box, Theme } from "@chakra-ui/react";
import RangeSelector from "./components/RingSelector";
import RangeSlider from "./components/RangeSlider";
import HeaderNav from "./components/HeaderNav";
import ShellTypeSelector from "./components/ShellTypeSelector";
import { FEATURE } from "./config";
import RangeCalculator from "./components/RangeCalculator";
import ModalUpdates from "./components/ModalUpdates";
import RangeTableAndTargetViewer from "./components/RangeTableAndTargetViewer";

function App() {
  const [hasRangeValues, setHasRangeValues] = useState(0);
  const [hasRingValues, setHasRingValues] = useState({});
  const [team, setTeam] = useState("russian");
  const [shellType, setShellType] = useState("HE");
  const [shellTypeName, setShellTypeName] = useState("");
  const { SHOW_HEADER } = FEATURE;
  const [targetRange, setTargetRange] = useState([]);

  const [targetAltDiff, setTargetAltDiff] = useState(0);

  return (
    <Theme appearance="dark">
      <Flex background="gray.contrast" minH="100vh" direction="column">
        {SHOW_HEADER.enable && <HeaderNav flex="none" selectedTeam={setTeam} />}
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

                <RangeSelector
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
                targetRange={targetRange}
              />
            </Box>
          </Flex>
        </Container>

        <Box
          w="100%"
          textAlign="center"
          flex="none"
          borderWidth="1px"
          mt="20px"
          p="15px"
        >
          Footer
        </Box>
      </Flex>
      {FEATURE.SHOW_FOLLOWING_UPDATE && <ModalUpdates />}
    </Theme>
  );
}

export default App;
