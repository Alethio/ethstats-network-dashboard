'use strict';

import { ContractMessagesService } from 'service';
import { createSelector } from 'reselect';

const getContractMsgTriggered = (state) => {
  return state.contractMsgTriggered.data;
};

export default createSelector(
  [ getContractMsgTriggered ],
  (contractMsgsTriggered) => {
    return contractMsgsTriggered ? ContractMessagesService.parse(contractMsgsTriggered) : null;
  }
);
