import React from 'react';
import styled from 'styled-components';

const Value = styled.div`
  padding-bottom: 30px;
  font-weight: 600;
  line-height: 28px;
  font-size: 24px;
  color: ${props => props.color};
  position: relative;
`;

export default Value;
