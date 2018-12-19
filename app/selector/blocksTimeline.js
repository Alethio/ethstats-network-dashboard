import { createSelector } from 'reselect';

const getData = (state, props) => props.data;
const getCurrent = (state, props) => props.current;

export default createSelector(
  [getData, getCurrent],
  (data, current) => {
    let results = {
      data: [],
      activeItem: null
    };
    let result = null;
    for (let i = 0; i < data.length; i++) {
      result = {
        blockNumber: data[i]['ethon:number'] ? data[i]['ethon:number'].toString() : '',
        blockTimestamp: data[i]['ethon:blockCreationTime'],
        blockMiner: data[i]['ethon:hasBeneficiary'],
        txCount: data[i]['alethio:numberOfTxs'] ? data[i]['alethio:numberOfTxs'].toString() : '',
        blockTime: data[i]['alethio:blockTime'] ? data[i]['alethio:blockTime'].toString() : '',
        reward: data[i]['ethon:blockBeneficiaryReward']
      };
      if (data[i]['ethon:number'] && current.toString() === data[i]['ethon:number'].toString()) {
        results.activeItem = result;
      }
      results.data.push(result);
    }
    return results;
  }
);
