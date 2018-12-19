import React from 'react';
import styled from 'styled-components';

const Bullet = styled.div`
  width: 6px;
  height: 6px;
  margin: 2px;
  background: ${props => props.theme.colors.teal};
  border-radius: 28px;
  
  &.dimmed {
    background: ${props => props.theme.colors.line_color};
  }
`;

export default Bullet;
