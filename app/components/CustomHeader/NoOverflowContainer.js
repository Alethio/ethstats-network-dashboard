import React from 'react';
import styled from 'styled-components';

const NoOverflowContainer = styled.div`
  overflow: hidden;
  height: 56px;
  
  &.has-overflow {
    overflow: visible;
  }
  
  &.min1440 {
    min-width: 1440px;
  }
`;


export default NoOverflowContainer;
