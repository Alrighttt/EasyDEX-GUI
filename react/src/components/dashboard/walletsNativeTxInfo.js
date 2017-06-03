import React from 'react';
import { translate } from '../../translate/translate';
import { secondsToString } from '../../util/time';
import { toggleDashboardTxInfoModal } from '../../actions/actionCreators';
import Store from '../../store';

class WalletsNativeTxInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.toggleTxInfoModal = this.toggleTxInfoModal.bind(this);
  }

  toggleTxInfoModal() {
    Store.dispatch(toggleDashboardTxInfoModal(false));
  }

  openTab(tab) {
    this.setState(Object.assign({}, this.state, {
      activeTab: tab,
    }));
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.toggleTxInfoModal();
    }
  }

  render() {
    if (this.props &&
        this.props.ActiveCoin.showTransactionInfo &&
        this.props.ActiveCoin.nativeActiveSection === 'default' &&
        this.props.ActiveCoin.mode === 'native') {
      const txInfo = this.props.ActiveCoin.txhistory[this.props.ActiveCoin.showTransactionInfoTxIndex];

      return (
        <div onKeyDown={ (event) => this.handleKeydown(event) }>
          <div className="modal show" id="kmd_txid_info_mdl">
            <div className="modal-dialog modal-center modal-lg">
              <div className="modal-content">
                <div className="modal-body modal-body-container">
                  <div className="panel nav-tabs-horizontal">
                    <ul className="nav nav-tabs nav-tabs-line">
                      <li className={ this.state.activeTab === 0 ? 'active' : '' }>
                        <a onClick={ () => this.openTab(0) }>
                          <i className="icon md-balance-wallet"></i>TxID Info
                        </a>
                      </li>
                      <li className={ this.state.activeTab === 1 ? 'active' : '' }>
                        <a onClick={ () => this.openTab(1) }>
                          <i className="icon md-plus-square"></i>Vjointsplits, Details
                        </a>
                      </li>
                      <li className={ this.state.activeTab === 2 ? 'active' : '' }>
                        <a onClick={ () => this.openTab(2) }>
                          <i className="icon wb-briefcase"></i>Hex
                        </a>
                      </li>
                      <li className={ this.state.activeTab === 3 ? 'active' : '' }>
                        <a onClick={ () => this.openTab(3) }>
                          <i className="icon wb-file"></i>Raw info
                        </a>
                      </li>
                    </ul>
                    <div className="panel-body">
                      <div className="tab-content">
                        <div
                          className={ this.state.activeTab === 0 ? 'tab-pane active' : 'tab-pane' }
                          id="KmdTxIDInfotab1">
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <td>amount</td>
                                <td>
                                { txInfo.amount }
                                </td>
                              </tr>
                              <tr>
                                <td>fee</td>
                                <td>
                                  { txInfo.fee }
                                </td>
                              </tr>
                              <tr>
                                <td>confirmations</td>
                                <td>
                                  { txInfo.confirmations }
                                </td>
                              </tr>
                              <tr>
                                <td>blockhash</td>
                                <td>
                                  { txInfo.blockhash }
                                </td>
                              </tr>
                              <tr>
                                <td>blockindex</td>
                                <td>
                                  {txInfo.blockindex}
                                </td>
                              </tr>
                              <tr>
                                <td>blocktime</td>
                                <td>
                                  { secondsToString(txInfo.blocktime) }
                                </td>
                              </tr>
                              <tr>
                                <td>txid</td>
                                <td>
                                  { txInfo.txid }
                                </td>
                              </tr>
                              <tr>
                                <td>walletconflicts</td>
                                <td>
                                  { txInfo.walletconflicts.length }
                                </td>
                              </tr>
                              <tr>
                                <td>time</td>
                                <td>
                                  { secondsToString(txInfo.time) }
                                </td>
                              </tr>
                              <tr>
                                <td>timereceived</td>
                                <td>
                                  { secondsToString(txInfo.timereceived) }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div
                          className={ this.state.activeTab === 1 ? 'tab-pane active' : 'tab-pane' }
                          id="KmdTxIDInfotab2">
                          <table className="table table-striped">
                            <tbody>
                              <tr>
                                <td>vjoinsplit</td>
                                <td>
                                  { txInfo.vjoinsplit }
                                </td>
                              </tr>
                              <tr>
                                <td>details</td>
                                <td>
                                  { txInfo.details }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div
                          className={ this.state.activeTab === 2 ? 'tab-pane active' : 'tab-pane' }
                          id="KmdTxIDInfotab3">
                          <textarea
                            id="kmd_txid_info_hex"
                            className="full-width height-170"
                            rows="10"
                            cols="80"
                            defaultValue={ txInfo.hex } disabled></textarea>
                        </div>
                        <div
                          className={ this.state.activeTab === 3 ? 'tab-pane active' : 'tab-pane' }
                          id="KmdTxIDInfotab4">
                          <textarea
                            id="kmd_txid_info_hex"
                            className="full-width height-400"
                            rows="40"
                            cols="80"
                            defaultValue={ JSON.stringify(txInfo, null, '\t') }
                            disabled></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={ this.toggleTxInfoModal }>{ translate('INDEX.CLOSE') }</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show in"></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default WalletsNativeTxInfo;
