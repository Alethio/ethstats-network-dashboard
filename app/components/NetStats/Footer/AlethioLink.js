import React from 'react';
import styled from 'styled-components';

const AlethioLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.colors.bright_gray} !important;
  transition: color linear 0.2s;
  
  &:hover {
    color: ${props => props.theme.colors.block_chart_color} !important;
    
    div {
     color: ${props => props.theme.colors.block_chart_color} !important;
     transition: color linear 0.2s;        
    }
  }
`;

export default AlethioLink;
