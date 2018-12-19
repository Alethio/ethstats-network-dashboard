import { createSelector } from 'reselect';
import { parseTxType, parseAccountType, parseContractMessageType, abbreviateGraphEntity } from 'utils/helpers';

const getGraphProps = (props) => props;
const edgeLabels = {
  'ethon:to': 'to',
  'ethon:sends': 'sends',
  'ethon:triggersMsg': 'triggersMsg'
};

const formatGraphData = (data) => {
  return {
    edges: data.edges.map((edge) => {
      edge.label = edgeLabels[edge.types[0]];
      return edge;
    }),
    nodes: data.nodes.map((node) => {
      node.group = parseTxType(node.types);
      node.label = abbreviateGraphEntity(node.id);
      if (!node.group) {
        node.group = parseAccountType(node.types);
      }
      if (!node.group) {
        node.group = parseContractMessageType(node.types);
      }
      return node;
    })
  };
};

export default createSelector(
  [ getGraphProps ],
  (graphProps) => {
    return formatGraphData(graphProps.graphData);
  }
);
