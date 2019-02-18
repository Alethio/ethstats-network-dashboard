import React from 'react';

import BigChart from 'components/NetStats/BigChart';
import BottomLeft from './BottomLeft';
import ChartIcon from './ChartIcon';
import Container from './Container';
import FlexRow from './FlexRow';
import Icon from 'components/Icon';
import LeftContainer from './LeftContainer';
import PropTypes from 'prop-types';
import RightContainer from './RightContainer';
import TopLeft from './TopLeft/index';
import TopRight from './TopRight/index';
import { AVG_GAS_PRICE_ENABLED } from 'config';

class BigChartsSectionItem extends React.Component {
  render() {
    const { color, mainTitle, bottomLeftReducer, secondTitle, secondValue, thirdTitle, dataKey, tooltipKey, measureUnit, hasDomain, iconName, chartReducer, topLeftReducer, topRightReducer, labelPrefix, valuePrefix} = this.props;
    return (
      <Container id={this.props.id}>
        <LeftContainer>
          <TopLeft reducerName={topLeftReducer} color={color} mainTitle={mainTitle}/>
          <BottomLeft color={color} mainTitle={secondTitle} mainValue={secondValue} reducerName={bottomLeftReducer}/>
        </LeftContainer>
        <RightContainer>
          <ChartIcon color={color}>
            <Icon name={iconName} />
          </ChartIcon>
          <FlexRow>
            {(topRightReducer !== 'pendingLastBlock' || (topRightReducer === 'pendingLastBlock' && AVG_GAS_PRICE_ENABLED)) && <TopRight color={color} mainTitle={thirdTitle} reducerName={topRightReducer}/>}
          </FlexRow>
          <BigChart valuePrefix={valuePrefix} labelPrefix={labelPrefix} color={color} dataKey={dataKey} measureUnit={measureUnit} tooltipKey={tooltipKey} hasDomain={hasDomain} chartReducer={chartReducer} hasNavigation/>
        </RightContainer>
      </Container>
    );
  }
}

BigChartsSectionItem.propTypes = {
  id: PropTypes.string,
  bottomLeftReducer: PropTypes.string,
  chartReducer: PropTypes.string,
  color: PropTypes.string,
  dataKey: PropTypes.string,
  hasDomain: PropTypes.bool,
  iconName: PropTypes.string,
  mainTitle: PropTypes.string,
  measureUnit: PropTypes.string,
  valuePrefix: PropTypes.string,
  labelPrefix: PropTypes.string,
  secondTitle: PropTypes.string,
  secondValue: PropTypes.string,
  thirdTitle: PropTypes.string,
  tooltipKey: PropTypes.string,
  topLeftReducer: PropTypes.string,
  topRightReducer: PropTypes.string
};

export default BigChartsSectionItem;
