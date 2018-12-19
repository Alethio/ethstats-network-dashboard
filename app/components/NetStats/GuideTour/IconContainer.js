import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.bright_gray};
  font-size: 20px;
  padding: 0 5px 0 0;
  position: relative;
  cursor: pointer;
  
  &.disabled {
    cursor: default;
  }
`;

export default IconContainer;
