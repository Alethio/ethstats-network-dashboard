import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';
import Nodes from './Nodes';
import NodeItem from 'components/NetStats/NodeItem';
import nodesListSelector from 'selector/nodesList';

const NODE_ITEM_HEIGHT = 57;

class SortableNodesList extends React.Component {
  static propTypes = {
    // props given directly
    sortingOptions: PropTypes.object,
    pinnedNodes: PropTypes.object,
    updateNodePin: PropTypes.func,
    // props given by redux
    nodesList: PropTypes.array,
  };

  constructor() {
    super();
    this.scrollbarsReference = null;
    this.scrollValues = null;
  }
  /*
  shouldComponentUpdate() {
    return this.props.nodesList === null;
  }
  */
  componentWillUpdate() {
    if (this.scrollbarsReference) {
      this.scrollValues = this.scrollbarsReference.getValues();
    }
  }
  componentDidUpdate() {
    if (this.scrollbarsReference && this.scrollValues) {
      this.scrollbarsReference.scrollTop(this.scrollValues.scrollTop);
    }
  }

  render() {
    return (
      <Scrollbars className="nodeslist-scrollable" ref={(r) => {this.scrollbarsReference = r;}}>
        <Nodes height={this.props.nodesList.length * NODE_ITEM_HEIGHT}>
          { this.props.nodesList.map((key) => {
            return (
              <NodeItem
                key={key}
                ethNodeName={key}
                pinned={this.props.pinnedNodes[ key ]}
                updateNodePinCallback={this.props.updateNodePin}
              />
            );
          }) }
        </Nodes>
      </Scrollbars>
    );
  }
}

const mapStateToProps = (state, props) => {
  return nodesListSelector(state, props);
};

export default connect(
  mapStateToProps,
  null
)(SortableNodesList);
