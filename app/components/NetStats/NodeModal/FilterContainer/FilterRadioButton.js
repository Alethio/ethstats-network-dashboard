import React from 'react';
import styled from 'styled-components';

const FilterRadioButton = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 14px;
  border: 2px solid ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.block_chart_color};
  position: absolute;
  top: 6px;
  left: 15px;
  
 :before {
      content: '';
      height: 4px;
      width: 4px;
      border-radius: 4px;
      background-color: ${props => props.dimmed ? 'transparent' : props.theme.colors.block_chart_color}; 
      position: absolute;
      left: 3px;
      top: 3px;
  }
`;

export default FilterRadioButton;
