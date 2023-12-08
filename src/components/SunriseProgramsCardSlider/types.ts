import { SunriseProgramsFullMap } from '@utils/sunriseMaps';

export interface SunriseProgramsCardSliderProps {
  sunriseProgramsFullMap: SunriseProgramsFullMap;
  programType: 'ambassador' | 'default' | 'sunrise';
}
// sunriseProgramsFullMap is passed because of useTranslation hook bug happens when we apply to the variables with i18next out of function component (it doesn't translate to ru language)
