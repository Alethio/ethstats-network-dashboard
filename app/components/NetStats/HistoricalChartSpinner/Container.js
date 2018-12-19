import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: ${props => props.height};
  background-color: ${props => props.color === "light" ? props.theme.colors.header_bg_color : props.theme.colors.filter_bg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Container;
