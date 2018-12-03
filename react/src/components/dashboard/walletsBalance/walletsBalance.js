import React from 'react';
import { connect } from 'react-redux';
import translate from '../../../translate/translate';
import {
  getDashboardUpdate,
  apiElectrumBalance,
  apiEthereumBalance,
} from '../../../actions/actionCreators';
import mainWindow from '../../../util/mainWindow';
import Config from '../../../config';
import ReactTooltip from 'react-tooltip';
import { secondsToString } from 'agama-wallet-lib/src/time';
import { formatValue } from 'agama-wallet-lib/src/utils';
import Store from '../../../store';
import FiatSymbol from '../fiat/fiatSymbol';

import WalletsBalanceRender from './walletsBalance.render';

class WalletsBalance extends React.Component {
  constructor() {
    super();
    this.state = {
      currentAddress: null,
      loading: false,
    };
    this.isFullySynced = this.isFullySynced.bind(this);
    this.refreshBalance = this.refreshBalance.bind(this);
  }

  componentWillReceiveProps(props) {
    const _activeAddress = this.props.ActiveCoin.activeAddress;

    if (_activeAddress) {
      this.setState(Object.assign({}, this.state, {
        currentAddress: _activeAddress,
      }));
    }
  }

  isFullySynced() {
    const _progress = this.props.ActiveCoin.progress;

    if (_progress &&
        (Number(_progress.balances) +
        Number(_progress.validated) +
        Number(_progress.bundles) +
        Number(_progress.utxo)) / 4 === 100) {
      return true;
    } else {
      return false;
    }
  }

  refreshBalance() {
    const _mode = this.props.ActiveCoin.mode;
    const _coin = this.props.ActiveCoin.coin;

    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);

    if (_mode === 'native') {
      Store.dispatch(getDashboardUpdate(_coin));
    } else if (_mode === 'spv') {
      const _pub = this.props.Dashboard.electrumCoins[_coin].pub;

      Store.dispatch(
        apiElectrumBalance(
          _coin,
          _pub
        )
      );
    } else if (_mode === 'eth') {
      const _pub = this.props.Dashboard.ethereumCoins[_coin].pub;

      Store.dispatch(
        apiEthereumBalance(
          _coin,
          _pub
        )
      );
    }
  }

  renderBalance(type, returnFiatPrice) {
    const _mode = this.props.ActiveCoin.mode;
    const _propsBalance = this.props.ActiveCoin.balance;
    let _balance = 0;

    if (_propsBalance === 'connection error or incomplete data') {
      _balance = '-777';
    } else {
      if (_mode === 'native') {
        if (_propsBalance &&
          _propsBalance[type]) {
          _balance = _propsBalance[type];
        }
      } else if (
        _mode === 'spv' &&
        _propsBalance
      ) {
        if (this.props.ActiveCoin.coin === 'KMD') {
          if (type === 'total' &&
              _propsBalance &&
              _propsBalance.total) {
            _balance = Number(_propsBalance.total) + Number(_propsBalance.unconfirmed);
          }

          if (type === 'interest' &&
              _propsBalance &&
              _propsBalance.interest) {
            _balance = _propsBalance.interest;
          }

          if (type === 'transparent' &&
              _propsBalance &&
              _propsBalance.balance) {
            _balance = Number(_propsBalance.balance) + Number(_propsBalance.unconfirmed);
          }
        } else {
          _balance = Number(_propsBalance.balance) + Number(_propsBalance.unconfirmed);
        }

        _balance = _balance.toFixed(8);
      } else if (
        _mode === 'eth' &&
        _propsBalance
      ) {
        _balance = Number(_propsBalance.balance).toFixed(8);        
      }
    }

    if (mainWindow.appConfig.fiatRates &&
        this.props.Dashboard.prices &&
        returnFiatPrice) {
      const _prices = this.props.Dashboard.prices;
      const _defaultFiat = Config.defaultFiatCurrency.toUpperCase();
      const _coin = this.props.ActiveCoin.coin;
      const _fiatPriceTotal = _balance * _prices[_coin];
      const _fiatPricePerCoin = _prices[_coin];

      return (
        <div>
          <div className="text-right">{ _balance }</div>
          { _fiatPriceTotal > 0 &&
            _fiatPricePerCoin > 0 &&
            <div
              data-tip={ `${translate('INDEX.PRICE_PER_1')} ${_coin} ~ ${formatValue(_fiatPricePerCoin)} ${_defaultFiat}` }
              data-html={ true }
              data-for="balance1"
              className="text-right">
              <FiatSymbol symbol={ Config.defaultFiatCurrency } />{ formatValue(_fiatPriceTotal) }
            </div>
          }
          <ReactTooltip
            id="balance1"
            effect="solid"
            className="text-left" />
        </div>
      );
    } else {
      if (Config.roundValues) {
        return formatValue(_balance);
      } else {
        return Number(_balance);
      }
    }
  }

  isActiveCoinMode(coinMode) {
    return this.props.ActiveCoin.mode === coinMode;
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span key={ `translate-${Math.random(0, 9) * 10}` }>
        {_translation}
        <br />
      </span>
    );
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.coin &&
        this.props.ActiveCoin.activeSection === 'default' &&
        !this.props.ActiveCoin.send &&
        !this.props.ActiveCoin.receive) {
      return WalletsBalanceRender.call(this);
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    ActiveCoin: {
      coin: state.ActiveCoin.coin,
      mode: state.ActiveCoin.mode,
      send: state.ActiveCoin.send,
      receive: state.ActiveCoin.receive,
      balance: state.ActiveCoin.balance,
      cache: state.ActiveCoin.cache,
      activeSection: state.ActiveCoin.activeSection,
      activeAddress: state.ActiveCoin.activeAddress,
      progress: state.ActiveCoin.progress,
    },
    Dashboard: state.Dashboard,
  };
};

export default connect(mapStateToProps)(WalletsBalance);