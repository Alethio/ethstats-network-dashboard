import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  cursor: pointer;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  max-width: ${props => props.maxWidth};
  min-width: ${props => props.minWidth};
  align-items: center;
  background-color: ${props => props.theme.colors.blue_v1};
  color: ${props => props.theme.colors.white};
  padding: 6px 6px 6px 16px;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.2px;
  font-weight: 600;
  transition: all 0.2s linear;
  
  &:hover {
    background-color: ${props => props.theme.colors.transparent_blue};
  }
  
  .icon {
    font-size: 20px;
    margin-left: 7px;
  }
  
  .rotated {
    transform: rotate(180deg);
  }
`;

export default Button;
