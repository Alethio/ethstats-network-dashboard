import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.2px;
  font-weight: 600;
  padding: 6px 16px 6px 6px;
  margin-right: 16px;
  border-radius: 20px;
  transition: all linear 0.2s;
  opacity: ${props => props.disabled ? '0.2' : '1'};
  
   &:hover {
    color: ${props => props.hasError ? props.theme.colors.red_event : props.theme.colors.blue_v1};
    background-color: white;
  }
`;

export default Container;
