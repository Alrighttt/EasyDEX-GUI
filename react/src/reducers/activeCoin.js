import {
  DASHBOARD_ACTIVE_COIN_CHANGE,
  DASHBOARD_ACTIVE_COIN_BALANCE,
  DASHBOARD_ACTIVE_COIN_SEND_FORM,
  DASHBOARD_ACTIVE_COIN_RECEIVE_FORM,
  DASHBOARD_ACTIVE_COIN_RESET_FORMS,
  DASHBOARD_ACTIVE_SECTION,
  DASHBOARD_ACTIVE_TXINFO_MODAL,
  ACTIVE_COIN_GET_ADDRESSES,
  DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE,
  DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY,
  DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS
} from '../actions/actionCreators';

export function ActiveCoin(state = {
  coin: null,
  mode: null,
  send: false,
  receive: false,
  balance: 0,
  nativeActiveSection: 'default',
  showTransactionInfo: false,
  showTransactionInfoTxIndex: null,
  txhistory: [],
  opids: null,
}, action) {
  switch (action.type) {
    case DASHBOARD_ACTIVE_COIN_CHANGE:
      return Object.assign({}, state, {
        coin: action.coin,
        mode: action.mode,
        balance: 0,
        txhistory: [],
        send: false,
        receive: false,
        showTransactionInfo: false,
        showTransactionInfoTxIndex: null,
        nativeActiveSection: 'default',
      });
    case DASHBOARD_ACTIVE_COIN_BALANCE:
      return Object.assign({}, state, {
        balance: action.balance,
      });
    case DASHBOARD_ACTIVE_COIN_SEND_FORM:
      return Object.assign({}, state, {
        send: action.send,
        receive: false,
      });
    case DASHBOARD_ACTIVE_COIN_RECEIVE_FORM:
      return Object.assign({}, state, {
        send: false,
        receive: action.receive,
      });
    case DASHBOARD_ACTIVE_COIN_RESET_FORMS:
      return Object.assign({}, state, {
        send: false,
        receive: false,
      });
    case ACTIVE_COIN_GET_ADDRESSES:
      return Object.assign({}, state, {
        addresses: action.addresses,
      });
    case DASHBOARD_ACTIVE_SECTION:
      return Object.assign({}, state, {
        nativeActiveSection: action.section,
      });
    case DASHBOARD_ACTIVE_TXINFO_MODAL:
      return Object.assign({}, state, {
        showTransactionInfo: action.showTransactionInfo,
        showTransactionInfoTxIndex: action.showTransactionInfoTxIndex,
      });
    case DASHBOARD_ACTIVE_COIN_NATIVE_BALANCE:
      return Object.assign({}, state, {
        balance: action.balance,
      });
    case DASHBOARD_ACTIVE_COIN_NATIVE_TXHISTORY:
      return Object.assign({}, state, {
        txhistory: action.txhistory,
      });
    case DASHBOARD_ACTIVE_COIN_NATIVE_OPIDS:
      return Object.assign({}, state, {
        opids: action.opids,
      });
    default:
      return state;
  }
}

export default ActiveCoin;
