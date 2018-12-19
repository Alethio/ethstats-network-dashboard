import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  color: ${props => props.theme.colors.blue_event};
  padding: 16px 0;
`;

export default Title;
