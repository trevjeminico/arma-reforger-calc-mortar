import { useContext } from "react";
import PropTypes from "prop-types";
import { TEAMBASECOLOR } from "../../config";
import ShellTypeTabs from "../Tabs/ShellTypeTabs";
import { TeamSaveDataContext } from "../../context/TeamSaveDataProvider";
export default function TeamSavedViewDetails({ dataItems }) {
  const { team } = useContext(TeamSaveDataContext);
  const { DEFAULT_COLOR: teamColor } = TEAMBASECOLOR;
  const defaultTeamColor = teamColor[team];
  const {
    eResult: explosiveResult,
    sResult: smokeResult,
    iResult: illuminationResult,
    roundNames,
  } = dataItems;
  return (
    <>
      <ShellTypeTabs
        defaultTeamColor={defaultTeamColor}
        roundNames={roundNames}
        explosiveResult={explosiveResult}
        smokeResult={smokeResult}
        illuminationResult={illuminationResult}
        isLoading={false}
      />

      {/* <Box textAlign="center" mt="15px">
        <Button>Delete</Button>
      </Box> */}
    </>
  );
}

TeamSavedViewDetails.prototype = {
  dataItems: PropTypes.obj,
};
