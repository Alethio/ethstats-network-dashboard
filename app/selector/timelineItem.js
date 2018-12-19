import moment from 'moment';
import { createSelector } from 'reselect';
import { numberWithCommas, formatNumber } from 'utils/helpers';

const getActionDataByType = (state, props) => props.item;

export default createSelector(
  [ getActionDataByType ],
  (props) => {
    const defaultInfo = {
      timeAgo: moment(props.date).fromNow(true) + ' ago',
      ...props
    };
    switch (props.type) {
      case 'CryptoKitties':
        return {
          ...defaultInfo,
          values: [props.description]
        };
      case 'Transfered':
      case 'Received':
        return {
          ...defaultInfo,
          values: [numberWithCommas(formatNumber(defaultInfo.qty.value)) + ' ' + defaultInfo.qty.currency]
        };
      default:
        return {};
    }
  }
);
