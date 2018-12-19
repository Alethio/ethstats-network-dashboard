import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background-color: ${props => props.hasError ? props.theme.colors.red_event : props.theme.colors.blue_v1};
  width: 100%;
  padding: 7px 24px 7px 12px;
  box-shadow: 0 12px 24px 0 #0F1927;
  justify-content: space-between;
  position: relative;
  
  -webkit-transition: 300ms ease-in;
  -moz-transition: 300ms ease-in;
  -o-transition: 300ms ease-in;
  transition: 300ms ease-in;
  
  &.notHidden {
    transform: translateY(-56px);
  }
`;

export default Container;
