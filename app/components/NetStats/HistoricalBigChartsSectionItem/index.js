import React from 'react';
import PropTypes from 'prop-types';

import HistoricalBigChart from 'components/NetStats/HistoricalBigChart';
import BottomLeft from './BottomLeft';
import ChartIcon from 'components/NetStats/BigChartsSectionItem/ChartIcon';
import Container from 'components/NetStats/BigChartsSectionItem/Container';
import FlexRow from 'components/NetStats/BigChartsSectionItem/FlexRow';
import Icon from 'components/Icon';
import LeftContainer from 'components/NetStats/BigChartsSectionItem/LeftContainer';
import RightContainer from 'components/NetStats/BigChartsSectionItem/RightContainer';
import TopLeft from './TopLeft/index';
import TopRight from './TopRight/index';

class HistoricalBigChartsSectionItem extends React.Component {
  render() {
    const { color, mainTitle, mainValue, secondTitle, secondValue, thirdTitle, thirdValue, dataKey, tooltipKey, measureUnit, hasDomain, iconName, chartsData, labelPrefix, valuePrefix, hasNavigation} = this.props;
    return (
      <Container>
        <LeftContainer>
          <TopLeft color={color} title={mainTitle} value={mainValue}/>
          <BottomLeft color={color} title={secondTitle} value={secondValue}/>
        </LeftContainer>
        <RightContainer>
          <ChartIcon color={color}>
            <Icon name={iconName} />
          </ChartIcon>
          <FlexRow>
            <TopRight color={color} title={thirdTitle} value={thirdValue}/>
          </FlexRow>
          <HistoricalBigChart valuePrefix={valuePrefix} labelPrefix={labelPrefix} color={color} dataKey={dataKey} measureUnit={measureUnit} tooltipKey={tooltipKey} hasDomain={hasDomain} chartData={chartsData} hasNavigation={hasNavigation}/>
        </RightContainer>
      </Container>
    );
  }
}

HistoricalBigChartsSectionItem.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  dataKey: PropTypes.string,
  hasDomain: PropTypes.bool,
  iconName: PropTypes.string,
  mainTitle: PropTypes.string,
  mainValue: PropTypes.string,
  measureUnit: PropTypes.string,
  valuePrefix: PropTypes.string,
  labelPrefix: PropTypes.string,
  secondTitle: PropTypes.string,
  secondValue: PropTypes.string,
  thirdTitle: PropTypes.string,
  thirdValue: PropTypes.string,
  tooltipKey: PropTypes.string,
  chartsData: PropTypes.array,
  hasNavigation: PropTypes.bool,
};

export default HistoricalBigChartsSectionItem;
