import React from 'react';
import styled from 'styled-components';

const EventPropertyTitle = styled.div`
  padding-right: 5px;
  color: ${props => props.theme.colors.block_chart_color};
  flex: 0 0 auto;
  
  &.red {
    color: ${props => props.theme.colors.red_event};
  }
`;

export default EventPropertyTitle;
