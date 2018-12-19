import React from 'react';
import styled from 'styled-components';

const CustomTooltip = styled.div`
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0.2px;
  color: white;
  position: absolute;
  top: 15px;
  left: -10px;
  background: #182231;
  padding: 10px;
  z-index: 1000;
  opacity: 0.8;
  overflow: visible;
  width: 250px;
  word-wrap: break-word;
  border-radius: 4px;
  
  &.small {
    max-width: 120px;
    text-align: center;
  }
  
  &.details-tooltip {
    left: 20px;
    top: 40px;
  }
  
  &:hover {
    display: block;
  }
`;

export default CustomTooltip;
