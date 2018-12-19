import React from 'react';
import styled from 'styled-components';

const CloseIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  height: 24px;
  width: 24px;
  padding: 6px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s linear;
  
  &:hover {
    opacity: 1;
  }
`;

export default CloseIconContainer;
