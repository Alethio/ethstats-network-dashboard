import { createSelector } from 'reselect';
import { BlockDataParserService } from 'service';
import txSelector from '../tx';
import contractMsgsSelector from '../contractMsgsTriggered';
import uncleSelector from '../uncle';

const getBlockData = (state) => state.block.data;
const getLastBlock = (state) => state.lastBlock.data;
const getBlocksList = (state) => state.blocksList.data;
const getLoading = (state) => state.block.loading;
const getError = (state) => state.block.error;
const getDescription = (state) => state.descriptions.data;

export default createSelector(
  [ getBlockData, getLastBlock, getBlocksList, getLoading, getError, getDescription, txSelector, contractMsgsSelector, uncleSelector ],
  (block, lastBlock, blocksList, loading, error, description, tx, contractMsgsTriggered, uncle) => {
    return {
      blockData: block ? BlockDataParserService.parseDataApiType(block) : null,
      lastBlock,
      blocksList,
      loading,
      error,
      description,
      tx,
      contractMsgsTriggered,
      uncle
    };
  }
);
