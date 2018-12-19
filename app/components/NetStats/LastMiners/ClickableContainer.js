import React from 'react';
import PropTypes from 'prop-types';
import { trimValue } from 'utils/helpers';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import MinerHash from './MinerHash';
import ClickableMiner from './ClickableMiner';
import CopyIcon from './CopyIcon';

class ClickableContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMsg: false,
    };
  }
  handleCopyClick() {
    this.setState({
      showMsg: true,
    }, () => {
      setTimeout(() => { this.setState({showMsg: false}); }, 5000);
    });
  }
  render() {
    const { name } = this.props;
    return (
      <CopyToClipboard text={name.toLowerCase()}
        onCopy={() => this.handleCopyClick()}>
        <ClickableMiner>
          <MinerHash>{trimValue(name).toLowerCase()}</MinerHash>
          <CopyIcon><i className="icon-iconCopy"/></CopyIcon>
          { this.state.showMsg && <div style={{ paddingLeft: '10px', paddingBottom: '5px', lineHeight: '12px'}}>Copied!</div>}
        </ClickableMiner>
      </CopyToClipboard>
    );
  }
}

ClickableContainer.propTypes = {
  name: PropTypes.string,
};

export default ClickableContainer;
