import React from 'react';
import styled from 'styled-components';

const ApplyBtn = styled.div`
  margin: ${props => props.small ? '5px 0' : '0 12px 6px'};
  background-color: ${props => props.theme.colors.blue_v1};
  border-radius: 2px;
  color: ${props => props.theme.colors.white};
  padding: 5px 0 6px;
  width: ${props => props.small ? '250px' : ''};
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  cursor: pointer;
`;

export default ApplyBtn;
