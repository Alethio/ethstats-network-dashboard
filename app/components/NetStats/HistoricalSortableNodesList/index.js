import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Scrollbars } from 'react-custom-scrollbars';
import Nodes from 'components/NetStats/NodesList/Nodes';
import HistoricalNodeItem from 'components/NetStats/HistoricalNodeItem';
import HistoricalChartSpinner from 'components/NetStats/HistoricalChartSpinner';
import nodeListSelector from 'selector/historicalNodes';

const NODE_ITEM_HEIGHT = 57;

class HistoricalSortableNodesList extends React.Component {
  static propTypes = {
    // props given directly
    sortingOptions: PropTypes.object,
    pinnedNodes: PropTypes.object,
    updateNodePin: PropTypes.func,
    blockNr: PropTypes.string,
    // props given by redux
    nodesList: PropTypes.array,
  };

  constructor() {
    super();
    this.scrollbarsReference = null;
    this.scrollValues = null;
  }
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
        { this.props.nodesList.length !== 0 ? <Nodes height={this.props.nodesList.length * NODE_ITEM_HEIGHT}>
          { this.props.nodesList.map((key, index) => {
            return (
              <HistoricalNodeItem
                nodeData={key}
                key={index}
                pinned={this.props.pinnedNodes[`ethstats/nodes/${key['ethstats:nodeData']['ethstats:nodeName']}`]}
                updateNodePinCallback={this.props.updateNodePin}
              />
            );
          }) }
        </Nodes> : <HistoricalChartSpinner height="100%"/>}
      </Scrollbars>
    );
  }
}

const mapStateToProps = (state, props) => {
  return nodeListSelector(state, props);
};

export default connect(
  mapStateToProps,
  null
)(HistoricalSortableNodesList);
