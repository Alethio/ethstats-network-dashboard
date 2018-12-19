import React from 'react';
import styled from 'styled-components';

const AlethioText = styled.div`
  font-size: 10px;
  font-weight: 600;
  padding-left: 7px;
  padding-bottom: 4px;
  opacity: 0.8; 
  transition: opacity linear 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

export default AlethioText;
