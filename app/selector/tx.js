import { createSelector } from 'reselect';
import { TxDataParserService } from 'service';

const getTx = (state) => state.tx;

export default createSelector(
  [ getTx ],
  (tx) => {
    if (tx.data) {
      if (tx.source === 'api') {
        return TxDataParserService.parseDataApiType(tx.data);
      }
      return TxDataParserService.parseDataDsType(tx.data);
    }
    return {};
  }
);
