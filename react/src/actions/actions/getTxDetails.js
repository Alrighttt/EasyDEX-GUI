import { triggerToaster } from '../actionCreators';
import Config, {
  token,
  agamaPort,
  rpc2cli,
} from '../../config';
import Store from '../../store';
import fetchType from '../../util/fetchType';
import mainWindow from '../util/mainWindow';

export const getTxDetails = (coin, txid, type) => {
  return new Promise((resolve, reject) => {
    let payload = {
      mode: null,
      chain: coin,
      cmd: 'gettransaction',
      params: [
        txid
      ],
      rpc2cli,
      token,
    };

    if (type === 'raw') {
      payload = {
        mode: null,
        chain: coin,
        cmd: 'getrawtransaction',
        params: [
          txid,
          1
        ],
        rpc2cli,
        token,
      };
    }

    fetch(
      `http://127.0.0.1:${agamaPort}/shepherd/cli`,
      fetchType(JSON.stringify({ payload })).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'getTransaction',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      if (mainWindow.activeCoin === coin) {
        resolve(json.result ? json.result : json);
      }
    });
  });
}