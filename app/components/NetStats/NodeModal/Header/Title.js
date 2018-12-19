import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 10px;
  line-height: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.block_chart_color};
  opacity: 0.6;
`;

export default Title;
