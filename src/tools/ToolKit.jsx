import { mortarRangeData } from "./mortarRangeData";
function inbetween(x, min, max) {
  return x >= min && x <= max;
}

function getTeamRangeTable(teamName) {
  return mortarRangeData.filter((team) => team.name.toLowerCase() === teamName);
}

export function getShellType(type, teamName) {
  const RangeTable = getTeamRangeTable(teamName);
  return RangeTable.filter((shell) => shell.Shell_type === type);
}

export function getRangeTableByRing(type, index, teamName) {
  const rangeShells = getShellType(type, teamName);
  const rangeList = rangeShells[0].rangeTableList;
  const returnRange = rangeList.filter(
    (rangeTable) => rangeTable.value === index
  );

  return returnRange;
}

export function calculateElevation(toCalculateData) {
  if (!toCalculateData) {
    return 0;
  }
  const xValue = toCalculateData?.r - toCalculateData?.r1;
  const xValue2 = toCalculateData?.r2 - toCalculateData?.r1;
  const eValue = toCalculateData?.e2 - toCalculateData?.e1;
  const aslValue = (toCalculateData?.alt / 100) * toCalculateData?.fix;
  const rangeDiff = xValue * eValue;
  const rangeDiff1 = rangeDiff / xValue2;
  const total =
    parseFloat(toCalculateData?.e1) +
    parseFloat(rangeDiff1) +
    parseFloat(aslValue);

  return {
    elevationTotal: parseFloat(total).toFixed(2),
    rangeValues: toCalculateData,
    timeOfFlight: `${toCalculateData?.t1} - ${toCalculateData?.t2}`,
  };
}

function getRangeExactRangeData(rangeData, rangeInput, altInput) {
  const { value, fix_mil: mil, range: rangeFullDetails } = rangeData;
  for (let index = 0; index < rangeFullDetails.length; index++) {
    const nextValue = rangeFullDetails[index + 1];
    if (nextValue !== "undefined") {
      if (inbetween(rangeInput, rangeFullDetails[index]?.r, nextValue?.r)) {
        return {
          value: value,
          hasData: true,
          result: calculateElevation({
            alt: altInput,
            r: rangeInput,
            r1: rangeFullDetails[index].r,
            r2: nextValue.r,
            e1: rangeFullDetails[index].mils,
            e2: nextValue.mils,
            fix: mil,
            t1: rangeFullDetails[index].time,
            t2: nextValue.time,
          }),
        };
      }
    }
  }
}

function extractRangeData(shellTypeData, rangeInput, altInput) {
  const result = [];
  const { rangeTableList } = shellTypeData[0];
  rangeTableList.forEach((data) => {
    const { minMaxRange } = data;
    if (!!inbetween(rangeInput, minMaxRange[0], minMaxRange[1])) {
      result.push(getRangeExactRangeData(data, rangeInput, altInput));
    } else {
      result.push({ value: data.value, hasData: false });
    }
  });
  return result;
}

export function getRangeResultByShellType(
  shellType = "HE",
  rangeInput = 0,
  altInput = 0,
  teamSelected = "russia"
) {
  const teamRangeTable = getTeamRangeTable(teamSelected);
  const getShellTypeData = teamRangeTable[0]?.rangeData;

  if (getShellTypeData?.length > 0) {
    const extractShellRangeData = getShellTypeData.filter(
      (shell) => shell.Shell_type.toLowerCase() === shellType.toLowerCase()
    );

    return {
      roundName: extractShellRangeData[0].round_name,
      type: shellType,
      result: extractRangeData(extractShellRangeData, rangeInput, altInput),
    };
  }

  return {};
}

export function getMinMaxRange(teamSelected) {
  const teamRangeTable = getTeamRangeTable(teamSelected);
  return teamRangeTable[0].maxRange;
}
