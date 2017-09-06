import React from 'react';
import { translate } from '../../../translate/translate';
import { connect } from 'react-redux';

import {
  addPeerNode,
  getPeersList,
  getPeersListState,
} from '../../../actions/actionCreators';
import Store from '../../../store';

import AddCoinOptionsCrypto from '../../addcoin/addcoinOptionsCrypto';
import AddCoinOptionsAC from '../../addcoin/addcoinOptionsAC';
import AddCoinOptionsACFiat from '../../addcoin/addcoinOptionsACFiat';

class AppNodeTab extends React.Component {
  constructor() {
    super();
    this.state = {
      addNodeCoin: null,
      addPeerIP: null,
      getPeersCoin: null,
      trimPassphraseTimer: null,
      wifkeysPassphrase:'',
    };
    this.renderSNPeersList = this.renderSNPeersList.bind(this);
    this.renderPeersList = this.renderPeersList.bind(this);
    this.checkNodes = this.checkNodes.bind(this);
    this.addNode = this.addNode.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  renderSNPeersList() {
    if (this.state.getPeersCoin) {
      const _getPeersCoin = this.state.getPeersCoin;
      const _supernetPeers = this.props.Settings.supernetPeers;
      const coin = _getPeersCoin.split('|')[0];

      if (_supernetPeers &&
          _getPeersCoin &&
          _supernetPeers[coin]) {
        return _supernetPeers[coin].map((ip) =>
          <div key={ ip }>{ ip }</div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  renderPeersList() {
    if (this.state.getPeersCoin) {
      const _getPeersCoin = this.state.getPeersCoin;
      const _rawPeers = this.props.Settings.rawPeers;
      const coin = _getPeersCoin.split('|')[0];

      if (_rawPeers &&
          _getPeersCoin &&
          _rawPeers[coin]) {
        return _rawPeers[coin].map((ip) =>
          <div key={ ip }>{ ip }</div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  checkNodes() {
    if (this.state.getPeersCoin) {
      console.warn(this.state.getPeersCoin.split('|')[0]);
      Store.dispatch(getPeersList(this.state.getPeersCoin.split('|')[0]));
    }
  }

  addNode() {
    if (this.state.addNodeCoin) {
      Store.dispatch(
        addPeerNode(
          this.state.addNodeCoin.split('|')[0],
          this.state.addPeerIP
        )
      );
    }
  }

  updateInput(e) {
    if (e.target.name === 'wifkeysPassphrase') {
      // remove any empty chars from the start/end of the string
      const newValue = e.target.value;

      clearTimeout(this.state.trimPassphraseTimer);

      const _trimPassphraseTimer = setTimeout(() => {
        this.setState({
          wifkeysPassphrase: newValue ? newValue.trim() : '', // hardcoded field name
        });
      }, 2000);

      this.resizeLoginTextarea();

      this.setState({
        trimPassphraseTimer: _trimPassphraseTimer,
        [e.target.name]: newValue,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  render() {
    return (
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
    );
  };
}

const mapStateToProps = (state) => {
  return {
    Settings: state.Settings,      
  };

};

export default connect(mapStateToProps)(AppNodeTab);