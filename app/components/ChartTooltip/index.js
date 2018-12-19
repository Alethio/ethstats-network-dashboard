import React from 'react';
import PropTypes from 'prop-types';
import Container from  './Container';
import Label from './Label';
import Value from './Value';
import moment from 'moment';

import { numberWithCommas } from 'utils/helpers';

const ChartTooltip = (props) => {
  const { active, dataKey, tooltipKey, measureUnit, convertData, valuePrefix, labelPrefix, forUncles } = props;

  if (active) {
    const { payload, full } = props;
    let percentage;
    let frequency;
    let cumulative;
    let labelText = payload[0].payload[tooltipKey];
    if (full) {
      percentage = numberWithCommas(payload[0].payload[dataKey].toFixed(2));
      frequency = payload[0].payload.frequency;
      cumulative = payload[0].payload.cumulative;
      if (percentage / 100 === 0) {
        percentage = parseInt(percentage, 10);
      }
    }
    if(convertData) {
      labelText = moment.unix(labelText).format('YYYY-MM-DD');
    }
    return (
      <div>
        {full ?
          <Container>
            <Label>{payload[0].payload[tooltipKey]}</Label>
            <Value>Percent: {percentage}%</Value>
            <Value>Frequency: {frequency}</Value>
            <Value>Cumulative: {cumulative}</Value>
          </Container> :
          forUncles ?
            <Container>
              <Value>{valuePrefix} {numberWithCommas(payload[0].payload[dataKey])} {measureUnit}</Value>
              <Label>{labelPrefix} {labelText.split('/')[0]}</Label>
              <Label>{labelPrefix} {labelText.split('/')[1]}</Label>
            </Container>
            :
            <Container>
              <Value>{valuePrefix} {numberWithCommas(payload[0].payload[dataKey])} {measureUnit}</Value>
              <Label>{labelPrefix} {labelText}</Label>
            </Container>
        }
      </div>
    );
  }

  return null;
};

ChartTooltip.propTypes = {
  type: PropTypes.string,
  dataKey: PropTypes.string,
  tooltipKey: PropTypes.string,
  measureUnit: PropTypes.string,
  valuePrefix: PropTypes.string,
  labelPrefix: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.number,
  active: PropTypes.bool,
  full: PropTypes.bool,
  forUncles: PropTypes.bool,
  convertData: PropTypes.bool,
};

export default ChartTooltip;
