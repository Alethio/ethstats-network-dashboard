import React from 'react';
import styled from 'styled-components';

const DatepickerRow = styled.div`
  display: flex;
  margin: 12px 12px 0;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.colors.header_bg_color};
  margin-bottom: 12px;
  
  input {
    font-family: 'ArialMonospacedMT', monospace !important;
    color: ${props => props.theme.colors.block_chart_color} !important; 
    font-size: 12px !important;
    line-height: 13px !important;
    border: none !important;
    background: none !important;
    margin: 0 !important;
    padding: 6px 0 6px 21px !important;
    width: 150px;
    min-width: 100px !important;
    max-width: 150px !important;
    text-decoration: none;
  }
`;

export default DatepickerRow;
