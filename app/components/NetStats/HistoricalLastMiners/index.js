import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/NetStats/LastMiners/Container';
import Title from 'components/NetStats/LastMiners/Title';
import MinerRow from 'components/NetStats/LastMiners/MinerRow';
import MinedBlocksRow from 'components/NetStats/LastMiners/MinedBlocksRow';
import MinedBlock from 'components/NetStats/LastMiners/MinedBlock';
import NumberOfBlocks from 'components/NetStats/LastMiners/NumberOfBlocks';
import ClickableContainer from 'components/NetStats/LastMiners/ClickableContainer';

class HistoricalLastMiners extends React.Component {
  render() {
    const { minersData } = this.props;
    let content = [];
    let color = '#50E9D2';
    if (minersData && minersData.length >= 2) {
      const usedData = minersData.slice(0, 2);
      usedData.forEach((item, index) => {
        if (index !== 0) {
          color = '#EFC865';
        }
        let blocks = [];
        for (let i = 0; i < item['ethstats:count']; i++) {
          blocks.push(<MinedBlock key={i} color={color}/>);
        }
        content.push(
          <MinerRow key={index}>
            <div>
              <ClickableContainer name={item['ethstats:hasAuthorBeneficiary']}/>
              <MinedBlocksRow>
                {blocks}
              </MinedBlocksRow>
            </div>
            <NumberOfBlocks color={color}>{item['ethstats:count']}</NumberOfBlocks>
          </MinerRow>
        );
      });
    }
    return (
      <Container>
        <Title>Last block miners</Title>
        {content}
      </Container>
    );
  }
}

HistoricalLastMiners.propTypes = {
  minersData: PropTypes.array,
};

export default HistoricalLastMiners;
