import React from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  position: relative;
  height: 2px;
  width: ${props => props.width};
  opacity: ${props => props.width === '0%' ? '0' : '1'};
  background-color: ${props => props.theme.colors.white};
  transition: width linear 0.25s;
`;

export default ProgressBar;
