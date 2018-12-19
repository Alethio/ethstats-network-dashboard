import React from 'react';
import styled from 'styled-components';

const SelectorType = styled.div`
  cursor: pointer;
  margin: 5px 10px;
  opacity: ${props => props.active ? '1' : '0.4'};
  
  &:hover {
    opacity: 1;
  }
`;

export default SelectorType;
