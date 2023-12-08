/* eslint-disable camelcase */
import { sunriseNewStatusMap, sunriseProgramsMap } from '@utils/sunriseMaps';

import { TreeChild } from '@store/sunriseStructure/types';
import { LoyaltyPrograms } from '@store/user/types';
import { GetPartnerProgram, GetUserProgram, UserProgram } from './types';

export function getUserProgram(programs: LoyaltyPrograms): GetUserProgram {
  const isAmbassador = programs.ambassador.joined;
  const isSunriseMember = programs.sunrise.joined;
  const isDefaultProgram = programs.default.joined;

  const currentProgram = isAmbassador || isSunriseMember || isDefaultProgram;

  let programData: UserProgram;

  switch (currentProgram) {
    case isAmbassador:
      programData = {
        ...programs.ambassador,
        programType: 'ambassador',
      };

      break;

    case isSunriseMember:
      programData = {
        ...programs.sunrise,
        programType: 'sunrise',
      };

      break;

    default:
      programData = {
        ...programs.default,
        programType: 'default',
      };
  }

  const { level, programType } = programData;

  const userProgram = sunriseProgramsMap[programType].find(
    (o) => o.level === level
  );

  // for ambassador only
  const userStatus = sunriseProgramsMap.sunrise.find(
    (o) => o.level === programs.sunrise.level
  );

  return {
    ...programData,
    icon: userProgram?.icon || null,
    name: userProgram?.name || 'zero',
    status: userStatus?.name || 'zero',
  };
}

export function getPartnerProgram(parentData: TreeChild): GetPartnerProgram {
  const isAmbassador = parentData.ambassador_level > 0 ? true : false;
  const isSunriseMember = parentData.sunrise_joined;
  let isDefaultProgram;

  const partnerProgram = isAmbassador || isSunriseMember || isDefaultProgram;

  // convert old status names recieved from backend to new ones (e.g. "Experienced" -> "Ray")
  const sunriseStatus =
    parentData.status === null
      ? 'zero'
      : sunriseNewStatusMap[parentData.status];

  let programData;

  switch (partnerProgram) {
    case isAmbassador:
      programData = sunriseProgramsMap.ambassador.find(
        (o) => o.level === parentData.ambassador_level
      );
      break;

    case isSunriseMember:
      programData = sunriseProgramsMap.sunrise.find(
        (o) => o.name === sunriseStatus
      );
      break;

    default:
      programData = sunriseProgramsMap.default.find(
        (o) => o.name === sunriseStatus
      );
  }
  return {
    icon: programData?.icon || null,
    name: programData?.name || 'zero',
  };
}
