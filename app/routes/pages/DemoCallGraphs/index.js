import React from 'react';
import Graph from 'react-graph-vis';
import TxIcon from 'resources/img/Transaction.png';
import ContractMsgIcon from 'resources/img/ContractMsg.png';
import ExternalAccountIcon from 'resources/img/ExternalAccount.png';
import ContractAccountIcon from 'resources/img/ContractAccount.png';
import triggerGraph from 'resources/dummyData/triggerGraph';
import accountInteractionGraph from 'resources/dummyData/accountInteractionGraph';
import messageGraph from 'resources/dummyData/messageGraph';
import SelectorType from './SelectorType';

class DemoCallGraphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedType: 'Trigger Graph',
      direction: 'LR',
    };
  }
  abbreviate(str) {
    const split = str.split('_0x');
    const hex = split.pop();
    const kind = split.pop().split('/').pop();
    return kind + ' ' + hex.substr(0, 4) + '..' + hex.substr(-4, 4);
  }
  getIconType(type) {
    const tempType = type.split('_')[0];
    console.log(tempType);
    if (tempType === 'Tx') {
      return 'TxNode';
    } else if (tempType === 'ContractMsg') {
      return 'ContractMsgNode';
    } else if (tempType === 'Account') {
      return 'ContractAccountNode';
    }
    return '';
  }
  prepareGraphData(data) {
    const preparedData = {};
    const preparedEdges = [];
    const preparedNodes = [];
    data.edges.forEach((item) => {
      item.label = item.types[0].split(':')[1];
      preparedEdges.push(item);
    });
    preparedData.edges = preparedEdges;
    data.nodes.forEach((item) => {
      item.group = this.getIconType(item.id);
      item.label = this.abbreviate(item.id);
      preparedNodes.push(item);
    });
    preparedData.nodes = preparedNodes;
    return preparedData;
  }
  handleChangeGraphType(graphType) {
    this.setState({
      selectedType: graphType,
    });
  }
  handleChangeGraphDirection(newDirection) {
    this.setState({
      direction: newDirection,
    });
  }
  render() {
    const events = {
      doubleClick: (event) => {
        console.log(event.nodes[0]);
      }
    };
    const preparedTriggerGraphData = this.prepareGraphData(triggerGraph);
    const preparedAccountInteractionGraphData = this.prepareGraphData(accountInteractionGraph);
    const preparedMessageGraphData = this.prepareGraphData(messageGraph);
    let dataForGraph = preparedTriggerGraphData;
    let activeTrigger = false;
    let activeAccount = false;
    let activeMessage = false;
    if (this.state.selectedType === 'Trigger Graph') {
      dataForGraph = preparedTriggerGraphData;
      activeTrigger = true;
      activeAccount = false;
      activeMessage = false;
    } else if (this.state.selectedType === 'Account Interaction Graph') {
      dataForGraph = preparedAccountInteractionGraphData;
      activeTrigger = false;
      activeAccount = true;
      activeMessage = false;
    } else if (this.state.selectedType === 'Message Graph') {
      dataForGraph = preparedMessageGraphData;
      activeTrigger = false;
      activeAccount = false;
      activeMessage = true;
    }
    const selectedDirection = this.state.direction;
    let activeDU = false;
    let activeUD = false;
    let activeLR = false;
    let activeRL = false;
    if (selectedDirection === 'DU') {
      activeDU = true;
      activeUD = false;
      activeLR = false;
      activeRL = false;
    } else if (selectedDirection === 'UD') {
      activeDU = false;
      activeUD = true;
      activeLR = false;
      activeRL = false;
    } else if (selectedDirection === 'LR') {
      activeDU = false;
      activeUD = false;
      activeLR = true;
      activeRL = false;
    } else if (selectedDirection === 'RL') {
      activeDU = false;
      activeUD = false;
      activeLR = false;
      activeRL = true;
    }
    const options = {
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: selectedDirection,        // UD, DU, LR, RL
          sortMethod: 'directed'   // hubsize, directed
        }
      },
      groups: {
        TxNode: {
          image: TxIcon,
        },
        ExternalAccountNode: {
          image: ExternalAccountIcon,
        },
        ContractAccountNode: {
          image: ContractAccountIcon,
        },
        ContractMsgNode: {
          image: ContractMsgIcon,
        }
      },
      edges: {
        color: 'white',
        title: 'triggersMsg',
        label: 'triggersMsg',
        font: {
          size: 10,
          face: 'arial',
          align: 'bottom',
        }
      },
      nodes: {
        title: 'test',
        color: 'white',
        shape: 'circularImage',
        font: {
          color: 'white',
          multi: 'md',
          size: 12,
          face: 'arial',
          align: 'bottom'
        }
      }
    };
    const graphHeight = window.innerHeight - 120 + 'px';
    return (
      <div className="full-width" style={{minWidth: '1440px'}}>
        <div style={{ display: 'flex', }}>
          <SelectorType active>Select graph type: </SelectorType>
          <SelectorType onClick={() => this.handleChangeGraphType('Trigger Graph')} active={activeTrigger}>Trigger Graph</SelectorType>
          <SelectorType onClick={() => this.handleChangeGraphType('Account Interaction Graph')} active={activeAccount}>Account Interaction Graph</SelectorType>
          <SelectorType onClick={() => this.handleChangeGraphType('Message Graph')} active={activeMessage}>Message Graph</SelectorType>
        </div>
        <div style={{ display: 'flex', }}>
          <SelectorType active>Change Direction</SelectorType>
          <SelectorType onClick={() => this.handleChangeGraphDirection('UD')} active={activeUD}>U->D</SelectorType>
          <SelectorType onClick={() => this.handleChangeGraphDirection('DU')} active={activeDU}>D->U</SelectorType>
          <SelectorType onClick={() => this.handleChangeGraphDirection('LR')} active={activeLR}>L->R</SelectorType>
          <SelectorType onClick={() => this.handleChangeGraphDirection('RL')} active={activeRL}>R->L</SelectorType>
        </div>
        <Graph graph={dataForGraph} options={options} events={events} style={{height: graphHeight, width: '100%'}}/>
      </div>
    );
  }
}

export default DemoCallGraphs;

