import i18n from '@utils/i18n';

export const REQUEST_TYPES = {
  withdraw: 'withdraw',
  transfer: 'transfer',
  p2ptransfer: 'p2ptransfer',
};

export const REQUEST_TYPES_LABELS = {
  withdraw: i18n.t('requestTypes:withdraw'),
  transfer: i18n.t('requestTypes:transfer'),
  p2ptransfer: i18n.t('requestTypes:p2ptransfer'),
};
