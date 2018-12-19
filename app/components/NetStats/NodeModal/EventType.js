import React from 'react';
import styled from 'styled-components';

const EventType = styled.div`
  padding: 0 10px;
  flex: 0 0 auto;
  min-width: 55px;
  
  &.red {
    color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.red_event};
  }
  &.orange {
    color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.orange_event};
  }
  &.lime {
    color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.lime_event};
  }
  &.teal {
    color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.teal_event};
  }
  &.blue {
    color: ${props => props.dimmed ? props.theme.colors.base_color : props.theme.colors.blue_event};
  }
  &.purple {
    color: ${props => props.dimmed ? props.theme.colors.purple_event : props.theme.colors.purple_event};
  }
  &.green {
    color: ${props => props.dimmed ? props.theme.colors.green : props.theme.colors.green};
  }
`;

export default EventType;
