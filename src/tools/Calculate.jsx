import { RussianRangeTable } from "./RussianRangeTable";
import { NatoRangeTable } from "./NatoRangeTable";
function inbetween(x, min, max) {
  return x >= min && x <= max;
}

function getTeamRangeTable(teamName) {
  return teamName === "nato" ? NatoRangeTable : RussianRangeTable;
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

function getRangeData(type, index, range, teamName) {
  const rangeTableData = getRangeTableByRing(type, index, teamName);
  if (rangeTableData.length > 0) {
    const fixMil = rangeTableData[0].fix_mil;
    const rangeFullDetails = rangeTableData[0].range;

    for (let index = 0; index < rangeFullDetails.length; index++) {
      const nextValue = rangeFullDetails[index + 1];
      if (nextValue !== "undefined") {
        if (inbetween(range, rangeFullDetails[index]?.r, nextValue?.r)) {
          return {
            r: range,
            r1: rangeFullDetails[index].r,
            r2: nextValue.r,
            e1: rangeFullDetails[index].mils,
            e2: nextValue.mils,
            fix: fixMil,
          };
        }
      }
    }
  }
}

export function calculateElevation(
  currentRange,
  index,
  altitudeDiff,
  type,
  teamName
) {
  const fetchRangeValues = getRangeData(type, index, currentRange, teamName);
  if (!fetchRangeValues) {
    return 0;
  }
  const xValue = fetchRangeValues?.r - fetchRangeValues?.r1;
  const xValue2 = fetchRangeValues?.r2 - fetchRangeValues?.r1;
  const eValue = fetchRangeValues?.e2 - fetchRangeValues?.e1;
  const aslValue = (altitudeDiff / 100) * fetchRangeValues?.fix;
  const rangeDiff = xValue * eValue;
  const rangeDiff1 = rangeDiff / xValue2;
  const total =
    parseFloat(fetchRangeValues?.e1) +
    parseFloat(rangeDiff1) +
    parseFloat(aslValue);
  return {
    elevationTotal: parseFloat(total).toFixed(2),
    rangeValues: fetchRangeValues,
  };
}
