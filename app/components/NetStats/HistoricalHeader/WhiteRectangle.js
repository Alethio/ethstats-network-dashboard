import React from 'react';
import styled from 'styled-components';

const WhiteRectangle = styled.div`
  position: absolute;
  right: -4px;
  bottom: -15px;
  background-color: ${props => props.theme.colors.white};
  font-family: 'ArialMonospacedMT', monospace;
  font-size: 11px;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0.2px;
  color: ${props => props.theme.colors.blue_v1};
  padding: 2px 4px;
  border-radius: 4px;
`;

export default WhiteRectangle;
