import { SunriseProgramsFullMap } from '@utils/sunriseMaps';

export interface SunriseProfileInfoProps {
  sunriseProgramsFullMap: SunriseProgramsFullMap;
}
// passing map (object with hardcoded values) since useTranslation hook not translates values on language change in case of map usage(solution is taken from web front-end)
