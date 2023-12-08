export type SunriseProgramsInfoCardProps = {
  programType: 'default' | 'sunrise' | 'ambassador';
  priveleges: string;
  gifts: string;
  icon: string;
  status: string;
  depositAmount?: string;
  conditions?: string;
  // for ambassdors only:
  minLevel?: string;
  monthlyReward?: string;
  // for sunrise only:
  income?: string;
};
