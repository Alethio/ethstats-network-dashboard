import React from 'react';
import styled from 'styled-components';

const MinedBlock = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 1px;
  margin-right: 2px;
  background-color: ${props => props.color};
`;

export default MinedBlock;
