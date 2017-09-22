// remove

import { DASHBOARD_ACTIVE_COIN_BALANCE } from '../storeType';
import { triggerToaster } from '../actionCreators';
import Config from '../../config';

export function iguanaEdexBalance(coin) {
  const _payload = {
    userpass: `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
    agent: 'bitcoinrpc',
    method: 'getbalance',
    coin: coin,
  };

  return dispatch => {
    if (coin) {
      return fetch(`http://127.0.0.1:${Config.iguanaCorePort}`, {
        method: 'POST',
        body: JSON.stringify(_payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(
          triggerToaster(
            'Error iguanaEdexBalance',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(json => dispatch(iguanaEdexBalanceState(json)));
    }
  }
}

function iguanaEdexBalanceState(json) {
  return {
    type: DASHBOARD_ACTIVE_COIN_BALANCE,
    balance: json && json.result ? json.result : 0,
  }
}

export function getDexBalance(coin, mode, addr) {
  Promise.all(addr.map((_addr, index) => {
    const payload = {
      userpass: `tmpIgRPCUser@${sessionStorage.getItem('IguanaRPCAuth')}`,
      agent: 'dex',
      method: 'listunspent',
      address: _addr,
      symbol: coin,
    };

    return new Promise((resolve, reject) => {
      fetch(`http://127.0.0.1:${Config.useBasiliskInstance ? Config.iguanaCorePort + 1 : Config.iguanaCorePort}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      .catch(function(error) {
        console.log(error);
        dispatch(
          triggerToaster(
            'getDexBalance',
            'Error',
            'error'
          )
        );
      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })

      resolve(index);
    });
  }))
  .then(result => {
    console.log(result);
  });
}