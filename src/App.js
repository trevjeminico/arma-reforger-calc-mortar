import React, { useState } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import RangeSelector from "./components/RingSelector";
import RangeSlider from "./components/RangeSlider";
import RangeTableView from "./components/RangeTableView";
import HeaderNav from "./components/HeaderNav";
import ShellTypeSelector from "./components/ShellTypeSelector";
import { FEATURE } from "./config";

function App() {
  const [hasRingValues, setHasRingValues] = useState({});
  const [team, setTeam] = useState("russian");
  const [shellType, setShellType] = useState("HE");
  const { SHOW_HEADER } = FEATURE;

  return (
    <Flex background="gray.contrast" minH="100vh" direction="column">
      {SHOW_HEADER.enable && <HeaderNav flex="none" selectedTeam={setTeam} />}
      <Container flex={1}>
        <Flex gap="3" direction="row" align="flex-start">
          <Flex direction="column" gap="4" justify="center" width="50%">
            <Box width="100%" borderWidth="1px" padding="25px">
              <ShellTypeSelector
                typeSelected={setShellType}
                teamSelected={team}
              />
              <RangeSelector
                ringSelected={setHasRingValues}
                shellTypeIs={shellType}
                teamSelected={team}
              />

              {hasRingValues?.min && (
                <RangeSlider
                  rangeValues={hasRingValues}
                  shellType={shellType}
                  teamSelected={team}
                />
              )}
            </Box>
          </Flex>
          <Box width="50%" borderWidth="1px">
            {hasRingValues?.ring >= 0 ? (
              <RangeTableView
                index={hasRingValues.ring}
                shellType={shellType}
                teamSelected={team}
              />
            ) : (
              <Box p="15px" textAlign="center">
                SELECT A Ring to see the table
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
      <Container
        w="100%"
        textAlign="center"
        flex="none"
        borderWidth="1px"
        mt="15px"
      >
        <Box p="15px">Footer</Box>
      </Container>
    </Flex>
  );
}

export default App;
