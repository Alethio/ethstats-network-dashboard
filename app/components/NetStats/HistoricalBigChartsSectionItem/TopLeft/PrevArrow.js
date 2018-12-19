import React from 'react';
import styled from 'styled-components';

const PrevArrow = styled.div`
  position: absolute;
  top: 6px;
  left: -25px;
  font-size: 10px;
  font-weight: 600;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity linear 0.2s;
  border: 2px solid ${props => props.color};
  border-radius: 100%;
  width: 18px;
  height: 18px;
  
  .prev-arrow {
    position: absolute;
    top: 2px;
    left: 3px;
  }
  
  &:hover {
    opacity: 1;
  }
  
`;

export default PrevArrow;
