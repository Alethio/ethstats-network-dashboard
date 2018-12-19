import React from 'react';
import styled from 'styled-components';

const FilterTimeframeContainer = styled.div`
  font-size: 11px;
  line-height: 12px;
  padding: 7px 11px 7px 38px;
  display: flex;
  color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.block_chart_color};
  position: relative;
  cursor: pointer;
  font-weight: 600;
`;

export default FilterTimeframeContainer;
