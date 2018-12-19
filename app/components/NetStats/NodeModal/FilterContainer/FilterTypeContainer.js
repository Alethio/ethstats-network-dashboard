import React from 'react';
import styled from 'styled-components';

const FilterTypeContainer = styled.div`
  font-size: 11px;
  line-height: 12px;
  padding: 7px 11px 7px 38px;
  display: flex;
  justify-content: space-between;
  color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.block_chart_color};
  position: relative;
  cursor: pointer;
  
  &.active {
    font-weight: ${props => props.dimmed ? '400' : '600'};
  }
  &.red {
    color: ${props => props.dimmed ? props.theme.colors.red_event : props.theme.colors.red_event};
  }
  &.orange {
    color: ${props => props.dimmed ? props.theme.colors.orange_event : props.theme.colors.orange_event};
  }
  &.lime {
    color: ${props => props.dimmed ? props.theme.colors.lime_event : props.theme.colors.lime_event};
  }
  &.teal {
    color: ${props => props.dimmed ? props.theme.colors.teal_event : props.theme.colors.teal_event};
  }
  &.blue {
    color: ${props => props.dimmed ? props.theme.colors.blue_event : props.theme.colors.blue_event};
  }
  &.purple {
    color: ${props => props.dimmed ? props.theme.colors.purple_event : props.theme.colors.purple_event};
  }
  &.green {
    color: ${props => props.dimmed ? props.theme.colors.green : props.theme.colors.green};
  }
  &.inactive {
    font-weight: 400;
    color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.block_chart_color};
  }
`;

export default FilterTypeContainer;
