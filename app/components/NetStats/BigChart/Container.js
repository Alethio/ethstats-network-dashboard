import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: ${props => props.spaceBetween ? 'space-between' : 'flex-start'};
  padding-top: ${props => props.padded ? '8px' : '0'};
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  color: ${props => props.theme.colors.min_max_gray};
`;

export default Container;
