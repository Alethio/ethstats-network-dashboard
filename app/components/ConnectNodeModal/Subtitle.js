import React from 'react';
import styled from 'styled-components';

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  color: ${props => props.light ? props.theme.colors.block_chart_color : props.theme.colors.base_color};
`;

export default Subtitle;
