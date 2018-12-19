import React from 'react';
import styled from 'styled-components';

const ClearText = styled.div`
  color: ${props => props.theme.colors.white};
  padding-top: 0;
  opacity: 0.4;
  font-size: 9px;
  margin: 12px 16px 11px 10px;
  cursor: pointer;
  transition: opacity linear 200ms;
  
  :hover {
    opacity: 1;
  }
`;

export default ClearText;
