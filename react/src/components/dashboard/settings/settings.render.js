import React from 'react';
import { translate } from '../../../translate/translate';
import AddCoinOptionsCrypto from '../../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../../addcoin/addcoinOptionsACFiat';

export const AppUpdateTabRender = function() {
  return (
    <div
      className="panel"
      id="AppUpdate"
      onClick={ () => this.openTab('AppUpdate', 10) }>
      <div className="panel-heading">
        <a className={ 'panel-title' + (this.state.activeTab === 10 ? '' : ' collapsed') }>
          <i className="icon fa fa-cloud-download"></i> { translate('INDEX.UPDATE') }
        </a>
      </div>
      <div
        className={ 'panel-collapse collapse' + (this.state.activeTab === 10 ? ' in' : '') }
        style={{ height: this.state.activeTab === 10 ? `${this.state.activeTabHeight}px` : '0' }}>
        <div className="panel-body">
          <div className="col-sm-4 padding-top-15">
            <h5>{ translate('INDEX.UI_UPDATE') }</h5>
            <div className="padding-top-15">
              <button
                type="button"
                className="btn btn-info waves-effect waves-light"
                onClick={ this._checkForUpdateUIPromise }>{ translate('INDEX.CHECK_FOR_UPDATE') }</button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light margin-left-20"
                onClick={ this._updateUIPromise }
                disabled={ !this.state.updatePatch }>{ translate('INDEX.UPDATE_UI_NOW') }</button>
            </div>
          </div>
          <div className="col-sm-4 padding-top-15 hide">
            <h5>{ translate('INDEX.BINS_UPDATE') }</h5>
            <div className="padding-top-15">
              <button
                type="button"
                className="btn btn-info waves-effect waves-light"
                onClick={ this._checkForUpdateUIPromise }>{ translate('INDEX.CHECK_FOR_UPDATE') }</button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light margin-left-20"
                onClick={ this.checkNodes }>{ translate('INDEX.UPDATE_BINS_NOW') }</button>
            </div>
          </div>
          <div className="col-sm-12 padding-top-15">
            { this.renderUpdateStatus() }
          </div>
        </div>
      </div>
    </div>
  );
};

