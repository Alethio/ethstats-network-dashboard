import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  position: absolute;
  left: calc(50% - 400px);
  width: 800px;
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.colors.header_bg_color};
  border-radius: 16px;
  padding: 32px 40px;
  box-shadow: 0 12px 48px 0 ${props => props.theme.colors.filter_bg};
`;

export default Content;
