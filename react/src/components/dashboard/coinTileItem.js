import React from 'react';
import { translate } from '../../translate/translate';
import {
  dashboardChangeActiveCoin,
  iguanaActiveHandle,
  getAddressesByAccount,
  getSyncInfo,
  startInterval,
  stopInterval,
  iguanaEdexBalance,
  getSyncInfoNative,
  getKMDBalanceTotal,
  getNativeTxHistory,
  getKMDAddressesNative,
  getKMDOPID,
  getFullTransactionsList,
  getBasiliskTransactionsList,
  getShepherdCache,
  fetchNewCacheData
} from '../../actions/actionCreators';
import Store from '../../store';

class CoinTileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // TODO: 1) cache native/full node data to file
  //       2) limit amount of req per update e.g. list of addresses don't change too often
  //       3) limit req in basilisk as much as possible incl. activehandle
  //       4) add pending requests store

  dispatchCoinActions(coin, mode) {
    if (mode === 'native') {
      Store.dispatch(iguanaActiveHandle(true));
      Store.dispatch(getSyncInfoNative(coin));
      Store.dispatch(getKMDBalanceTotal(coin));
      Store.dispatch(getNativeTxHistory(coin));
      Store.dispatch(getKMDAddressesNative(coin, mode));
      Store.dispatch(getKMDOPID(null, coin));
    }
    if (mode === 'full') {
      Store.dispatch(iguanaActiveHandle(true));
      Store.dispatch(getSyncInfo(coin));
      Store.dispatch(iguanaEdexBalance(coin, mode));
      Store.dispatch(getKMDAddressesNative(coin, mode)); //getAddressesByAccount(coin));
      Store.dispatch(getFullTransactionsList(coin));
    }
    if (mode === 'basilisk') {
      const useAddress = this.props.ActiveCoin.mainBasiliskAddress ? this.props.ActiveCoin.mainBasiliskAddress : this.props.Dashboard.activeHandle[coin];
      Store.dispatch(iguanaActiveHandle(true));

      if (this.props && this.props.Dashboard && this.props.Dashboard.activeHandle && this.props.Dashboard.activeHandle[coin]) {
        Store.dispatch(getShepherdCache(this.props.Dashboard.activeHandle.pubkey));
        Store.dispatch(getBasiliskTransactionsList(coin, useAddress));
        Store.dispatch(getKMDAddressesNative(coin, mode, useAddress));
        Store.dispatch(iguanaEdexBalance(coin, mode));
      }
    }
  }

  dashboardChangeActiveCoin(coin, mode) {
    if (coin !== this.props.ActiveCoin.coin) {
      Store.dispatch(stopInterval('sync', this.props.Interval.interval));
      Store.dispatch(stopInterval('basilisk', this.props.Interval.interval));
      Store.dispatch(dashboardChangeActiveCoin(coin, mode));

      this.dispatchCoinActions(coin, mode);
      if (mode === 'full') {
        var _iguanaActiveHandle = setInterval(function() {
          this.dispatchCoinActions(coin, mode);
        }.bind(this), 3000);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
      }
      if (mode === 'native') {
        // TODO: add conditions to skip txhistory, balances, addresses while "activating best chain"
        var _iguanaActiveHandle = setInterval(function() {
          this.dispatchCoinActions(coin, mode);
        }.bind(this), coin === 'KMD' ? 15000 : 3000);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
      }
      if (mode === 'basilisk') {
        var _iguanaActiveHandle = setInterval(function() {
          this.dispatchCoinActions(coin, mode);
        }.bind(this), 3000);

        var _basiliskCache = setInterval(function() {
          if (sessionStorage.getItem('useCache')) {
            Store.dispatch(fetchNewCacheData({
              'pubkey': this.props.Dashboard.activeHandle.pubkey,
              'allcoins': false,
              'coin': this.props.ActiveCoin.coin,
              'calls': 'listtransactions:getbalance',
            }));
          }
        }.bind(this), 60000);
        Store.dispatch(startInterval('sync', _iguanaActiveHandle));
        Store.dispatch(startInterval('basilisk', _basiliskCache));
        // basilisk
      }
    }
  }

  render() {
    const { item } = this.props;

    return (
      <div className="list-group-item col-xlg-6 col-lg-12 wallet-widgets-info" data-edexcoincode="{item.coin}">
        <div className={this.props.ActiveCoin.coin === item.coin ? 'widget widget-shadow active' : 'widget widget-shadow'}>
          <div className="widget-content text-center bg-white padding-20 edexcoin-logo" data-edexcoincode="{item.coin}" data-edexcoinmodecode="{item.modecode}" data-edexcoinname="{item.coinname}" onClick={() => this.dashboardChangeActiveCoin(item.coin, item.mode)}>
            <a className="avatar margin-bottom-5" href="javascript:void(0)" id="edexcoin-logo">
              <img className="img-responsive" src={'assets/images/cryptologo/' + item.coinlogo + '.png'} alt="{item.coinname}"/>
              <span className={'badge up badge-' + item.modecolor} id="basfull" data-edexcoincode="{item.coin}" data-toggle="tooltip" data-placement="top" data-original-title="{item.modetip}">{item.modecode}</span>
            </a>
            <div className="coin-name">{item.coinname} ({item.coinlogo.toUpperCase()})</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinTileItem;
