import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  &.white {
    color: ${props => props.theme.colors.white};
  }
  &.red {
    color: ${props => props.theme.colors.red_event};
  }
`;

export default Label;
