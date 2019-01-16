import React from 'react';
import Container from './Container';
import SmallChartsContainer from './SmallChartsContainer';
import SmallChartsSectionItem from 'components/NetStats/SmallChartsSectionItem';
import LastMiners from 'components/NetStats/LastMiners';
import NodesMap from 'components/NetStats/NodesMap';

class SmallChartsSection extends React.Component {
  render() {
    return (
      <Container>
        <SmallChartsContainer id="small_charts">
          <SmallChartsSectionItem
            title="Uncles - 25 blocks/bar"
            dataKey="ethstats:count"
            measureUnit="uncles"
            tooltipKey="block"
            color="#2774FE"
            reducerName="uncleCount"
          />
          <SmallChartsSectionItem
            title="Transactions"
            dataKey="alethio:numberOfTxs"
            measureUnit="TXs"
            tooltipKey="block"
            color="#50E9D2"
            reducerName="transactionsHistory"
            // valuePrefix="Transactions: "
            labelPrefix="Block: "
            hasNavigation
          />
          <SmallChartsSectionItem
            title="Gas spending"
            dataKey="ethon:blockGasUsed"
            measureUnit="gas"
            tooltipKey="block"
            color="#8399B8"
            hasDomain
            reducerName="gasSpending"
            // valuePrefix="Gas spending: "
            labelPrefix="Block: "
            hasNavigation
          />
          <SmallChartsSectionItem
            title="Block propagation"
            dataKey="histogram"
            tooltipKey="interval"
            color="#EF6C6C"
            full
            reducerName="blockPropagation"
          />
          <LastMiners/>
          <NodesMap/>
        </SmallChartsContainer>
      </Container>
    );
  }
}

export default SmallChartsSection;
