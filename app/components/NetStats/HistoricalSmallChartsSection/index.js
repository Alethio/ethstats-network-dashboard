import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/NetStats/SmallChartsSection/Container';
import SmallChartsContainer from 'components/NetStats/SmallChartsSection/SmallChartsContainer';
import HistoricalSmallChartsSectionItem from 'components/NetStats/HistoricalSmallChartsSectionItem';
import HistoricalLastMiners from 'components/NetStats/HistoricalLastMiners';
import HistoricalNodesMap from 'components/NetStats/HistoricalNodesMap';

class HistoricalSmallChartsSection extends React.Component {
  render() {
    const { data } = this.props;
    let unclesCountChartData = [];
    let transactionsChartData = [];
    let gasSpendingChartData = [];
    let histogramChartdata = [];
    let minersData = [];

    if (data) {
      unclesCountChartData = data.charts['ethstats:uncleCountChartData'];
      transactionsChartData = data.charts['ethstats:transactionsChartData'];
      gasSpendingChartData = data.charts['ethstats:gasSpendingChartData'];
      histogramChartdata = data.charts['ethstats:blockPropagationChartData']['ethstats:blockPropagationHistogramData'];
      minersData = data.charts['ethstats:topMinersChartData'];
    }
    return (
      <Container>
        <SmallChartsContainer id="small_charts">
          <HistoricalSmallChartsSectionItem
            title="Uncles - 25 blocks/bar"
            dataKey="ethstats:count"
            measureUnit="uncles"
            tooltipKey="block"
            color="#2774FE"
            reducerName="uncleCount"
            chartData={unclesCountChartData}
          />
          <HistoricalSmallChartsSectionItem
            title="Transactions"
            dataKey="alethio:numberOfTxs"
            measureUnit="TXs"
            tooltipKey="block"
            color="#50E9D2"
            reducerName="transactionsHistory"
            // valuePrefix="Transactions: "
            labelPrefix="Block: "
            chartData={transactionsChartData}
            hasNavigation
          />
          <HistoricalSmallChartsSectionItem
            title="Gas spending"
            dataKey="ethon:blockGasUsed"
            measureUnit="gas"
            tooltipKey="block"
            color="#8399B8"
            hasDomain
            reducerName="gasSpending"
            // valuePrefix="Gas spending: "
            labelPrefix="Block: "
            chartData={gasSpendingChartData}
            hasNavigation
          />
          <HistoricalSmallChartsSectionItem
            title="Block propagation"
            dataKey="histogram"
            tooltipKey="interval"
            color="#EF6C6C"
            full
            reducerName="blockPropagation"
            chartData={histogramChartdata}
          />
          <HistoricalLastMiners minersData={minersData}/>
          <HistoricalNodesMap nodesData={this.props.nodesData}/>
        </SmallChartsContainer>
      </Container>
    );
  }
}

HistoricalSmallChartsSection.propTypes = {
  data: PropTypes.object,
  nodesData: PropTypes.array,
};

export default HistoricalSmallChartsSection;
