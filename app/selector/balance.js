'use strict';

import { BalanceDataParserService } from 'service';
import { createSelector } from 'reselect';

const getBalance = (state) => state.balance.data;

export default createSelector(
  [ getBalance ],
  (balanceData) => {
    return BalanceDataParserService.parseData(balanceData);
  }
);
