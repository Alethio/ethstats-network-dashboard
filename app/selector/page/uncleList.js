import { createSelector } from 'reselect';

const getUncles = (state) => state.uncles.data;
const getUncleActiveValue = (state, props) => props.uncleActiveValue;
const formatUncles = (uncles, uncleActiveValue) => {
  const result = {
    uncles: [],
    activeItem: null
  };
  let props = null;
  const uncleData = uncles ? uncles : [];
  for (let i = 0; i < uncleData.length; i++) {
    props = {
      uncleHash: uncleData[i]['ethon:blockHash'],
      uncleTimeStamp: uncleData[i]['ethon:blockCreationTime'],
      uncleMiner: uncleData[i]['ethon:hasBeneficiary'],
      key: i
    };
    if (uncleActiveValue && uncleActiveValue === `0x${uncleData[i]['ethon:blockHash']}`) {
      props.active = true;
      result.activeItem = props;
    }
    result.uncles.push(props);
  }
  return result;
};

export default createSelector(
  [ getUncles, getUncleActiveValue ],
  (uncles, uncleActiveValue) => {
    return formatUncles(uncles, uncleActiveValue);
  }
);
