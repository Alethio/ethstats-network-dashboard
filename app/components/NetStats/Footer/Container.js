import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 12px 24px;
  display: flex;
  background-color: ${props => props.theme.colors.header_bg_color};
  justify-content: space-between;
  min-width: 1440px;
`;

export default Container;