export const AppInfoTabRender = function() {
  return (
    <div
      className="panel"
      id="AppInfo"
      onClick={ () => this.openTab('AppInfo', 8) }>
      <div className="panel-heading">
        <a className={ 'panel-title' + (this.state.activeTab === 8 ? '' : ' collapsed') }>
          <i className="icon md-info"></i>{ translate('SETTINGS.APP_INFO') }
        </a>
      </div>
      <div
        className={ 'panel-collapse collapse' + (this.state.activeTab === 8 ? ' in' : '') }
        style={{ height: this.state.activeTab === 8 ? `${this.state.activeTabHeight}px` : '0' }}>
        <div className="panel-body">
          <div className="col-sm-12 padding-top-15">
            <div className="row">
              <h5>{ translate('SETTINGS.APP_RELEASE') }</h5>
              <div>
                { translate('SETTINGS.NAME') }: { this.props.Settings.appInfo.releaseInfo.name }
              </div>
              <div>
                { translate('SETTINGS.VERSION') }: { `${this.props.Settings.appInfo.releaseInfo.version.replace('version=', '')}-beta` }
              </div>
              <div>
                { translate('SETTINGS.APP_SESSION') }: { this.props.Settings.appInfo.appSession }
              </div>
            </div>
          </div>
          <div className="col-sm-12 padding-top-20">
            <div className="row">
              <h5>{ translate('SETTINGS.SYS_INFO') }</h5>
              <div>
                { translate('SETTINGS.ARCH') }: { this.props.Settings.appInfo.sysInfo.arch }
              </div>
              <div>
                { translate('SETTINGS.OS_TYPE') }: { this.props.Settings.appInfo.sysInfo.os_type }
              </div>
              <div>
                { translate('SETTINGS.OS_PLATFORM') }: { this.props.Settings.appInfo.sysInfo.platform }
              </div>
              <div>
                { translate('SETTINGS.OS_RELEASE') }: { this.props.Settings.appInfo.sysInfo.os_release }
              </div>
              <div>
                { translate('SETTINGS.CPU') }: { this.props.Settings.appInfo.sysInfo.cpu }
              </div>
              <div>
                { translate('SETTINGS.CPU_CORES') }: { this.props.Settings.appInfo.sysInfo.cpu_cores }
              </div>
              <div>
                { translate('SETTINGS.MEM') }: { this.props.Settings.appInfo.sysInfo.totalmem_readable }
              </div>
            </div>
          </div>
          <div className="col-sm-12 padding-top-20">
            <div className="row">
              <h5>{ translate('SETTINGS.LOCATIONS') }</h5>
              <div>
                { translate('SETTINGS.CACHE') }: { this.props.Settings.appInfo.dirs.cacheLocation }
              </div>
              <div>
                { translate('SETTINGS.CONFIG') }: { this.props.Settings.appInfo.dirs.configLocation }
              </div>
              <div>
                Iguana { translate('SETTINGS.BIN') }: { this.props.Settings.appInfo.dirs.iguanaBin }
              </div>
              <div>
                Iguana { translate('SETTINGS.DIR') }: { this.props.Settings.appInfo.dirs.iguanaDir }
              </div>
              <div>
                Komodo { translate('SETTINGS.BIN') }: { this.props.Settings.appInfo.dirs.komododBin }
              </div>
              <div>
                Komodo { translate('SETTINGS.DIR') }: { this.props.Settings.appInfo.dirs.komodoDir }
              </div>
              <div>
                Komodo wallet.dat: { this.props.Settings.appInfo.dirs.komodoDir }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsRender = function() {
  return (
    <div className="margin-left-0 full-height">
      <div
        className="page-content full-height"
        id="section-iguana-wallet-settings">
        <div className="row">
          <div className="col-xlg-12 col-md-12">
            <div className="row">
              <div className="col-xlg-12 col-md-12">
                <h4 className="font-size-14 text-uppercase">{ translate('INDEX.WALLET_SETTINGS') }</h4>
                <div
                  className="panel-group"
                  id="SettingsAccordion">
                  { !this.props.disableWalletSpecificUI &&
                    <div
                      id="WalletInfo"
                      onClick={ () => this.openTab('WalletInfo', 0) }
                      className={ 'panel' + (this.state.nativeOnly ? ' hide' : '') }>
                      <div className="panel-heading">
                        <a className={ 'panel-title' + (this.state.activeTab === 0 ? '' : ' collapsed') }>
                          <i className="icon md-balance-wallet"></i>{ translate('INDEX.WALLET_INFO') }
                        </a>
                      </div>
                      <div
                        className={ 'panel-collapse collapse' + (this.state.activeTab === 0 ? ' in' : '') }
                        style={{ height: this.state.activeTab === 0 ? `${this.state.activeTabHeight}px` : '0' }}>
                        <div className="panel-body">
                          <table className="table">
                            <thead>
                              <tr>
                                <th width="10%">{ translate('INDEX.KEY') }</th>
                                <th>{ translate('INDEX.VALUE') }</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="wallet-info-key">pubkey</td>
                                <td>{ this.props.Main.activeHandle.pubkey }</td>
                              </tr>
                              <tr>
                                <td className="wallet-info-key">btcpubkey</td>
                                <td>{ this.props.Main.activeHandle.btcpubkey }</td>
                              </tr>
                              <tr>
                                <td className="wallet-info-key">rmd160</td>
                                <td>{ this.props.Main.activeHandle.rmd160 }</td>
                              </tr>
                              <tr>
                                <td className="wallet-info-key">NXT</td>
                                <td>{ this.props.Main.activeHandle.NXT }</td>
                              </tr>
                              <tr>
                                <td className="wallet-info-key">notary</td>
                                <td>{ this.props.Main.activeHandle.notary }</td>
                              </tr>
                              <tr>
                                <td className="wallet-info-key">status</td>
                                <td>{ this.props.Main.activeHandle.status }</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  }
                  { !this.props.disableWalletSpecificUI &&
                  <div
                    id="AddNodeforCoin"
                    onClick={ () => this.openTab('AddNodeforCoin', 1) }
                    className={ 'panel' + (this.state.nativeOnly ? ' hide' : '') }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 1 ? '' : ' collapsed') }>
                        <i className="icon md-plus-square"></i>{ translate('INDEX.ADD_NODE') }
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 1 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 1 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="col-sm-12">
                              <p>{ translate('INDEX.USE_THIS_SECTION') }</p>
                            </div>
                            <div className="col-sm-8 col-xs-12">
                              <div className="form-group">
                                <select
                                  className="form-control form-material"
                                  name="getPeersCoin"
                                  onChange={ this.updateInput }>
                                  <option>{ translate('INDEX.SELECT_COIN') }</option>
                                  <AddCoinOptionsCrypto />
                                  <AddCoinOptionsAC />
                                  <AddCoinOptionsACFiat />
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-4 col-xs-12 text-align-center">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                onClick={ this.checkNodes }>{ translate('INDEX.CHECK_NODES') }</button>
                            </div>
                            <div className="col-sm-12">
                              <h5>
                                SuperNET Peers:
                              </h5>
                              <p>{ this.renderSNPeersList() }</p>
                              <h5>
                                Raw Peers:
                              </h5>
                              <p>{ this.renderPeersList() }</p>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="col-sm-12">
                              <p>{ translate('INDEX.USE_THIS_SECTION_PEER') }</p>
                            </div>
                            <div className="col-sm-8 col-xs-12">
                              <div className="form-group">
                                <select
                                  className="form-control form-material"
                                  name="addNodeCoin"
                                  onChange={ this.updateInput }>
                                  <option>{ translate('INDEX.SELECT_COIN') }</option>
                                  <AddCoinOptionsCrypto />
                                  <AddCoinOptionsAC />
                                  <AddCoinOptionsACFiat />
                                </select>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="addPeerIP"
                                  placeholder={ translate('SETTINGS.ADD_PEER_IP') }
                                  onChange={ this.updateInput } />
                              </div>
                            </div>
                            <div className="col-sm-4 col-xs-12 text-align-center">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                onClick={ this.addNode }>{ translate('INDEX.ADD_NODE') }</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  }
                  { !this.props.disableWalletSpecificUI &&
                  <div
                    id="DumpWallet"
                    onClick={ () => this.openTab('DumpWallet', 2) }
                    className={ 'panel' + (this.state.nativeOnly ? ' hide' : '') }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 2 ? '' : ' collapsed') }>
                        <i className="icon wb-briefcase"></i>{ translate('INDEX.WALLET_BACKUP') }
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 2 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 2 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">Wallet Backup section to be updated soon.</div>
                    </div>
                  </div>
                  }
                  { !this.props.disableWalletSpecificUI &&
                  <div
                    id="FiatCurrencySettings"
                    onClick={ () => this.openTab('FiatCurrencySettings', 3) }
                    className={ 'panel' + (this.state.nativeOnly ? ' hide' : '') }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 3 ? '' : ' collapsed') }>
                        <i className="icon fa-money"></i>{ translate('INDEX.FIAT_CURRENCY') }
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 3 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 3 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">Fiat currency settings section to be updated soon.</div>
                    </div>
                  </div>
                  }
                  { !this.props.disableWalletSpecificUI &&
                  <div
                    id="ExportKeys"
                    onClick={ () => this.openTab('ExportKeys', 4) }
                    className={ 'panel' + (this.state.nativeOnly ? ' hide' : '') }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 4 ? '' : ' collapsed') }>
                        <i className="icon md-key"></i>{ translate('INDEX.EXPORT_KEYS') }
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 4 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 4 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">
                        <div>
                          <div className="padding-bottom-20">{ this.renderLB('INDEX.ONLY_ACTIVE_WIF_KEYS') }</div>
                          <div className="padding-bottom-20">
                            <i>{ this.renderLB('SETTINGS.EXPORT_KEYS_NOTE') }</i>
                          </div>
                          <strong>
                            <i>{ translate('INDEX.PLEASE_KEEP_KEYS_SAFE') }</i>
                          </strong>
                        </div>
                        <div className="col-sm-12"></div>
                        <form
                          className="wifkeys-form"
                          method="post"
                          action="javascript:"
                          autoComplete="off">
                          <div className="form-group form-material floating">
                            <input
                              type="password"
                              className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
                              name="wifkeysPassphrase"
                              id="wifkeysPassphrase"
                              onChange={ this.updateInput }
                              value={ this.state.wifkeysPassphrase } />
                            <textarea
                              className={ this.state.seedInputVisibility ? 'form-control' : 'hide' }
                              id="wifkeysPassphraseTextarea"
                              name="wifkeysPassphrase"
                              onChange={ this.updateInput }
                              value={ this.state.wifkeysPassphrase }></textarea>
                            <i
                              className={ 'seed-toggle fa fa-eye' + (!this.state.seedInputVisibility ? '-slash' : '') }
                              onClick={ this.toggleSeedInputVisibility }></i>
                            <label
                              className="floating-label"
                              htmlFor="wifkeysPassphrase">{ translate('INDEX.PASSPHRASE') }</label>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-center">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={ this.exportWifKeys }>{ translate('INDEX.GET_WIF_KEYS') }</button>
                          </div>
                        </form>

                        <div className="col-sm-12 padding-top-15">
                          <div className="row">
                            <table className="table">
                              { this.renderWifKeys() }
                            </table>
                            <div className={ this.props.Settings.wifkey ? 'col-sm-12 col-xs-12 text-align-center' : 'hide' }>
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                onClick={ this.exportWifKeysRaw }>{ this.state.exportWifKeysRaw ? 'Hide' : 'Show' } raw data</button>
                            </div>
                            <div className={ this.state.exportWifKeysRaw ? 'col-sm-12 col-xs-12 text-align-center' : 'hide' }>
                              { this.renderExportWifKeysRaw() }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  }
                  { !this.props.disableWalletSpecificUI &&
                  <div
                    id="ImportKeys"
                    onClick={ () => this.openTab('ImportKeys', 5) }
                    className={ 'panel' + (this.state.nativeOnly ? ' hide' : '') }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 5 ? '' : ' collapsed') }>
                        <i className="icon md-key"></i>{ translate('INDEX.IMPORT_KEYS') }
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 5 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 5 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">
                        <div>{ translate('INDEX.IMPORT_KEYS_DESC_P1') }</div><br/>
                        <div>{ translate('INDEX.IMPORT_KEYS_DESC_P2') }</div><br/>
                        <div>{ translate('INDEX.IMPORT_KEYS_DESC_P3') }</div><br/>
                        <div>
                          <strong>
                            <i>{ translate('INDEX.PLEASE_KEEP_KEYS_SAFE') }</i>
                          </strong>
                        </div>
                        <div className="col-sm-12"></div>
                        <form
                          className="wifkeys-import-form"
                          method="post"
                          action="javascript:"
                          autoComplete="off">
                          <div className="form-group form-material floating">
                            <input
                              type="text"
                              className="form-control"
                              name="importWifKey"
                              id="importWifkey"
                              onChange={ this.updateInput } />
                            <label
                              className="floating-label"
                              htmlFor="importWifkey">{ translate('INDEX.INPUT_PRIV_KEY') }</label>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-center">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={ this.importWifKey }>{ translate('INDEX.IMPORT_PRIV_KEY') }</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  }

                  <div
                    className="panel"
                    id="DebugLog"
                    onClick={ () => this.openTab('DebugLog', 6) }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 6 ? '' : ' collapsed') }>
                        <i className="icon fa-bug"></i>{ translate('INDEX.DEBUG_LOG') }
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 6 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 6 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">
                        <p>{ translate('INDEX.DEBUG_LOG_DESC') }</p>
                        <div className="col-sm-12"></div>
                        <form
                          className="read-debug-log-import-form"
                          method="post"
                          action="javascript:"
                          autoComplete="off">
                          <div className="form-group form-material floating">
                            <input
                              type="text"
                              className="form-control"
                              name="debugLinesCount"
                              id="readDebugLogLines"
                              value={ this.state.debugLinesCount }
                              onChange={ this.updateInput } />
                            <label
                              className="floating-label"
                              htmlFor="readDebugLogLines">{ translate('INDEX.DEBUG_LOG_LINES') }</label>
                          </div>
                          <div className="form-group form-material floating">
                            <select
                              className="form-control form-material"
                              name="debugTarget"
                              id="settingsDelectDebugLogOptions"
                              onChange={ this.updateInput }>
                              <option value="iguana" className={ this.state.nativeOnly ? 'hide' : '' }>Iguana</option>
                              <option value="komodo">Komodo</option>
                            </select>
                            <label
                              className="floating-label"
                              htmlFor="settingsDelectDebugLogOptions">{ translate('INDEX.TARGET') }</label>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-center">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={ this.readDebugLog }>{ translate('INDEX.LOAD_DEBUG_LOG') }</button>
                          </div>
                          <div className="col-sm-12 col-xs-12 text-align-left">
                            <div className="padding-top-40 padding-bottom-20 horizontal-padding-0">{ this.renderDebugLogData() }</div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="panel"
                    id="AppSettings"
                    onClick={ () => this.openTab('AppSettings', 7) }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 7 ? '' : ' collapsed') }>
                        <i className="icon fa-wrench"></i>{ translate('SETTINGS.APP_CONFIG') } (config.json)
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 7 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 7 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">
                        <p>
                          <strong>{ translate('SETTINGS.CONFIG_RESTART_REQUIRED') }</strong>
                        </p>
                        <div className="col-sm-12 padding-top-15">
                          <table>
                            <tbody>
                            { this.renderConfigEditForm() }
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-12 col-xs-12 text-align-center padding-top-35 padding-bottom-30">
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={ this._saveAppConfig }>{ translate('SETTINGS.SAVE_APP_CONFIG') }</button>
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light margin-left-30"
                            onClick={ this._resetAppConfig }>Reset to default</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  { this.renderAppInfoTab() }

                  { this.props.Main && this.props.Main.coins.native &&
                    <div
                      id="Cli"
                      onClick={ () => this.openTab('Cli', 9) }
                      className={ 'panel' + (!this.props.Main.coins.native.length ? ' hide' : '') }>
                      <div className="panel-heading">
                        <a className={ 'panel-title' + (this.state.activeTab === 9 ? '' : ' collapsed') }>
                          <i className="icon fa-code"></i> CLI
                        </a>
                      </div>
                      <div
                        className={ 'panel-collapse collapse' + (this.state.activeTab === 9 ? ' in' : '') }
                        style={{ height: this.state.activeTab === 9 ? `${this.state.activeTabHeight}px` : '0' }}>
                        <div className="panel-body">
                          <p>{ translate('INDEX.CLI_SELECT_A_COIN') }</p>
                          <div className="col-sm-12"></div>
                          <form
                            className="execute-cli-cmd-form"
                            method="post"
                            action="javascript:"
                            autoComplete="off">
                            <div className="form-group form-material floating">
                              <select
                                className="form-control form-material"
                                name="cliCoin"
                                id="settingsCliOptions"
                                onChange={ this.updateInput }>
                                <option>{ translate('INDEX.CLI_NATIVE_COIN') }</option>
                                { this.renderActiveCoinsList('native') }
                              </select>
                              <label
                                className="floating-label"
                                htmlFor="settingsDelectDebugLogOptions">{ translate('INDEX.COIN') }</label>
                            </div>
                            <div className="form-group form-material floating">
                              <textarea
                                type="text"
                                className="form-control"
                                name="cliCmdString"
                                id="cliCmd"
                                value={ this.state.cliCmdString }
                                onChange={ this.updateInput }></textarea>
                              <label
                                className="floating-label"
                                htmlFor="readDebugLogLines">{ translate('INDEX.TYPE_CLI_CMD') }</label>
                            </div>
                            <div className="col-sm-12 col-xs-12 text-align-center">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect waves-light"
                                disabled={ !this.state.cliCoin || !this.state.cliCmdString }
                                onClick={ () => this.execCliCmd() }>{ translate('INDEX.EXECUTE') }</button>
                            </div>
                            <div className="col-sm-12 col-xs-12 text-align-left">
                              <div className="padding-top-40 padding-bottom-20 horizontal-padding-0">
                                { this.renderCliResponse() }
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  }

                  { this.renderAppUpdateTab() }

                  <div
                    className="panel"
                    id="Support"
                    onClick={ () => this.openTab('Support', 11) }>
                    <div className="panel-heading">
                      <a className={ 'panel-title' + (this.state.activeTab === 11 ? '' : ' collapsed') }>
                        <i className="icon fa fa-life-ring"></i> Support
                      </a>
                    </div>
                    <div
                      className={ 'panel-collapse collapse' + (this.state.activeTab === 11 ? ' in' : '') }
                      style={{ height: this.state.activeTab === 11 ? `${this.state.activeTabHeight}px` : '0' }}>
                      <div className="panel-body">
                        <div className="col-sm-12 no-padding-left">
                          <div className="support-box-wrapper">
                            <div
                              className="support-box"
                              onClick={ () => this.openExternalWindow('http://support.supernet.org') }>
                              <img
                                src="assets/images/cryptologo/supernet.png"
                                alt="Support tickets" />
                              <div className="support-box-title">{ translate('SETTINGS.SUPPORT_TICKETS') }</div>
                              <div className="support-box-link">support.supernet.org</div>
                            </div>
                          </div>
                          <div className="support-box-wrapper">
                            <div
                              className="support-box"
                              onClick={ () => this.openExternalWindow('https://sprnt.slack.com') }>
                              <img
                                src="assets/images/support/slack-icon.png"
                                alt="Slack" />
                              <div className="support-box-title">Slack</div>
                              <div className="support-box-link">sprnt.slack.com</div>
                            </div>
                          </div>
                          <div className="support-box-wrapper">
                            <div
                              className="support-box"
                              onClick={ () => this.openExternalWindow('http://slackinvite.supernet.org') }>
                              <img
                                src="assets/images/support/slack-invite-icon.png"
                                alt="Slack invite" />
                              <div className="support-box-title">{ translate('SETTINGS.GET_SLACK_INVITE') }</div>
                              <div className="support-box-link">slackinvite.supernet.org</div>
                            </div>
                          </div>
                          <div className="support-box-wrapper">
                            <div
                              className="support-box"
                              onClick={ () => this.openExternalWindow('https://github.com/SuperNETorg/Agama') }>
                              <img
                                src="assets/images/support/github-icon.png"
                                alt="Github" />
                              <div className="support-box-title">Github</div>
                              <div className="support-box-link">github.com/SuperNETorg/Agama</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};