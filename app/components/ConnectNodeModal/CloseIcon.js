import React from 'react';
import styled from 'styled-components';

const CloseIcon = styled.div`
  &:before, &:after {
    position: absolute;
    top: 4px;
    left: 12px;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: ${props => props.theme.colors.base_color};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

export default CloseIcon;
