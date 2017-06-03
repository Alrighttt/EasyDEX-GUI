import React from 'react';
import { translate } from '../../translate/translate';

class WalletsNativeSyncProgress extends React.Component {
  renderSyncPercentagePlaceholder() {
    if (this.props.Dashboard.progress.blocks > 0 &&
        this.props.Dashboard.progress.longestchain === 0) {
      return (
        <div
          className="progress-bar progress-bar-info progress-bar-striped active full-width font-size-80-percent"
          id="extcoin-sync">
          <span
            id="extcoin-sync-percent"
            className="full-width">{ translate('INDEX.SYNC_ERR_LONGESTCHAIN') }</span>
        </div>
      );
    } else if (this.props.Dashboard.progress.blocks === 0) {
      return (
        <div
          className="progress-bar progress-bar-info progress-bar-striped active full-width font-size-80-percent"
          id="extcoin-sync">
          <span
            id="extcoin-sync-percent"
            className="full-width">{ translate('INDEX.SYNC_ERR_BLOCKS') }</span>
        </div>
      );
    } else {
      const syncPercentage = (parseFloat(parseInt(this.props.Dashboard.progress.blocks, 10) * 100 / parseInt(this.props.Dashboard.progress.longestchain, 10)).toFixed(2) + '%').replace('NaN', 0);

      return (
        <div
          className="progress-bar progress-bar-info progress-bar-striped active font-size-80-percent"
          style={{ width: syncPercentage }}
          id="extcoin-sync">
          <span
            id="extcoin-sync-percent"
            style={{ width: syncPercentage }}>{ syncPercentage }</span> | <span id="extcoin-synced-blocks">{ this.props.Dashboard.progress.blocks }</span> / <span id="extcoin-longestchain">{ this.props.Dashboard.progress.longestchain }</span> | { translate('INDEX.CONNECTIONS') }: <span id="extcoin-connections">{ this.props.Dashboard.progress.connections }</span>
        </div>
      );
    }
  }

  renderActivatingBestChainProgress() {
    if (this.props.Settings &&
        this.props.Settings.debugLog &&
        this.props.Dashboard.progress.remoteKMDNode) {
      if (this.props.Settings.debugLog.indexOf('UpdateTip') > -1) {
        let temp = this.props.Settings.debugLog.split(' ');
        let currentBestChain;

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].indexOf('height=') > -1) {
            currentBestChain = temp[i].replace('height=', '');
          }
        }

        return(`: ${Math.floor(currentBestChain * 100 / this.props.Dashboard.progress.remoteKMDNode.blocks)}% (blocks ${currentBestChain} / ${this.props.Dashboard.progress.remoteKMDNode.blocks})`);
      } else {
        return (
          <span id="activating-komodod-tridot">...</span>
        );
      }
    }
  }

  renderLB(_translationID) {
    const _translationComponents = translate(_translationID).split('<br>');

    return _translationComponents.map((_translation) =>
      <span>
        {_translation}
        <br />
      </span>
    );
  }

  renderChainActivationNotification() {
    if ((this.props.Dashboard.progress.blocks < this.props.Dashboard.progress.longestchain) ||
        this.props.Dashboard.progress.remoteKMDNode) {
      return (
        <div
          className="alert alert-info alert-dismissible margin-bottom-40"
          id="extcoin-wallet-activating-alert">
          <button className="close" type="button">
            <span>×</span>
          </button>
          <h4>
            { translate('INDEX.ACTIVATING_CHAIN') }{ this.renderActivatingBestChainProgress() }
          </h4>
          <p id="extcoin-wallet-connection-alert-text">{ this.renderLB('INDEX.KMD_STARTED') }</p>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props &&
        this.props.Dashboard &&
        this.props.Dashboard.progress) {
      return (
        <div>
          { this.renderChainActivationNotification() }
          <div className="row sync-progress-container">
            <div className="col-xs-12" id="extcoin-progressbars">
              <div className="progress">
                { this.renderSyncPercentagePlaceholder() }
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

export default WalletsNativeSyncProgress;
