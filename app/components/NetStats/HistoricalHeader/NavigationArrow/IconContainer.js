import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  padding: 10px;
  font-size: 12px;
  color: white;
  cursor: pointer;
  border-radius: 16px;
  height: 32px;
  transition: all linear 200ms;
  opacity: ${props => props.disabled ? '0.2' : '1'};
  
  &:hover {
    background-color: white;
    color: ${props => props.theme.colors.blue_v1};
  }
`;

export default IconContainer;
