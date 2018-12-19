import React from 'react';
import styled from 'styled-components';
import TxDetailText from "./TxDetailText";

const TxDetailValue = styled.div`
  color: #8399B8;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 12px;
  word-wrap: break-word;
  margin-top: 6px;
  &.contract-value {
    color: #2774FE;
    margin-top: 16px;
  }
`;

export default TxDetailValue;
