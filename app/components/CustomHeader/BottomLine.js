import React from 'react';
import styled from 'styled-components';

const BottomLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 24px;
  height: 1px;
  background-color: ${props => props.theme.colors.line_color};
  opacity: 0.4;
  width: calc(100% - 48px);
`;

export default BottomLine;
