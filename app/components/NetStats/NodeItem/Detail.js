import React from 'react';
import styled from 'styled-components';

const Detail = styled.div`
  width: ${props => props.width};
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0.2px;
  color: ${props => props.color};
  position: relative;
  text-align: ${props => props.rightSide ? 'right' : 'left'};
  flex-grow: ${props => props.doubleGrow ? '2' : '1'};
  
  .space {
    padding: 0 6px;
  }
  
  .tooltip {
    display: none;
  }
  
  &:hover {
    .tooltip {
      display: block;
    }
  }
`;

export default Detail;
