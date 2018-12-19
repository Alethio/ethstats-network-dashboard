import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import transactionsHistory from './transactionsHistory';
import global from './global';
import avgBlockTime from './avgBlockTime';
import avgNetworkHashrate from './avgNetworkHashrate';
import blockTime from './blockTime';
import blockDifficulty from './blockDifficulty';
import uncleCount from './uncleCount';
import gasSpending from './gasSpending';
import gasLimit from './gasLimit';
import lastBlock from './lastBlock';
import lastUncles from './lastUncles';
import blockPropagation from './blockPropagation';
import nodesList from './nodesList';
import nodesData from './nodesData';
import minersTop from './minersTop';
import pendingLastBlock from './pendingLastBlock';
import pageLatency from './pageLatency';
import nodeHistory from './nodeHistory';
import historicalBlock from './historicalBlock';

const rootReducer = combineReducers({
  transactionsHistory,
  routing,
  global,
  avgBlockTime,
  avgNetworkHashrate,
  blockTime,
  blockDifficulty,
  uncleCount,
  gasSpending,
  gasLimit,
  lastBlock,
  lastUncles,
  nodesList,
  nodesData,
  blockPropagation,
  minersTop,
  pendingLastBlock,
  pageLatency,
  nodeHistory,
  historicalBlock,
});

export default rootReducer;
