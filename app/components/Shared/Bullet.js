import React from 'react';
import styled from 'styled-components';

const Bullet = styled.div`
  background: #0F1927;
  border: 2px solid ${ props => props.active ? props.theme.colors.teal : '#324156' };
  border-radius: 4px;
  position: absolute;
  top: ${ props => props.top || '27px' };
  left: ${ props => props.left || '39px' };
  width: 18px;
  height: 18px;
  z-index: 20;
`;

export default Bullet;
