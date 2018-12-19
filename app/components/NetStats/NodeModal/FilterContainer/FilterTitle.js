import React from 'react';
import styled from 'styled-components';

const FilterTitle = styled.div`
  background-color: ${props => props.theme.colors.filter_bg};
  border-radius: 8px 8px 0 0;
  box-shadow: 0 12px 24px 0 ${props => props.theme.colors.filter_bg};
  background-color: ${props => props.theme.colors.header_bg_color};
  text-align: center;
  font-weight: 600;
  font-size: 11px;
  line-height: 13px;
  color: ${props => props.theme.colors.block_chart_color};
  padding: 5px 0 7px;
  margin-bottom: 7px;
`;

export default FilterTitle;
