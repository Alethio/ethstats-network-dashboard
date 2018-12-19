'use strict';

import { BalanceDataParserService } from 'service';
import { createSelector } from 'reselect';

const getBalance = (state) => state.tokens.data;

export default createSelector(
  [ getBalance ],
  (tokensData) => {
    return tokensData.map((token) => {
      return BalanceDataParserService.parseData(token);
    });
  }
);