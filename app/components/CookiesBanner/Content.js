import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: ${props => props.theme.colors.header_bg_color};
  align-items: center;
`;

export default Content;
