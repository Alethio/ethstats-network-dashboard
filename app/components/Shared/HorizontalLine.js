import React from 'react';
import styled from 'styled-components';

const HorizontalLine = styled.div`
  height: 1px;
  width: 100%;
  opacity: ${ props => props.opacity || '0.6' };
  background: #324156;
  margin: ${props => props.margin || '32px auto'};
`;

export default HorizontalLine;
