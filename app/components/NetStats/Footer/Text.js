import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  color: ${props => props.theme.colors.bright_gray};
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.2px;
  transition: color linear 0.2s;
`;

export default Text;
