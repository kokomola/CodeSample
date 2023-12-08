/* eslint-disable camelcase */
import { P2PExchangeFee } from '@components/uikit/Icon/lib';
import * as colors from '@constants/colors';

export const operationTypes: Record<string, Record<string, string>> = {
  input: {
    color: colors.oceanGreen,
    label: 'input',
    icon: 'plus',
  },
  income: {
    color: colors.oceanGreen,
    label: 'income',
    icon: 'plus',
  },
  interest_accrual_income: {
    color: colors.oceanGreen,
    label: 'interest_accrual_income',
    icon: 'plus',
  },
  interest_accrual_income_amir_cell: {
    color: colors.oceanGreen,
    label: 'interest_accrual_income_cell',
    icon: 'plus',
  },
  interest_accrual_income_cell: {
    color: colors.oceanGreen,
    label: 'interest_accrual_cell',
    icon: 'plus',
  },
  commision_1: {
    color: colors.oceanGreen,
    label: 'commision_1',
    icon: 'plus',
  },
  commision_2: {
    color: colors.oceanGreen,
    label: 'commision_2',
    icon: 'plus',
  },
  commision_3: {
    color: colors.oceanGreen,
    label: 'commision_3',
    icon: 'plus',
  },
  commision_4: {
    color: colors.oceanGreen,
    label: 'commision_4',
    icon: 'plus',
  },
  commision_5: {
    color: colors.oceanGreen,
    label: 'commision_5',
    icon: 'plus',
  },
  transfer_from: {
    color: colors.azure,
    label: 'transfer_from',
    icon: 'exchange',
  },
  transfer_input: {
    color: colors.azure,
    label: 'transfer_input',
    icon: 'exchange',
  },
  transfer: {
    color: colors.azure,
    label: 'transfer',
    icon: 'exchange',
  },
  bonus: {
    color: colors.oceanGreen,
    label: 'bonus',
    icon: 'gift',
  },
  stable_base: {
    color: colors.azure,
    label: 'stable_base',
    icon: 'flare',
  },
  stable_create: {
    color: colors.azure,
    label: 'stable_create',
    icon: 'flare',
  },
  stable_refund: {
    color: colors.fieryRose,
    label: 'stable_refund',
    icon: 'flare',
  },
  stable_income: {
    color: colors.oceanGreen,
    label: 'stable_income',
    icon: 'plus',
  },
  stable_decrease: {
    color: colors.azure,
    label: 'stable_decrease',
    icon: 'flare',
  },
  new_stable_base: {
    color: colors.azure,
    label: 'new_stable_base',
    icon: 'flare',
  },
  new_stable_create: {
    color: colors.azure,
    label: 'new_stable_create',
    icon: 'flare',
  },
  new_stable_refund: {
    color: colors.fieryRose,
    label: 'new_stable_refund',
    icon: 'flare',
  },
  new_stable_income: {
    color: colors.oceanGreen,
    label: 'new_stable_income',
    icon: 'flare',
  },
  new_stable_withdraw: {
    color: colors.oceanGreen,
    label: 'new_stable_withdraw',
    icon: 'flare',
  },
  new_stable_decrease: {
    color: colors.azure,
    label: 'new_stable_decrease',
    icon: 'flare',
  },
  withdraw: {
    color: colors.fieryRose,
    label: 'withdraw',
    icon: 'chevronDoubleRight',
  },
  withdraw_fee: {
    color: colors.fieryRose,
    label: 'withdraw_fee',
    icon: 'chevronDoubleRight',
  },
  withdraw_in_process: {
    color: colors.fieryRose,
    label: 'withdraw_in_process',
    icon: 'chevronDoubleRight',
  },
  transfer_in_process: {
    color: colors.fieryRose,
    label: 'transfer_in_process',
    icon: 'chevronRight',
  },
  p2p_transfer_output: {
    color: colors.fieryRose,
    label: 'p2p_transfer_output',
    icon: 'chevronRight',
  },
  p2p_transfer_input: {
    color: colors.oceanGreen,
    label: 'p2p_transfer_input',
    icon: 'chevronRight',
  },
  amir_cell_create_decrease: {
    color: colors.azure,
    label: 'amir_cell_create_decrease',
    icon: 'minus',
  },
  amir_cell_cancel: {
    color: colors.fieryRose,
    label: 'amir_cell_cancel',
    icon: 'plus',
  },
  Confirmed: {
    color: colors.azure,
    label: 'Confirmed',
    icon: 'plus',
  },
  Pending: {
    color: colors.fieryRose,
    label: 'Pending',
    icon: 'plus',
  },
  Confirming: {
    color: colors.fieryRose,
    label: 'Confirming',
    icon: 'plus',
  },
  Failed: {
    color: colors.fieryRose,
    label: 'Failed',
    icon: 'plus',
  },
  order_decrease: {
    color: colors.azure,
    label: 'order_decrease',
    icon: 'gift',
  },
  solar_buy: {
    color: colors.oceanGreen,
    label: 'solar_buy',
    icon: 'chevronDown',
  },
  reward_activity: {
    color: colors.oceanGreen,
    label: 'reward_activity',
    icon: 'plus',
  },
  reward_structure_usdt: {
    color: colors.oceanGreen,
    label: 'reward_structure_usdt',
    icon: 'plus',
  },
  interest_accrual_solar_income: {
    color: colors.oceanGreen,
    label: 'interest_accrual_solar_income',
    icon: 'plus',
  },
  reward_partners: {
    color: colors.oceanGreen,
    label: 'reward_partners',
    icon: 'plus',
  },
  income_deposit: {
    color: colors.oceanGreen,
    label: 'income_deposit',
    icon: 'plus',
  },
  income_structure: {
    color: colors.oceanGreen,
    label: 'income_structure',
    icon: 'plus',
  },
  admin_transfer: {
    color: colors.oceanGreen,
    label: 'admin_transfer',
    icon: 'exchange',
  },
  admin_decrease: {
    color: colors.fieryRose,
    label: 'admin_decrease',
    icon: 'exchange',
  },
  order_refund: {
    color: colors.oceanGreen,
    label: 'order_refund',
    icon: 'exchange',
  },
  commision: {
    color: colors.oceanGreen,
    label: 'commision',
    icon: 'plus',
  },
  buy: {
    color: colors.oceanGreen,
    label: 'buy',
    icon: 'chevronDown',
  },
  buy_token: {
    color: colors.oceanGreen,
    label: 'buy_token',
    icon: 'chevronDown',
  },
  create: {
    color: colors.oceanGreen,
    label: 'create',
    icon: 'plus',
  },
  sell: {
    color: colors.fieryRose,
    label: 'sell',
    icon: 'chevronUp',
  },
  sollar_buy: {
    color: colors.oceanGreen,
    label: 'buy',
    icon: 'plus',
  },
  sollar_gift: {
    color: colors.fieryRose,
    label: 'sollar_gift',
    icon: 'gift',
  },
  debit: {
    color: colors.fieryRose,
    label: 'debit',
    icon: 'minus',
  },
  additional: {
    color: colors.oceanGreen,
    label: 'additional',
    icon: 'plus',
  },
  p2p_exchange_fee: {
    color: colors.fieryRose,
    label: 'p2p_exchange_fee',
    icon: 'minus',
    //icon: P2PExchangeFee,
  },
  p2p_exchange_debit: {
    color: colors.fieryRose,
    label: 'p2p_exchange_debit',
    icon: 'minus',
  },
  sell_token: {
    color: colors.oceanGreen,
    label: 'sell_token',
    icon: 'plus',
  },
  p2p_exchange_buy: {
    color: colors.oceanGreen,
    label: 'p2p_exchange_buy',
    icon: 'plus',
  },
  p2p_exchange_refund_fee: {
    color: colors.oceanGreen,
    label: 'p2p_exchange_refund_fee',
    icon: 'plus',
  },
  p2p_exchange_refund: {
    color: colors.oceanGreen,
    label: 'p2p_exchange_refund',
    icon: 'plus',
  },
};
