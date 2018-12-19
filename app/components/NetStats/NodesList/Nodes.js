import React from 'react';
import styled from 'styled-components';

const Nodes = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: ${props => props.height}px;
`;

export default Nodes;
