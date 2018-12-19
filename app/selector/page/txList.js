import { createSelector } from 'reselect';

const getTxs = (state) => state.blockTxs.data;
const getTxActiveValue = (state, props) => props.txActiveValue;

const formatTxs = (txs, txActiveValue) => {
  let result = {
    txs: [],
    activeItem: null
  };
  let props = null;
  const txsData = txs ? txs : [];
  for (let i = 0; i < txsData.length; i++) {
    props = {
      hash: txsData[i]['ethon:txHash'],
      from: txsData[i]['ethon:from'],
      to: txsData[i]['ethon:to'],
      value: txsData[i]['ethon:value'],
      key: i
    };
    if (txActiveValue && txActiveValue === `0x${txsData[i]['ethon:txHash']}`) {
      props.active = true;
      result.activeItem = props;
    }
    result.txs.push(props);
  }
  return result;
};

export default createSelector(
  [ getTxs, getTxActiveValue ],
  (txs, txActiveValue) => {
    return formatTxs(txs, txActiveValue);
  }
);
