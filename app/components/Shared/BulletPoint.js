import React from 'react';
import styled from 'styled-components';

const BulletPoint = styled.div`
  background: ${props => props.theme.colors.teal};
  border: 2px solid ${ props => props.active ? props.theme.colors.teal : '#324156' };
  border-radius: 4px;
  position: relative;
  text-align: center;
  margin: 35% auto;
  height: 4px;
  width: 4px;
  z-index: 20;
`;

export default BulletPoint;
