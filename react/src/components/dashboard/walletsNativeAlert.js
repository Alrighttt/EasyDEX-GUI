import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNativeAlert extends React.Component {
  render() {
    if (this.props && this.props.Dashboard && !this.props.Dashboard.progress) {
      return (
        <div role="alert" className="alert alert-danger alert-dismissible" data-extcoin="COIN" id="extcoin-wallet-connection-alert">
          <button aria-label="Close" data-dismiss="alert" className="close" type="button">
            <span aria-hidden="true">×</span>
          </button>
          <h4>{translate('INDEX.OOPS_ERROR')}</h4>
          <p data-extcoin="COIN" id="extcoin-wallet-connection-alert-text">
            <span>{translate('INDEX.OOPS_ERROR_DESC')}</span>
            <code>server=1</code><br/>
            <code>rpcport=</code><br/>
            <code>rpcuser=</code><br/>
            <code>rpcpassword=</code>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WalletsNativeAlert;
