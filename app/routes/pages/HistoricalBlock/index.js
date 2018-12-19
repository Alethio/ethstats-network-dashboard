import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContainerWithFixedElements from 'components/ContainerWithFixedElements';
import { getCharts as getChartsAction } from 'actions/historicalBlock';
import { getNodes as getNodesAction } from 'actions/historicalBlock';

import HistoricalChartSpinner from 'components/NetStats/HistoricalChartSpinner';
import HistoricalBigChartsSection from 'components/NetStats/HistoricalBigChartsSection';
import HistoricalNodesList from 'components/NetStats/HistoricalNodesList';
import HistoricalSmallChartsSection from 'components/NetStats/HistoricalSmallChartsSection';
import HistoricalError from 'components/NetStats/HistoricalError';


class HistoricalBlock extends React.Component {
  componentWillMount() {
    const { blockNr, getCharts, getNodes  } = this.props;
    getCharts(blockNr);
    getCharts(parseInt(blockNr, 10) + 1);
    getCharts(parseInt(blockNr, 10) + 2);
    getNodes(blockNr);
    getNodes(parseInt(blockNr, 10) + 1);
    getNodes(parseInt(blockNr, 10) + 2);
  }
  componentWillReceiveProps(nextProps) {
    const { blockNr, getCharts, getNodes, chartsData, nodesData } = this.props;
    if (blockNr !== nextProps.blockNr) {
      if (!chartsData) {
        // initial data load
        getCharts(nextProps.blockNr);
        getCharts(parseInt(nextProps.blockNr, 10) + 1);
        getCharts(parseInt(nextProps.blockNr, 10) + 2);
      } else {
        if (!chartsData[nextProps.blockNr]) {
          // missing current block data
          getCharts(nextProps.blockNr);
          if (!chartsData[nextProps.blockNr - -1]) {
            getCharts(parseInt(nextProps.blockNr, 10) + 1);
          }
          if (!chartsData[nextProps.blockNr - -2]) {
            getCharts(parseInt(nextProps.blockNr, 10) + 2);
          }
        } else {
          // have current data, prepare data for next block
          if (!chartsData[nextProps.blockNr - -1]) {
            getCharts(parseInt(nextProps.blockNr, 10) + 1);
          }
          if (!chartsData[nextProps.blockNr - -2]) {
            getCharts(parseInt(nextProps.blockNr, 10) + 2);
          }
        }
      }
      if (!nodesData) {
        // initial data load
        getNodes(nextProps.blockNr);
        getNodes(parseInt(nextProps.blockNr, 10) + 1);
        getNodes(parseInt(nextProps.blockNr, 10) + 2);
      } else {
        if (!nodesData[nextProps.blockNr]) {
          // missing current block data
          getNodes(nextProps.blockNr);
          if (!nodesData[nextProps.blockNr - -1]) {
            getNodes(parseInt(nextProps.blockNr, 10) + 1);
          }
          if (!nodesData[nextProps.blockNr - -2]) {
            getNodes(parseInt(nextProps.blockNr, 10) + 2);
          }
        } else {
          // have current data, prepare data for next block
          if (!nodesData[nextProps.blockNr - -1]) {
            getNodes(parseInt(nextProps.blockNr, 10) + 1);
          }
          if (!nodesData[nextProps.blockNr - -2]) {
            getNodes(parseInt(nextProps.blockNr, 10) + 2);
          }
        }
      }
    }
  }
  render() {
    let dataForCharts;
    let dataForNodes;
    const { chartsData, blockNr, chartsError, nodesError, nodesData } = this.props;
    if (chartsData) {
      if (chartsData[this.props.blockNr]) {
        dataForCharts = chartsData[this.props.blockNr][0];
      }
    }
    if (nodesData) {
      dataForNodes = nodesData[this.props.blockNr];
    }

    let hasError = false;
    if (chartsError) {
      if (chartsError[this.props.blockNr]) {
        if (Object.keys(chartsError[this.props.blockNr]).length !== 0) {
          hasError = true;
        }
      }
    }
    if (nodesError) {
      if (nodesError[this.props.blockNr]) {
        if (Object.keys(nodesError[this.props.blockNr]).length !== 0) {
          hasError = true;
        }
      }
    }
    return (
      <div className="full-width" style={{minWidth: '1440px'}}>
        { !hasError ?
          <ContainerWithFixedElements>
            { dataForCharts ? <HistoricalBigChartsSection data={dataForCharts} blockNr={blockNr}/> : <HistoricalChartSpinner height="213px" color="light"/> }
            <HistoricalNodesList blockNr={blockNr}/>
            { dataForCharts && dataForNodes ? <HistoricalSmallChartsSection data={dataForCharts} nodesData={dataForNodes}/> : <HistoricalChartSpinner height="186px"/> }
          </ContainerWithFixedElements> :
          <ContainerWithFixedElements>
            <HistoricalError/>
          </ContainerWithFixedElements>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartsData: state.historicalBlock.chartsData,
    nodesData: state.historicalBlock.nodesData,
    nodesError: state.historicalBlock.nodesError,
    chartsError: state.historicalBlock.chartsError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCharts: (blockNr) => dispatch(getChartsAction(blockNr)),
    getNodes: (blockNr) => dispatch(getNodesAction(blockNr)),
  };
};

HistoricalBlock.propTypes = {
  blockNr: PropTypes.string,
  getCharts: PropTypes.func,
  getNodes: PropTypes.func,
  chartsData: PropTypes.object,
  nodesData: PropTypes.object,
  chartsError: PropTypes.object,
  nodesError: PropTypes.object,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalBlock);

