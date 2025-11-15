import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Field,
  Input,
  Flex,
  NumberInput,
} from "@chakra-ui/react";
import { getRangeResultByShellType } from "../tools/ToolKit";
import { TEAMBASECOLOR } from "../config";

import { uuid } from "../tools/ToolKit";
import { TeamSaveDataContext } from "../context/TeamSaveDataProvider";
import ShellTypeTabs from "./Tabs/ShellTypeTabs";

export default function RangeCalculatorDataSheet({
  altDiff,
  isLoading,
  rangeValue,
  teamSelected,
  setIsLoading,
}) {
  const [explosiveResult, setExplosiveResult] = useState([]);
  const [smokeResult, setSmokeResult] = useState([]);
  const [illuminationResult, setIlluminationResult] = useState([]);
  const [targetName, setTargetName] = useState("");
  const [targetMilDeg, setTargetMilDeg] = useState(0);
  const [roundNames, setRoundNames] = useState({});
  const [showSaveOpt, setShowSaveOpt] = useState(false);
  const { DEFAULT_COLOR: teamColor, BUTTON_COLOR: buttonColor } = TEAMBASECOLOR;
  const defaultTeamColor = teamColor[teamSelected];
  const buttonTeamColor = buttonColor[teamSelected];
  const { teamSovietData, teamNatoData, setTeamNatoData, setTeamSovietData } =
    useContext(TeamSaveDataContext);

  useEffect(() => {
    const handleResult = () => {
      const { result: result1, roundName: roundNameHE } =
        getRangeResultByShellType("HE", rangeValue, altDiff, teamSelected);
      const { result: result2, roundName: roundNameSmoke } =
        getRangeResultByShellType("smoke", rangeValue, altDiff, teamSelected);
      const { result: result3, roundName: roundNameIllu } =
        getRangeResultByShellType(
          "illumination",
          rangeValue,
          altDiff,
          teamSelected
        );

      setExplosiveResult(result1);
      setSmokeResult(result2);
      setIlluminationResult(result3);
      setRoundNames({
        HE: roundNameHE,
        smoke: roundNameSmoke,
        illu: roundNameIllu,
      });
    };
    handleResult();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [rangeValue, altDiff, teamSelected, setIsLoading]);

  const handleSaveTarget = () => {
    const tId = uuid();
    const param = {
      id: tId,
      tName: targetName,
      tMilDeg: targetMilDeg,
      eResult: explosiveResult,
      sResult: smokeResult,
      iResult: illuminationResult,
      roundNames: roundNames,
    };

    if (teamSelected === "nato") {
      setTeamNatoData([...teamNatoData, param]);
    } else {
      setTeamSovietData([...teamSovietData, param]);
    }
    setTargetName("");
    setShowSaveOpt(false);
  };

  return (
    <>
      <h3>Data Sheet:</h3>
      <ShellTypeTabs
        defaultTeamColor={defaultTeamColor}
        roundNames={roundNames}
        explosiveResult={explosiveResult}
        smokeResult={smokeResult}
        illuminationResult={illuminationResult}
        isLoading={isLoading}
      />
      <Box textAlign="center" mt="15px">
        {!showSaveOpt ? (
          <Button
            onClick={() => setShowSaveOpt(true)}
            colorPalette={buttonTeamColor}
            variant="surface"
          >
            Saved This Data Sheet?
          </Button>
        ) : (
          <>
            <Flex gap="3" direction="row">
              <Field.Root>
                <Field.Label>Target Name:</Field.Label>
                <Input
                  placeholder=""
                  onChange={(e) => {
                    setTargetName(e.target.value);
                  }}
                  maxLength={11}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Target in Mil / Degree:</Field.Label>

                <NumberInput.Root
                  value={targetMilDeg}
                  onValueChange={(e) => {
                    setTargetMilDeg(parseInt(e.value));
                  }}
                  w="100%"
                >
                  <NumberInput.Input maxLength="4" />
                </NumberInput.Root>
              </Field.Root>
            </Flex>
            <ButtonGroup mt="15px">
              <Button
                onClick={handleSaveTarget}
                disabled={targetName.length === 0}
                colorPalette="blue"
                variant="ghost"
              >
                confirm save
              </Button>
              <Button
                onClick={() => setShowSaveOpt(false)}
                disabled={targetMilDeg.length === 0}
                colorPalette="red"
                variant="ghost"
              >
                cancel
              </Button>
            </ButtonGroup>
          </>
        )}
      </Box>
    </>
  );
}

RangeCalculatorDataSheet.prototype = {
  altDiff: PropTypes.number,
  isLoading: PropTypes.bool,
  rangeValue: PropTypes.number,
  teamSelected: PropTypes.string,
  setIsLoading: PropTypes.func,
};
