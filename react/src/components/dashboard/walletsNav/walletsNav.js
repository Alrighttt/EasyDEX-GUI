import React from 'react';
import {
  copyCoinAddress,
  iguanaEdexBalance,
  toggleSendCoinForm,
  toggleReceiveCoinForm,
  toggleSendReceiveCoinForms,
  toggleDashboardActiveSection
} from '../../../actions/actionCreators';
import Store from '../../../store';
import Config from '../../../config';
import {
  WalletsNavNoWalletRender,
  WalletsNavWithWalletRender
} from './walletsNav.render';

class WalletsNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nativeOnly: Config.iguanaLessMode,
    };
    this.toggleSendReceiveCoinForms = this.toggleSendReceiveCoinForms.bind(this);
    this.toggleNativeWalletInfo = this.toggleNativeWalletInfo.bind(this);
    this.toggleNativeWalletTransactions = this.toggleNativeWalletTransactions.bind(this);
  }

  componentWillMount() {
    Store.dispatch(iguanaEdexBalance(this.props.ActiveCoin.coin));
  }

  copyMyAddress(address) {
    Store.dispatch(copyCoinAddress(address));
  }

  toggleSendReceiveCoinForms() {
    if (this.props.ActiveCoin.mode === 'native') {
      Store.dispatch(
        toggleDashboardActiveSection(
          this.props.ActiveCoin.nativeActiveSection === 'settings' ? 'default' : 'settings'
        )
      );
    } else {
      Store.dispatch(toggleSendReceiveCoinForms());
    }
  }

  toggleNativeWalletInfo() {
    Store.dispatch(toggleDashboardActiveSection('settings'));
  }

  toggleNativeWalletTransactions() {
    Store.dispatch(toggleDashboardActiveSection('default'));
  }

  toggleSendCoinForm(display) {
    if (this.props.ActiveCoin.mode === 'native') {
      Store.dispatch(
        toggleDashboardActiveSection(
          this.props.ActiveCoin.nativeActiveSection === 'send' ? 'default' : 'send'
        )
      );
    } else {
      Store.dispatch(toggleSendCoinForm(display));
    }
  }

  toggleReceiveCoinForm(display) {
    if (this.props.ActiveCoin.mode === 'native') {
      Store.dispatch(
        toggleDashboardActiveSection(
          this.props.ActiveCoin.nativeActiveSection === 'receive' ? 'default' : 'receive'
        )
      );
    } else {
      Store.dispatch(toggleReceiveCoinForm(display));
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        !this.props.ActiveCoin.coin) {
      return WalletsNavNoWalletRender.call(this);
    }

    return WalletsNavWithWalletRender.call(this);
  }
}

export default WalletsNav;
