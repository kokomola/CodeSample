/* export type KycCreds = {
  screeningToken: string | null;
  userId: string | null;
};
 */
export enum ScreeningStatus {
  Initiated = 'Initiated',
  Processing = 'Processing',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}
