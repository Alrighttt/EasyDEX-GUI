import React from 'react';
import { translate } from '../../../translate/translate';
import QRModal from '../qrModal/qrModal';

export const AddressListRender = function() {
  return (
    <div className={ `btn-group bootstrap-select form-control form-material showkmdwalletaddrs show-tick ${(this.state.addressSelectorOpen ? 'open' : '')}` }>
      <button
        type="button"
        className="btn dropdown-toggle btn-info"
        title="Select private address"
        onClick={ this.openDropMenu }>
        <span className="filter-option pull-left">{ this.renderSelectorCurrentLabel() } </span>
        <span className="bs-caret">
          <span className="caret"></span>
        </span>
      </button>
      <div className="dropdown-menu open">
        <ul className="dropdown-menu inner">
          <li
            className="selected"
            onClick={ () => this.updateAddressSelection(null, 'public', null) }>
            <a>
              <span className="text">{ translate('INDEX.T_FUNDS') }</span>
              <span
                className="glyphicon glyphicon-ok check-mark pull-right"
                style={{ display: this.state.sendFrom === null ? 'inline-block' : 'none' }}></span>
            </a>
          </li>
          { this.renderAddressByType('public') }
          { this.renderAddressByType('private') }
        </ul>
      </div>
    </div>
  );
};

export const _SendFormRender = function() {
  return (
    <form
      className="extcoin-send-form"
      method="post"
      autoComplete="off">
      { this.state.renderAddressDropdown &&
        <div className="row">
          <div className="col-xlg-12 form-group form-material">
            <label className="control-label padding-bottom-10">{ translate('INDEX.SEND_FROM') }</label>
            { this.renderAddressList() }
          </div>
        </div>
      }
      <div className="row">
        <div className="col-xlg-12 form-group form-material">
          <label
            className="control-label"
            htmlFor="kmdWalletSendTo">{ translate('INDEX.SEND_TO') }</label>
          <input
            type="text"
            className="form-control"
            name="sendTo"
            onChange={ this.updateInput }
            value={ this.state.sendTo }
            id="kmdWalletSendTo"
            placeholder={ this.props.ActiveCoin.coin === 'CHIPS' ? translate('SEND.ENTER_ADDRESS') : translate('SEND.ENTER_T_OR_Z_ADDR') }
            autoComplete="off"
            required />
        </div>
        <div className="col-lg-12 form-group form-material">
          <label
            className="control-label"
            htmlFor="kmdWalletAmount">
            { translate('INDEX.AMOUNT') }
          </label>
          <input
            type="text"
            className="form-control"
            name="amount"
            value={ this.state.amount !== 0 ? this.state.amount : '' }
            onChange={ this.updateInput }
            id="kmdWalletAmount"
            placeholder="0.000"
            autoComplete="off" />
        </div>
        <div className={ 'col-lg-6 form-group form-material' + (this.isTransparentTx() ? '' : ' hide') }>
          <span className="pointer">
            <label className="switch">
              <input
                type="checkbox"
                checked={ this.state.substractFee } />
              <div
                className="slider"
                onClick={ () => this.toggleSubstractFee() }></div>
            </label>
            <div
              className="toggle-label"
              onClick={ () => this.toggleSubstractFee() }>
                { translate('DASHBOARD.SUBSTRACT_FEE') }
            </div>
          </span>
        </div>
        <div className="col-lg-6 form-group form-material hide">
          <label
            className="control-label"
            htmlFor="kmdWalletFee">
            { translate('INDEX.FEE') }
          </label>
          <input
            type="text"
            className="form-control"
            name="fee"
            onChange={ this.updateInput }
            id="kmdWalletFee"
            placeholder="0.000"
            value={ this.state.fee !== 0 ? this.state.fee : '' }
            autoComplete="off" />
        </div>
        <div className="col-lg-12 hide">
          <span>
            <strong>{ translate('INDEX.TOTAL') }:</strong>&nbsp;
            { this.state.amount } - { this.state.fee }/kb = { Number(this.state.amount) - Number(this.state.fee) }&nbsp;
            { this.props.ActiveCoin.coin }
          </span>
        </div>
        <div className="col-lg-12">
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light pull-right"
            onClick={ this.props.renderFormOnly ? this.handleSubmit : () => this.changeSendCoinStep(1) }
            disabled={ !this.state.sendTo || !this.state.amount }>
            { translate('INDEX.SEND') } { this.state.amount } { this.props.ActiveCoin.coin }
          </button>
        </div>
      </div>
    </form>
  );
}

