import React from 'react';
import styled from 'styled-components';

const FilterBullet = styled.div`
  position: absolute;
  top: 6px;
  left: 15px;
  width: 14px;
  height: 14px;
  border: 2px solid ${props =>  props.theme.colors.base_color};
  border-radius: 100px;
  
  &.active {
  }
  &.red {
    border-color: ${props => props.dimmed ? props.theme.colors.red_event : props.theme.colors.red_event};
  }
  &.orange {
    border-color: ${props => props.dimmed ? props.theme.colors.orange_event : props.theme.colors.orange_event};
  }
  &.lime {
    border-color: ${props => props.dimmed ? props.theme.colors.lime_event : props.theme.colors.lime_event};
  }
  &.teal {
    border-color: ${props => props.dimmed ? props.theme.colors.teal_event : props.theme.colors.teal_event};
  }
  &.blue {
    border-color: ${props => props.dimmed ? props.theme.colors.blue_event : props.theme.colors.blue_event};
  }
  &.purple {
    border-color: ${props => props.dimmed ? props.theme.colors.purple_event : props.theme.colors.purple_event};
  }
  &.green {
    border-color: ${props => props.dimmed ? props.theme.colors.green : props.theme.colors.green};
  }
`;

export default FilterBullet;
