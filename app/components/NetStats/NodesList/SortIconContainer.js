import React from 'react';
import styled from 'styled-components';

const SortIconContainer = styled.div`
  font-size: 8px;
  transform: ${props => props.ascending ? 'rotate(180deg)' : 'rotate(0deg)'};
  padding-top: 2px;
  padding-left: 5px;
  padding-right: 5px;
`;

export default SortIconContainer;
