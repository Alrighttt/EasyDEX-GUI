import Config, {
  token,
  agamaPort,
  rpc2cli,
} from '../../config';
import {
  getDecryptedPassphrase,
  getPinList,
  triggerToaster,
  shepherdElectrumAuth,
} from '../actionCreators';
import translate from '../../translate/translate';
import urlParams from '../../util/url';
import fetchType from '../../util/fetchType';
import Store from '../../store';

export const encryptPassphrase = (string, key, suppressToastr, customPinName) => {
  const payload = {
    string,
    key,
    token,
    pubkey: customPinName,
  };

  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${agamaPort}/shepherd/encryptkey`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'encryptKey',
          'Error',
          'error'
        )
      );
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      if (!suppressToastr) {
        Store.dispatch(
          triggerToaster(
            translate('INDEX.PASSPHRASE_SUCCESSFULLY_ENCRYPTED'),
            translate('KMD_NATIVE.SUCCESS'),
            'success'
          )
        );
      }
      resolve(json);
    });
  });
}

export const loginWithPin = (key, pubkey) => {
  const payload = {
    key,
    pubkey,
    token,
  };

  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${agamaPort}/shepherd/decryptkey`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'decryptKey',
          'Error',
          'error'
        )
      );
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg === 'success') {
        resolve(json);
      } else {
        Store.dispatch(
          triggerToaster(
            json.result,
            translate('API.PIN_DECRYPT_ERR'),
            'error'
          )
        );
        resolve(json);
      }
    });
  });
}

export const modifyPin = (pubkey, remove, pubkeynew) => {
  const payload = remove ? {
    pubkey,
    delete: true,
    token,
  } : {
    pubkey,
    pubkeynew,
    token,
  };

  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${agamaPort}/shepherd/modifypin`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'modifyPin',
          'Error',
          'error'
        )
      );
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg === 'success') {
        resolve(json);
      } else {
        Store.dispatch(
          triggerToaster(
            json.result,
            translate('API.PIN_MODIFY_ERR'),
            'error'
          )
        );
        resolve(json);
      }
    });
  });
}

export const loadPinList = () => {
  return dispatch => {
    const _urlParams = {
      token,
    };
    return fetch(
      `http://127.0.0.1:${agamaPort}/shepherd/getpinlist${urlParams(_urlParams)}`,
      fetchType.get
    )
    .catch((error) => {
      console.log(error);
      dispatch(
        triggerToaster(
          'getPinList',
          'Error',
          'error'
        )
      );
    })
    .then(response => response.json())
    .then(json => {
      dispatch(
        getPinList(json.result)
      );
    });
  }
}

export const changePin = (oldKey, newKey, pubkey) => {
  const payload = {
    key: oldKey,
    pubkey,
    token,
  };

  return new Promise((resolve, reject) => {
    fetch(
      `http://127.0.0.1:${agamaPort}/shepherd/decryptkey`,
      fetchType(JSON.stringify(payload)).post
    )
    .catch((error) => {
      console.log(error);
      Store.dispatch(
        triggerToaster(
          'decryptKey',
          'Error',
          'error'
        )
      );
      resolve({ msg: 'error' });
    })
    .then(response => response.json())
    .then(json => {
      if (json.msg === 'success') {
        const string = json.result;
        // resolve(json);
        // encrypt seed with a new key
        const payload = {
          string,
          key: newKey,
          token,
          pubkey,
        };

        fetch(
          `http://127.0.0.1:${agamaPort}/shepherd/encryptkey`,
          fetchType(JSON.stringify(payload)).post
        )
        .catch((error) => {
          console.log(error);
          Store.dispatch(
            triggerToaster(
              'encryptKey',
              'Error',
              'error'
            )
          );
          resolve({ msg: 'error' });
        })
        .then(response => response.json())
        .then(json => {
          resolve(json);
        });
      } else {
        Store.dispatch(
          triggerToaster(
            json.result,
            translate('API.PIN_DECRYPT_ERR'),
            'error'
          )
        );
        resolve(json);
      }
    });
  });
}