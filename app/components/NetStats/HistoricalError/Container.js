import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  padding-top: 225px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.8px;
  color: ${props => props.theme.colors.red_event};
`;

export default Container;
