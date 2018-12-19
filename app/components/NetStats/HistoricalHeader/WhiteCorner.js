import React from 'react';
import styled from 'styled-components';

const WhiteCorner = styled.div`
  position: absolute;
  top: 2px;
  left: -3px;
  height: 4px;
  width: 4px;
  background-color: ${props => props.theme.colors.white};
`;

export default WhiteCorner;
