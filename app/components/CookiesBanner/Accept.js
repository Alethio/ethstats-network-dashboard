import React from 'react';
import styled from 'styled-components';

const Accept = styled.div`
  cursor: pointer;
  padding: 8px 16px 9px;
  color: white;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.2px;
  font-weight: 600;
  background-color: ${props => props.theme.colors.blue_v1};
  border-radius: 16px;
  transition: background-color linear 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.transparent_blue};
  }
`;

export default Accept;
