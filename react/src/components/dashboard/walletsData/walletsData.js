import React from 'react';
import { translate } from '../../../translate/translate';
import { sortByDate } from '../../../util/sort';
import {
  Config,
  basiliskRefresh,
  basiliskConnection,
  toggleDashboardTxInfoModal,
  getBasiliskTransactionsList,
  changeMainBasiliskAddress,
  displayNotariesModal,
  toggleViewCacheModal,
  changeActiveAddress,
  restartBasiliskInstance,
  connectNotaries,
  getDexNotaries,
  deleteCacheFile,
  fetchNewCacheData,
  fetchUtxoCache
} from '../../../actions/actionCreators';
import Store from '../../../store';
import {
  AddressTypeRender,
  TransactionDetailRender,
  AddressItemRender,
  TxHistoryListRender,
  AddressListRender,
  WalletsDataRender
} from  './walletsData.render';
import { secondsToString } from '../../../util/time';

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

const socket = io.connect(`http://127.0.0.1:${Config.agamaPort}`);

class WalletsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basiliskActionsMenu: false,
      itemsPerPage: 10,
      activePage: 1,
      itemsList: [],
      currentAddress: null,
      addressSelectorOpen: false,
      currentStackLength: 0,
      totalStackLength: 0,
      useCache: true,
      itemsListColumns: this.generateItemsListColumns()
    };

    this.toggleBasiliskActionsMenu = this.toggleBasiliskActionsMenu.bind(this);
    this.basiliskRefreshAction = this.basiliskRefreshAction.bind(this);
    this.basiliskConnectionAction = this.basiliskConnectionAction.bind(this);
    this.getDexNotariesAction = this.getDexNotariesAction.bind(this);
    this.openDropMenu = this.openDropMenu.bind(this);
    this.removeAndFetchNewCache = this.removeAndFetchNewCache.bind(this);
    this._toggleViewCacheModal = this._toggleViewCacheModal.bind(this);
    this.toggleCacheApi = this.toggleCacheApi.bind(this);
    this._fetchUtxoCache = this._fetchUtxoCache.bind(this);
    this.restartBasiliskInstance = this.restartBasiliskInstance.bind(this);
    this.basiliskRefreshActionOne = this.basiliskRefreshActionOne.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    socket.on('messages', msg => this.updateSocketsData(msg));
  }

  componentWillMount() {
    document.addEventListener(
      'click',
      this.handleClickOutside,
      false
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click',
      this.handleClickOutside,
      false
    );
  }

  generateItemsListColumns() {
    let columns = [];

    if (this.isNativeMode()) {
      columns.push({
        Header: translate('INDEX.TYPE'),
        Footer: translate('INDEX.TYPE'),
        Cell: AddressTypeRender()
      });
    }

    columns.push(...[
      {
        id: 'direction',
        Header: translate('INDEX.DIRECTION'),
        Footer: translate('INDEX.DIRECTION'),
        accessor: (tx) => this.renderTxType(tx.category || tx.type)
      },
      {
        Header: translate('INDEX.CONFIRMATIONS'),
        Footer: translate('INDEX.CONFIRMATIONS'),
        headerClassName: 'hidden-xs hidden-sm',
        footerClassName: 'hidden-xs hidden-sm',
        className: 'hidden-xs hidden-sm',
        accessor: 'confirmations'
      },
      {
        id: 'amount',
        Header: translate('INDEX.AMOUNT'),
        Footer: translate('INDEX.AMOUNT'),
        accessor: (tx) => tx.amount || translate('DASHBOARD.UNKNOWN')
      },
      {
        id: 'timestamp',
        Header: translate('INDEX.TIME'),
        Footer: translate('INDEX.TIME'),
        accessor: (tx) => secondsToString(tx.blocktime || tx.timestamp || tx.time)
      }
    ]);

    if (this.isFullMode()) {
      columns.push({
        Header: translate('INDEX.DEST_ADDRESS'),
        Footer: translate('INDEX.DEST_ADDRESS'),
        accessor: 'address'
      });
    }

    if (this.isNativeMode()) {
      columns.push({
        id: 'destination-address',
        Header: translate('INDEX.DEST_ADDRESS'),
        Footer: translate('INDEX.DEST_ADDRESS'),
        accessor: (tx) => this.renderAddress(tx)
      });
    }

    const txDetailColumnCssClasses = this.isBasiliskMode() ? 'hidden-xs hidden-sm text-center' : 'hidden-xs hidden-sm';

    columns.push({
      id: 'tx-detail',
      Header: translate('INDEX.TX_DETAIL'),
      Footer: translate('INDEX.TX_DETAIL'),
      headerClassName: txDetailColumnCssClasses,
      footerClassName: txDetailColumnCssClasses,
      className: txDetailColumnCssClasses,
      Cell: props => TransactionDetailRender.call(this, props.index)
    });

    return columns;
  }

  handleClickOutside(e) {
    if (e.srcElement.className !== 'btn dropdown-toggle btn-info' &&
        (e.srcElement.offsetParent && e.srcElement.offsetParent.className !== 'btn dropdown-toggle btn-info') &&
        (e.path && e.path[4] && e.path[4].className.indexOf('showkmdwalletaddrs') === -1) &&
        (e.srcElement.offsetParent && e.srcElement.offsetParent.className.indexOf('dropdown') === -1) &&
        e.srcElement.className !== 'dropdown-toggle btn-xs btn-default') {
      this.setState({
        addressSelectorOpen: false,
        basiliskActionsMenu: false,
      });
    }
  }

  // deprecated
  toggleCacheApi() {
    const _useCache = !this.state.useCache;

    sessionStorage.setItem('useCache', _useCache);
    this.setState(Object.assign({}, this.state, {
      useCache: _useCache,
    }));
  }

  restartBasiliskInstance() {
    Store.dispatch(restartBasiliskInstance());
  }

  _toggleViewCacheModal() {
    Store.dispatch(toggleViewCacheModal(!this.props.Dashboard.displayViewCacheModal));
  }

  updateSocketsData(data) {
    if (data &&
        data.message &&
        data.message.shepherd.iguanaAPI &&
        data.message.shepherd.iguanaAPI.totalStackLength) {
      this.setState(Object.assign({}, this.state, {
        totalStackLength: data.message.shepherd.iguanaAPI.totalStackLength,
      }));
    }
    if (data &&
        data.message &&
        data.message.shepherd.iguanaAPI &&
        data.message.shepherd.iguanaAPI.currentStackLength) {
      this.setState(Object.assign({}, this.state, {
        currentStackLength: data.message.shepherd.iguanaAPI.currentStackLength,
      }));
    }
    if (data &&
        data.message &&
        data.message.shepherd.method &&
        data.message.shepherd.method === 'cache-one' &&
        data.message.shepherd.status === 'done') {
      Store.dispatch(basiliskRefresh(false));
    }
  }

  removeAndFetchNewCache() {
    Store.dispatch(deleteCacheFile({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'listtransactions:getbalance',
      'address': this.state.currentAddress,
    }));
  }

  _fetchUtxoCache() {
    Store.dispatch(fetchUtxoCache({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'refresh',
      'address': this.state.currentAddress,
    }));
  }

  toggleBasiliskActionsMenu() {
    this.setState(Object.assign({}, this.state, {
      basiliskActionsMenu: !this.state.basiliskActionsMenu,
    }));
  }

  basiliskRefreshAction() {
    Store.dispatch(fetchNewCacheData({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'listtransactions:getbalance',
    }));
  }

  basiliskRefreshActionOne() {
    Store.dispatch(fetchNewCacheData({
      'pubkey': this.props.Dashboard.activeHandle.pubkey,
      'allcoins': false,
      'coin': this.props.ActiveCoin.coin,
      'calls': 'listtransactions:getbalance',
      'address': this.props.ActiveCoin.activeAddress,
    }));
  }

  basiliskConnectionAction() {
    if (this.props.Dashboard) {
      Store.dispatch(basiliskConnection(!this.props.Dashboard.basiliskConnection));
      Store.dispatch(connectNotaries());
    }
  }

  getDexNotariesAction() {
    Store.dispatch(getDexNotaries(this.props.ActiveCoin.coin));
    Store.dispatch(displayNotariesModal(true));
  }

  toggleTxInfoModal(display, txIndex) {
    Store.dispatch(toggleDashboardTxInfoModal(display, txIndex));
  }

  componentWillReceiveProps(props) {
    if (!this.state.currentAddress &&
        this.props.ActiveCoin.activeAddress) {
      this.setState(Object.assign({}, this.state, {
        currentAddress: this.props.ActiveCoin.activeAddress,
      }));
    }

    if (this.props.ActiveCoin.txhistory &&
        this.props.ActiveCoin.txhistory !== 'loading' &&
        this.props.ActiveCoin.txhistory !== 'no data' &&
        this.props.ActiveCoin.txhistory.length) {
      if (!this.state.itemsList ||
          (this.state.itemsList && !this.state.itemsList.length) ||
          (props.ActiveCoin.txhistory !== this.props.ActiveCoin.txhistory)) {
        this.setState(Object.assign({}, this.state, {
          itemsList: sortByDate(this.props.ActiveCoin.txhistory),
        }));
      }
    }

    if (this.props.ActiveCoin.txhistory &&
        this.props.ActiveCoin.txhistory === 'no data') {
      this.setState(Object.assign({}, this.state, {
        itemsList: 'no data',
      }));
    } else if (this.props.ActiveCoin.txhistory && this.props.ActiveCoin.txhistory === 'loading') {
      this.setState(Object.assign({}, this.state, {
        itemsList: 'loading',
      }));
    }

    this.setState({
      itemsListColumns: this.generateItemsListColumns()
    });
  }

  renderTxType(category) {
    if (category === 'send' ||
        category === 'sent') {
      return (
        <span className="label label-danger">
          <i className="icon fa-arrow-circle-left"></i> <span>{ translate('DASHBOARD.OUT') }</span>
        </span>
      );
    }
    if (category === 'receive' ||
        category === 'received') {
      return (
        <span className="label label-success">
          <i className="icon fa-arrow-circle-right"></i> <span>{ translate('DASHBOARD.IN') }</span>
        </span>
      );
    }
    if (category === 'generate') {
      return (
        <span>
          <i className="icon fa-cogs"></i> <span>{ translate('DASHBOARD.MINED') }</span>
        </span>
      );
    }
    if (category === 'immature') {
      return (
        <span>
          <i className="icon fa-clock-o"></i> <span>{ translate('DASHBOARD.IMMATURE') }</span>
        </span>
      );
    }
    if (category === 'unknown') {
      return (
        <span>
          <i className="icon fa-meh-o"></i> <span>{ translate('DASHBOARD.UNKNOWN') }</span>
        </span>
      );
    }
  }

  isFullySynced() {
    if (this.props.Dashboard.progress &&
        (Number(this.props.Dashboard.progress.balances) +
        Number(this.props.Dashboard.progress.validated) +
        Number(this.props.Dashboard.progress.bundles) +
        Number(this.props.Dashboard.progress.utxo)) / 4 === 100) {
      return true;
    } else {
      return false;
    }
  }

  renderTxHistoryList() {
    if (this.state.itemsList === 'loading') {
      if (!this.isNativeMode() || this.isFullySynced()) {
        return (
          <div>{ translate('INDEX.LOADING_HISTORY') }...</div>
        );
      }
    } else if (this.state.itemsList === 'no data') {
      return (
        <div>{ translate('INDEX.NO_DATA') }</div>
      );
    }

    return TxHistoryListRender.call(this);
  }

  updateAddressSelection(address, type, amount) {
    Store.dispatch(changeActiveAddress(address));

    this.setState(Object.assign({}, this.state, {
      currentAddress: address,
      addressSelectorOpen: false,
      activePage: 1,
    }));

    if (this.props.ActiveCoin.mode === 'basilisk') {
      setTimeout(() => {
        Store.dispatch(changeMainBasiliskAddress(address));
        Store.dispatch(
          getBasiliskTransactionsList(
            this.props.ActiveCoin.coin,
            address
          )
        );
      }, 100);

      Store.dispatch(fetchNewCacheData({
        'pubkey': this.props.Dashboard.activeHandle.pubkey,
        'allcoins': false,
        'coin': this.props.ActiveCoin.coin,
        'calls': 'listtransactions:getbalance',
        'address': address,
      }));
    }
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  renderAddress(tx) {
    if (!tx.address) {
      return (
        <span>
          <i className="icon fa-bullseye"></i> <span className="label label-dark">{ translate('DASHBOARD.ZADDR_NOT_LISTED') }</span>
        </span>
      );
    }

    return tx.address;
  }

  renderAddressByType(type) {
    const _addresses = this.props.ActiveCoin.addresses;

    if (_addresses &&
        _addresses[type] &&
        _addresses[type].length) {
        let items = [];
        const _cache = this.props.ActiveCoin.cache;
        const _coin = this.props.ActiveCoin.coin;

        for (let i = 0; i < _addresses[type].length; i++) {
          const address = _addresses[type][i].address;
          let _amount = address.amount;

          if (this.props.ActiveCoin.mode === 'basilisk') {
            _amount = _cache && _cache[_coin] && _cache[_coin][address] && _cache[_coin][address].getbalance.data && _cache[_coin][address].getbalance.data.balance ? _cache[_coin][address].getbalance.data.balance : 'N/A';
          }

          items.push(
            AddressItemRender.call(this, address, type, _amount, _coin)
          );
        }

        return items;
    } else {
      return null;
    }
  }

  hasPublicAdresses() {
    return this.props.ActiveCoin.addresses &&
      this.props.ActiveCoin.addresses.public &&
      this.props.ActiveCoin.addresses.public.length;
  }

  renderAddressAmount() {
    if (this.hasPublicAdresses()) {
      const _addresses = this.props.ActiveCoin.addresses;
      const _cache = this.props.ActiveCoin.cache;
      const _coin = this.props.ActiveCoin.coin;

      for (let i = 0; i < _addresses.public.length; i++) {
        if (_addresses.public[i].address === this.state.currentAddress) {
          if (_addresses.public[i].amount &&
              _addresses.public[i].amount !== 'N/A') {
            return _addresses.public[i].amount;
          } else {
            const address = _addresses.public[i].address;
            return _cache && _cache[_coin] && _cache[_coin][address] && _cache[_coin][address].getbalance.data && _cache[_coin][address].getbalance.data.balance ? _cache[_coin][address].getbalance.data.balance : 'N/A';
          }
        }
      }
    } else {
      return 0;
    }
  }

  renderSelectorCurrentLabel() {
    if (this.state.currentAddress) {
      return (
        <span>
          <i className={ 'icon fa-eye' + (this.state.addressType === 'public' ? '' : '-slash') }></i>&nbsp;&nbsp;
          <span className="text">
            [ { this.renderAddressAmount() } { this.props.ActiveCoin.coin } ]&nbsp;&nbsp;
            { this.state.currentAddress }
          </span>
        </span>
      );
    } else {
      return (
        <span>- { translate('KMD_NATIVE.SELECT_ADDRESS') } -</span>
      );
    }
  }

  renderAddressList() {
    if (this.props.Dashboard &&
        this.props.Dashboard.activeHandle &&
        this.props.Dashboard.activeHandle[this.props.ActiveCoin.coin] &&
        this.props.ActiveCoin.mode === 'basilisk') {
      return AddressListRender.call(this);
    } else {
      return null;
    }
  }

  isActiveCoinMode(coinMode) {
    return this.props.ActiveCoin.mode === coinMode;
  }

  isNativeMode() {
    return this.isActiveCoinMode('native');
  }

  isFullMode() {
    return this.isActiveCoinMode('full');
  }

  isBasiliskMode() {
    return this.isActiveCoinMode('basilisk');
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.coin &&
        !this.props.ActiveCoin.send &&
        !this.props.ActiveCoin.receive) {
      return WalletsDataRender.call(this);
    } else {
      return null;
    }
  }
}

export default WalletsData;
