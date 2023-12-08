export const getMonthInRussian = (num: number): string | undefined => {
  if (typeof num !== 'number') return;
  if ((num < 0) | (num >= 12)) return;
  switch (num) {
    case 0:
      return 'Январь';
    case 1:
      return 'Февраль';
    case 2:
      return 'Март';
    case 3:
      return 'Апрель';
    case 4:
      return 'Май';
    case 5:
      return 'Июнь';
    case 6:
      return 'Июль';
    case 7:
      return 'Август';
    case 8:
      return 'Сентябрь';
    case 9:
      return 'Октябрь';
    case 10:
      return 'Ноябрь';
    case 11:
      return 'Декабрь';
    default:
      return '';
  }
};

export const getMonthInTurkey = (num: number): string | undefined => {
  if (typeof num !== 'number') return;
  if ((num < 0) | (num >= 12)) return;
  switch (num) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      return '';
  }
};
export const getMonthInEnglish = (num: number): string | undefined => {
  if (typeof num !== 'number') return;
  if ((num < 0) | (num >= 12)) return;
  switch (num) {
    case 0:
      return 'Ocak';
    case 1:
      return 'Şubat';
    case 2:
      return 'Mart';
    case 3:
      return 'Nisan';
    case 4:
      return 'Mayıs';
    case 5:
      return 'Haziran';
    case 6:
      return 'Temmuz';
    case 7:
      return 'Ağustos';
    case 8:
      return 'Eylül';
    case 9:
      return 'Ekim';
    case 10:
      return 'Kasım';
    case 11:
      return 'Aralık';
    default:
      return '';
  }
};
