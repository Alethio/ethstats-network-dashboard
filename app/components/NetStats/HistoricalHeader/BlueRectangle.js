import React from 'react';
import styled from 'styled-components';

const BlueRectangle = styled.div`
  position: absolute;
  top: 2px;
  left: -5px;
  height: 4px;
  width: 5px;
  background-color: ${props => props.theme.colors.header_bg_color};
  border-top-right-radius: 4px;
`;

export default BlueRectangle;
