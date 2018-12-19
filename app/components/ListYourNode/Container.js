import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.colors.bright_gray};
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.2px;
  padding: 6px 16px 6px 6px;
  margin-right: ${props => props.noMargin ? '0' : '16px'};
  border-radius: 20px;
  transition: all linear 0.2s;
  
  &:hover {
    color: white;
    background-color: ${props => props.theme.colors.blue_v1};
    
    .white-hover {
      color: white;
    }
  }
`;

export default Container;
