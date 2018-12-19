import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.hasError ? props.theme.colors.error_bg : 'rgba(255, 255, 255, 0.2)'};
  align-items: center;
  width: 196px;
  border-radius: 20px;
  padding-left: 12px;
  margin: 0 12px;
  height: 32px;
  
  .iconContainer {
    padding-top: 4px;
    font-size: 16px;
  }
`;

export default Container;
