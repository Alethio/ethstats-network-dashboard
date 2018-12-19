import React from 'react';
import styled from 'styled-components';

const VerticalLine = styled.div`
  position: absolute;
  top: 0;
  left: 26px;
  width: 3px;
  height: 100%;
  background-color: ${props => props.theme.colors.line_color};
`;

export default VerticalLine;
