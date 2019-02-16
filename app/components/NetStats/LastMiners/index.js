import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from './Container';
import Title from './Title';
import MinerRow from './MinerRow';
import MinedBlocksRow from './MinedBlocksRow';
import MinedBlock from './MinedBlock';
import NumberOfBlocks from './NumberOfBlocks';
import ClickableContainer from './ClickableContainer';

class LastMiners extends React.Component {
  render() {
    const { minersData } = this.props;
    let content = [];
    let color = '#50E9D2';
    if (minersData && minersData.length) {
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

LastMiners.propTypes = {
  minersData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    minersData: state.minersTop.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LastMiners);
