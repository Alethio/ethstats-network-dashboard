import { createSelector } from 'reselect';
import { UncleDataParserService } from 'service';
const getUncle = (state) => state.uncle;

export default createSelector(
  [ getUncle ],
  (uncle) => {
    if (uncle.data) {
      return UncleDataParserService.parseData(uncle.data);
    }
    return {};
  }
);
