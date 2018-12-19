import React from 'react';
import styled from 'styled-components';

const SmallTitle = styled.div`
  font-weight: 600;
  line-height: 15px;
  font-size: 12px;
  color: #41526A;
  padding-right: ${props => props.padded ? '8px' : '0'};
  
  span {
    padding: 0 4px;
  }
`;

export default SmallTitle;
