import React from 'react';
import styled from 'styled-components';

const InnerBullet = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 6px;
  height: 6px;
  border-radius: 100px;
  opacity: 0;
  
  &.active {
    opacity: 1;
  }
  &.red {
    background-color: ${props => props.dimmed ? props.theme.colors.red_event : props.theme.colors.red_event};
  }
  &.orange {
    background-color: ${props => props.dimmed ? props.theme.colors.orange_event : props.theme.colors.orange_event};
  }
  &.lime {
    background-color: ${props => props.dimmed ? props.theme.colors.lime_event : props.theme.colors.lime_event};
  }
  &.teal {
    background-color: ${props => props.dimmed ? props.theme.colors.teal_event : props.theme.colors.teal_event};
  }
  &.blue {
    background-color: ${props => props.dimmed ? props.theme.colors.blue_event : props.theme.colors.blue_event};
  }
  &.purple {
    background-color: ${props => props.dimmed ? props.theme.colors.purple_event : props.theme.colors.purple_event};
  }
  &.green {
    background-color: ${props => props.dimmed ? props.theme.colors.green : props.theme.colors.green};
  }
`;

export default InnerBullet;
