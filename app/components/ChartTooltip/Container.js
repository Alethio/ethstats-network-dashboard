import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colors.line_color};
  color: ${props => props.theme.colors.white};
  text-align: left;
  padding: 6px 10px;
  box-shadow: 0 2px 30px 0 rgba(0,0,0,0.40);
  border-radius: 4px;
`;

export default Container;