export const SendRender = function() {
  if (this.props.renderFormOnly) {
    return (
      <div>{ this.SendFormRender() }</div>
    );
  } else {
    return (
      <div className="col-sm-12 padding-top-10">
        <div className="col-xlg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="steps row margin-top-10">
            <div className={ 'step col-md-4' + (this.state.currentStep === 0 ? ' current' : '') }>
              <span className="step-number">1</span>
              <div className="step-desc">
                <span className="step-title">{ translate('INDEX.FILL_SEND_FORM') }</span>
                <p>{ translate('INDEX.FILL_SEND_DETAILS') }</p>
              </div>
            </div>
            <div className={ 'step col-md-4' + (this.state.currentStep === 1 ? ' current' : '') }>
              <span className="step-number">2</span>
              <div className="step-desc">
                <span className="step-title">{ translate('INDEX.CONFIRMING') }</span>
                <p>{ translate('INDEX.CONFIRM_DETAILS') }</p>
              </div>
            </div>
            <div className={ 'step col-md-4' + (this.state.currentStep === 2 ? ' current' : '') }>
              <span className="step-number">3</span>
              <div className="step-desc">
                <span className="step-title">{ translate('INDEX.PROCESSING_TX') }</span>
                <p>{ translate('INDEX.PROCESSING_DETAILS') }</p>
              </div>
            </div>
          </div>
        </div>

        <div className={ 'col-xlg-12 col-md-12 col-sm-12 col-xs-12' + (this.state.currentStep === 0 ? '' : ' hide') }>
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">
                { translate('INDEX.SEND') } { this.props.ActiveCoin.coin }
              </h3>
            </div>
            <div className="qr-modal-send-block">
              <QRModal
                mode="scan"
                setRecieverFromScan={ this.setRecieverFromScan } />
            </div>
            <div className="panel-body container-fluid">
            { this.SendFormRender() }
            </div>
          </div>
        </div>

        <div className={ 'col-xlg-12 col-md-12 col-sm-12 col-xs-12' + (this.state.currentStep === 1 ? '' : ' hide') }>
          <div className="panel">
            <div className="panel-body">
              <div className="row">
                <div className="col-xs-12">
                  <strong>{ translate('INDEX.TO') }</strong>
                </div>
                <div
                  className="col-lg-6 col-sm-6 col-xs-12"
                  style={{ overflow: 'hidden' }}>{ this.state.sendTo }</div>
                <div className="col-lg-6 col-sm-6 col-xs-6">
                  { this.state.amount } { this.props.ActiveCoin.coin }
                </div>
                <div className={ this.state.substractFee ? 'col-lg-6 col-sm-6 col-xs-12 padding-top-10 bold' : 'hide' }>{ translate('DASHBOARD.SUBSTRACT_FEE') }</div>
              </div>

              { this.state.sendFrom &&
                <div className="row padding-top-20">
                  <div className="col-xs-12">
                    <strong>{ translate('INDEX.FROM') }</strong>
                  </div>
                  <div
                    className="col-lg-6 col-sm-6 col-xs-12"
                    style={{ overflow: 'hidden' }}>{ this.state.sendFrom }</div>
                  <div className="col-lg-6 col-sm-6 col-xs-6 confirm-currency-send-container">
                    { Number(this.state.amount) } { this.props.ActiveCoin.coin }
                  </div>
                </div>
              }
              <div className="widget-body-footer">
                <a
                  className="btn btn-default waves-effect waves-light"
                  onClick={ () => this.changeSendCoinStep(0, true) }>{ translate('INDEX.BACK') }</a>
                <div className="widget-actions pull-right">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ () => this.changeSendCoinStep(2) }>
                      { translate('INDEX.CONFIRM') }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={ 'col-xlg-12 col-md-12 col-sm-12 col-xs-12' + (this.state.currentStep === 2 ? '' : ' hide') }>
          <div className="panel">
            <div className="panel-heading">
              <h4 className="panel-title">
                { translate('INDEX.TRANSACTION_RESULT') }
              </h4>
              <div>
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>{ translate('INDEX.KEY') }</th>
                      <th>{ translate('INDEX.INFO') }</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                      Result
                      </td>
                      <td>
                        <span className="label label-success">success</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Transaction ID</td>
                      <td>{ this.state.lastSendToResponse }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="widget-body-footer">
                <div className="widget-actions margin-bottom-15 margin-right-15">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ () => this.changeSendCoinStep(0) }>
                      { translate('INDEX.MAKE_ANOTHER_TX') }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        { this.renderOPIDListCheck() &&
          <div className="col-xs-12">
            <div className="row">
              <div className="panel nav-tabs-horizontal">
                <div>
                  <div className="col-xlg-12 col-lg-12 col-sm-12 col-xs-12">
                    <div className="panel">
                      <header className="panel-heading">
                        <h3 className="panel-title">
                          { translate('INDEX.OPERATIONS_STATUSES') }
                        </h3>
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
        }
      </div>
    );
  }
};