import React from 'react';
import styled from 'styled-components';

const Value = styled.div`
  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
  color: ${props => props.color};
  padding-top: 5px;
  
  &.padded {
    padding-right: 40px;
  }
`;

export default Value;
