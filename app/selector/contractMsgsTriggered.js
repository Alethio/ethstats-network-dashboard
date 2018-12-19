'use strict';

import { ContractMessagesService } from 'service';
import { createSelector } from 'reselect';

const getContractMsgsTriggered = (state) => state.contractMsgsTriggered.data;

export default createSelector(
  [ getContractMsgsTriggered ],
  (contractMsgsTriggered) => {
    return contractMsgsTriggered ? ContractMessagesService.parseArray(contractMsgsTriggered) : null;
  }
);
