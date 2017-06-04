import React from 'react';
import Config from '../../config';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import {
  resolveOpenAliasAddress,
  triggerToaster,
  sendNativeTx,
  getKMDOPID
} from '../../actions/actionCreators';
import Store from '../../store';

class WalletsNativeSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressType: null,
      sendFrom: null,
      sendFromAmount: 0,
      sendTo: '',
      sendToOA: null,
      amount: 0,
      fee: 0.0001,
      addressSelectorOpen: false,
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openDropMenu = this.openDropMenu.bind(this);
    this.getOAdress = this.getOAdress.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  handleClickOutside(e) {
    if (e.srcElement.className !== 'btn dropdown-toggle btn-info' &&
        (e.srcElement.offsetParent && e.srcElement.offsetParent.className !== 'btn dropdown-toggle btn-info') &&
        (e.path && e.path[4] && e.path[4].className.indexOf('showkmdwalletaddrs') === -1)) {
      this.setState({
        addressSelectorOpen: false,
      });
    }
  }

  renderAddressByType(type) {
    if (this.props.ActiveCoin.addresses &&
        this.props.ActiveCoin.addresses[type] &&
        this.props.ActiveCoin.addresses[type].length) {
      return this.props.ActiveCoin.addresses[type].map((address) =>
        <li key={ address.address } className={ address.amount <= 0 ? 'hide' : '' }>
          <a onClick={ () => this.updateAddressSelection(address.address, type, address.amount) }><i className={ type === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash' }></i>  <span className="text">[ { address.amount } { this.props.ActiveCoin.coin } ]  { address.address }</span><span className="glyphicon glyphicon-ok check-mark"></span></a>
        </li>
      );
    } else {
      return null;
    }
  }

  renderSelectorCurrentLabel() {
    if (this.state.sendFrom) {
      return (
        <span>
          <i className={ this.state.addressType === 'public' ? 'icon fa-eye' : 'icon fa-eye-slash' }></i>  <span className="text">[ { this.state.sendFromAmount } { this.props.ActiveCoin.coin } ]  { this.state.sendFrom }</span>
        </span>
      );
    } else {
      return (
        <span>- { translate('SEND.SELECT_T_OR_Z_ADDR') } -</span>
      );
    }
  }

  renderAddressList() {
    return (
      <div className={ `btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick ${(this.state.addressSelectorOpen ? 'open' : '')}` }>
        <button
          type="button"
          className="btn dropdown-toggle btn-info"
          title="- { translate('SEND.SELECT_T_OR_Z_ADDR') } -"
          onClick={ this.openDropMenu }>
          <span className="filter-option pull-left">{ this.renderSelectorCurrentLabel() } </span>
          <span className="bs-caret">
            <span className="caret"></span>
          </span>
        </button>
        <div className="dropdown-menu open">
          <ul className="dropdown-menu inner">
            <li className="selected">
              <a><span className="text"> - { translate('SEND.SELECT_T_OR_Z_ADDR') } - </span><span className="glyphicon glyphicon-ok check-mark"></span></a>
            </li>
            { this.renderAddressByType('public') }
            { this.renderAddressByType('private') }
          </ul>
        </div>
      </div>
    );
  }

  renderOPIDLabel(opid) {
    const _satatusDef = {
      queued: {
        icon: 'warning',
        label: 'QUEUED'
      },
      executing: {
        icon: 'info',
        label: 'EXECUTING'
      },
      failed: {
        icon: 'danger',
        label: 'FAILED'
      },
      success: {
        icon: 'success',
        label: 'SUCCESS'
      }
    };

    return (
      <span className={ `label label-${_satatusDef[opid.status].icon}` }>
        <i className="icon fa-eye"></i> <span>{ translate(`KMD_NATIVE.${_satatusDef[opid.status].label}`) }</span>
      </span>
    );
  }

  renderOPIDResult(opid) {
    let isWaitingStatus = true;

    if (opid.status === 'queued') {
      isWaitingStatus = false;
      return (
        <i>{ translate('SEND.AWAITING') }...</i>
      );
    }
    if (opid.status === 'executing') {
      isWaitingStatus = false;
      return (
        <i>{ translate('SEND.PROCESSING') }...</i>
      );
    }
    if (opid.status === 'failed') {
      isWaitingStatus = false;
      return (
        <span>
          <strong>{ translate('SEND.ERROR_CODE') }:</strong> <span>{ opid.error.code }</span>
          <br />
          <strong>{ translate('KMD_NATIVE.MESSAGE') }:</strong> <span>{ opid.error.message }</span>
        </span>
      );
    }
    if (opid.status === 'success') {
      isWaitingStatus = false;
      return (
        <span>
          <strong>txid:</strong> <span>{ opid.result.txid }</span>
          <br />
          <strong>{ translate('KMD_NATIVE.EXECUTION_SECONDS') }:</strong> <span>{ opid.execution_secs }</span>
        </span>
      );
    }
    if (isWaitingStatus) {
      return (
        <span>{ translate('SEND.WAITING') }...</span>
      );
    }
  }

  renderOPIDList() {
    if (this.props.ActiveCoin.opids &&
        this.props.ActiveCoin.opids.length) {
      return this.props.ActiveCoin.opids.map((opid) =>
        <tr key={ opid.id }>
          <td>{ this.renderOPIDLabel(opid) }</td>
          <td>{ opid.id }</td>
          <td>{ secondsToString(opid.creation_time) }</td>
          <td>{ this.renderOPIDResult(opid) }</td>
        </tr>
      );
    } else {
      return null;
    }
  }

  openDropMenu() {
    this.setState(Object.assign({}, this.state, {
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  updateAddressSelection(address, type, amount) {
    this.setState(Object.assign({}, this.state, {
      sendFrom: address,
      addressType: type,
      sendFromAmount: amount,
      addressSelectorOpen: !this.state.addressSelectorOpen,
    }));
  }

  updateInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    Store.dispatch(sendNativeTx(this.props.ActiveCoin.coin, this.state));
    setTimeout(() => {
      Store.dispatch(getKMDOPID(null, this.props.ActiveCoin.coin));
    }, 1000);
  }

  getOAdress() {
    resolveOpenAliasAddress(this.state.sendToOA)
    .then((json) => {
      const reply = json.Answer;

      if (reply &&
          reply.length) {
        for (let i = 0; i < reply.length; i++) {
          const _address = reply[i].data.split(' ');
          const coin = _address[0].replace('"oa1:', '');
          const coinAddress = _address[1].replace('recipient_address=', '').replace(';', '');

          if (coin.toUpperCase() === this.props.ActiveCoin.coin) {
            this.setState(Object.assign({}, this.state, {
              sendTo: coinAddress,
            }));
          }
        }

        if (this.state.sendTo === '') {
          Store.dispatch(triggerToaster(true, 'Couldn\'t find any ' + this.props.ActiveCoin.coin + ' addresses', 'OpenAlias', 'error'));
        }
      } else {
        Store.dispatch(triggerToaster(true, 'Couldn\'t find any addresses', 'OpenAlias', 'error'));
      }
    });
  }

  renderOASendUI() {
    if (Config.openAlias) {
      return (
        <div className="row">
          <div className="col-lg-6 form-group form-material">
            <label
              className="control-label"
              htmlFor="kmdWalletSendTo">{ translate('INDEX.SEND_TO') } via Openalias address</label>
            <input
              type="text"
              className="form-control"
              name="sendToOA"
              onChange={ this.updateInput }
              id="kmdWalletSendTo"
              placeholder="Enter an alias as address@site.com"
              autoComplete="off"
              required />
          </div>
          <div className="col-lg-6 form-group form-material">
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light"
              onClick={ this.getOAdress }>
              Get address
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin &&
        this.props.ActiveCoin.nativeActiveSection === 'send') {
      return (
        <div id="kmd_wallet_send">
          <div className="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="panel" id="projects">
              <div className="panel-heading">
                <h3 className="panel-title">
                  { translate('INDEX.SEND') } { this.props.ActiveCoin.coin }
                </h3>
              </div>
              <div className="panel-body container-fluid">
                <form className="extcoin-send-form" method="post" autoComplete="off">
                  <div className="row">
                    <div className="col-xlg-12 form-group form-material">
                      <label className="control-label">{ translate('INDEX.SEND_FROM') }</label>
                      { this.renderAddressList() }
                    </div>
                  </div>
                  { this.renderOASendUI() }
                  <div className="row">
                    <div className="col-xlg-12 form-group form-material">
                      <label className="control-label" htmlFor="kmdWalletSendTo">{ translate('INDEX.SEND_TO') }</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sendTo"
                        onChange={ this.updateInput }
                        value={ this.state.sendTo }
                        id="kmdWalletSendTo"
                        placeholder={ translate('SEND.ENTER_T_OR_Z_ADDR') }
                        autoComplete="off"
                        required />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" htmlFor="kmdWalletAmount">
                        { this.props.ActiveCoin.coin }
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="amount"
                        onChange={ this.updateInput }
                        id="kmdWalletAmount"
                        placeholder="0.000"
                        autoComplete="off" />
                    </div>
                    <div className="col-lg-6 form-group form-material">
                      <label className="control-label" htmlFor="kmdWalletFee">{ translate('INDEX.FEE') }</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fee"
                        onChange={ this.updateInput }
                        id="kmdWalletFee"
                        placeholder="0.000"
                        value={ this.state.fee }
                        autoComplete="off" />
                    </div>
                    <div className="col-lg-12">
                      <span>
                        <strong>{ translate('INDEX.TOTAL') }:</strong> { this.state.amount } - { this.state.fee }/kb = { Number(this.state.amount) - Number(this.state.fee) } { this.props.ActiveCoin.coin }
                      </span>
                    </div>
                    <div className="col-lg-12">
                      <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light pull-right"
                        onClick={ this.handleSubmit }
                        disabled={ !this.state.sendFrom || !this.state.sendTo || !this.state.amount }>
                        { translate('INDEX.SEND') } { this.state.amount } { this.props.ActiveCoin.coin }
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xs-12">
            <div className="row">
              <div className="panel nav-tabs-horizontal">
                <div>
                  <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                    <div className="panel">
                      <header className="panel-heading">
                        <h3 className="panel-title">{ translate('INDEX.OPERATIONS_STATUSES') }</h3>
                      </header>
                      <div className="panel-body">
                        <table
                          className="table table-hover dataTable table-striped"
                          width="100%">
                          <thead>
                            <tr>
                              <th>{ translate('INDEX.STATUS') }</th>
                              <th>ID</th>
                              <th>{ translate('INDEX.TIME') }</th>
                              <th>{ translate('INDEX.RESULT') }</th>
                            </tr>
                          </thead>
                          <tbody>
                          { this.renderOPIDList() }
                          </tbody>
                          <tfoot>
                            <tr>
                              <th>{ translate('INDEX.STATUS') }</th>
                              <th>ID</th>
                              <th>{ translate('INDEX.TIME') }</th>
                              <th>{ translate('INDEX.RESULT') }</th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WalletsNativeSend;
