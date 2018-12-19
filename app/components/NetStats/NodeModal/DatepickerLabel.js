import React from 'react';
import styled from 'styled-components';

const DatepickerLabel = styled.div`
  padding: 6px 0 7px;
  min-width: 36px;
  background-color: ${props => props.theme.colors.header_bg_color};
  border-radius: 2px 0 0 2px;
  font-size: 10px;
  line-height: 12px;
  color: ${props => props.theme.colors.block_chart_color};
  text-align: center;
`;

export default DatepickerLabel;
