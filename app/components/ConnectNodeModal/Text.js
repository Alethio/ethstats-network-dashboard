import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.4px;
  padding: 0 40px 24px 0;
  color: ${props => props.theme.colors.block_chart_color};
  
  &.no-right-padding {
    padding-right: 0;
  }
  &.no-padding {
    padding: 0;
  }
  
  &.error {
    padding: 0 0 0 16px;
    color: #EF6C6C;
  }
`;

export default Text;
