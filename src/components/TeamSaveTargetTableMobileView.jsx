import React, { useContext } from "react";
import { Box, Button, Table } from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  ExplosiveIcon,
  FlareIcon,
  SmokeIcon,
  CompassIcon,
  TargetIcon,
  MortarIcon,
  MapIcon,
  TimeIcon,
} from "./icons/IconsIndex";

import { TEAMBASECOLOR } from "../config";

import { TeamSaveDataContext } from "../context/TeamSaveDataProvider";
import ModalComponent from "./ui/modalComponent";

function TableModalContent({ tableData, teamColor }) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader textAlign="center" color={teamColor}>
            Ring
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">
            <MortarIcon size="lg" color={teamColor} />
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">
            <CompassIcon size="lg" color={teamColor} />
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">
            <MapIcon size="lg" color={teamColor} />
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">
            <TimeIcon size="md" color={teamColor} />
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body color={teamColor}>
        <Table.Row>
          <Table.Cell textAlign="center">{tableData.ring}</Table.Cell>
          <Table.Cell textAlign="center">
            {tableData.type === "HE" && (
              <ExplosiveIcon size="lg" color={teamColor} />
            )}
            {tableData.type === "SMOKE" && (
              <SmokeIcon size="lg" color={teamColor} />
            )}
            {tableData.type === "ILLUMINATION" && (
              <FlareIcon size="lg" color={teamColor} />
            )}
          </Table.Cell>
          <Table.Cell textAlign="center">{tableData.targetMils}</Table.Cell>
          <Table.Cell textAlign="center">{tableData.elev}</Table.Cell>
          <Table.Cell textAlign="center">
            {tableData.timeOfFlight} sec
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
}
function MobileTeamSaveContent({ keyNum, data, btnColor }) {
  return {
    title: (
      <>
        <TargetIcon size="lg" color={btnColor} /> Target: {keyNum + 1}
      </>
    ),
    content: TableModalContent({ tableData: data, teamColor: btnColor }),
    disableCancel: false,
  };
}

function MobileTeamSaveBtn({ btnColor }) {
  return {
    btnVariant: "outline",
    btnContent: `View`,
    btnColor: btnColor,
  };
}

export default function TeamSaveTargetTable({ teamSelected }) {
  const { teamNatoData, teamSovietData, setTeamSovietData, setTeamNatoData } =
    useContext(TeamSaveDataContext);
  const { DEFAULT_COLOR: teamColor, BUTTON_COLOR: buttonColor } = TEAMBASECOLOR;
  const hasData = teamSelected === "nato" ? teamNatoData : teamSovietData;
  const defaultTeamColor = teamColor[teamSelected];

  const HandleRemoveItem = (id) => {
    const teamDataIndexRemoveArray =
      teamSelected !== "nato" ? teamSovietData : teamNatoData;
    const teamNewArray = teamDataIndexRemoveArray.filter(
      (item, index) => index !== id
    );
    if (teamSelected !== "nato") {
      setTeamSovietData(teamNewArray);
    } else {
      setTeamNatoData(teamNewArray);
    }
  };

  return (
    <>
      {hasData?.length === 0 ? (
        <Box
          textAlign="center"
          p="15px"
          color={defaultTeamColor}
          textTransform="uppercase"
        >
          no target saved {teamSelected}
        </Box>
      ) : (
        <Box>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader textAlign="center">
                  <TargetIcon size="lg" color={defaultTeamColor} />
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">
                  <MortarIcon size="lg" color={defaultTeamColor} />
                </Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center" color={defaultTeamColor}>
                  Action
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            {hasData?.map((key, i) => {
              return (
                <Table.Body color={defaultTeamColor} key={i}>
                  <Table.Row>
                    <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {key.type === "HE" && (
                        <ExplosiveIcon size="lg" color={defaultTeamColor} />
                      )}
                      {key.type === "SMOKE" && (
                        <SmokeIcon size="lg" color={defaultTeamColor} />
                      )}
                      {key.type === "ILLUMINATION" && (
                        <FlareIcon size="lg" color={defaultTeamColor} />
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <ModalComponent
                        DialogBtn={MobileTeamSaveBtn({
                          btnColor: buttonColor[teamSelected],
                        })}
                        DialogContent={MobileTeamSaveContent({
                          keyNum: i,
                          data: key,
                          btnColor: defaultTeamColor,
                        })}
                      />

                      <Button
                        onClick={() => {
                          HandleRemoveItem(i);
                        }}
                        colorPalette={buttonColor[teamSelected]}
                        variant="outline"
                        marginLeft="15px"
                      >
                        clear
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table.Root>
        </Box>
      )}
    </>
  );
}

TeamSaveTargetTable.prototype = {
  teamSaveData: PropTypes.array,
  teamSelected: PropTypes.string,
};
