import React from 'react';
import styled from 'styled-components';

const ErrorIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${props => props.theme.colors.block_chart_color};
  font-size: 20px;
`;

export default ErrorIcon;
