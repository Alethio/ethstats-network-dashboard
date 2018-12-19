import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { getNodeHistory as getNodeHistoryAction } from 'actions/nodeHistory';
import { clearNodeData as clearNodeDataAction } from 'actions/nodeHistory';
import { getInitialNodeHistory as getInitialNodeHistoryAction } from 'actions/nodeHistory';
import { getCustomTimeframeNodeHistory as getCustomTimeframeNodeHistoryAction } from 'actions/nodeHistory';
import { getNodeHistoryWithFilter as getNodeHistoryWithFilterAction } from 'actions/nodeHistory';
import { getEventsCount as getEventsCountAction } from 'actions/nodeHistory';
import { hideNodeHistoryModal as hideNodeHistoryModalAction } from 'actions/global';
import { Scrollbars } from 'react-custom-scrollbars';
import { numberWithCommas, trimValue, convertDurations, formatBytes } from 'utils/helpers';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import Container from './Container';
import Content from './Content';
import EventRow from './EventRow';
import EventType from './EventType';
import FlexRow from './FlexRow';
import Header from 'components/NetStats/NodeModal/Header';
import FilterContainer from './FilterContainer/FilterContainer';
import FilterTitle from './FilterContainer/FilterTitle';
import FilterTypeContainer from './FilterContainer/FilterTypeContainer';
import FilterBullet from './FilterContainer/FilterBullet';
import InnerBullet from './FilterContainer/InnerBullet';
import EventsList from './EventsList';
import EventPropertyTitle from './EventPropertyTitle';
import EventPropertyValue from './EventPropertyValue';
import DatepickerRow from './DatepickerRow';
import DatepickerLabel from './DatepickerLabel';
import EmptySpace from './EmptySpace';
import ApplyBtn from './ApplyBtn';
import TimeIntervalWarning from './TimeIntervalWarning';

import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import 'styles/utils/_datepicker.css';

class NodeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollHeight: 0.8 * window.innerHeight - 60 + 'px',
      interval: 'lastHour',
      customTimeframe: true,
      startDate: moment().subtract(1, 'd'),
      endDate: moment(),
      showWrongTimeframeAlert: false,
      diffEndStart: moment().diff(moment().subtract(1, 'd')),
      eventTypes: ['auth', 'block', 'connection', 'stats', 'sync', 'usage'],
    };
    this.oldEventsCount = 0;
    this.newEventsCount = 0;
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    if (this.props.nodeName && this.props.nodeData.length === 0) {
      this.props.getInitialNodeHistory(this.props.nodeName);
      this.props.getEventsCount(this.props.nodeName, this.state.startDate, this.state.endDate);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    this.setState({ scrollHeight: 0.8 * window.innerHeight - 50 + 'px' });
  };
  handleClickOutside = evt => {
    this.props.hideNodeHistoryModal();
  };
  handleStartChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleEndChange = (date) => {
    this.setState({
      endDate: date,
    });
  };
  handleSwitchEventType(eventType) {
    // test if it's deselected
    const tempArray = [ ...this.state.eventTypes ];
    const indexOfEvent = this.state.eventTypes.indexOf(eventType);
    if(indexOfEvent === -1) {
      tempArray.push(eventType);
      this.setState({
        eventTypes: tempArray,
      }, () => {
        this.filtersChanged();
      });
    } else {
      // check if it's not the only active type
      if (this.state.eventTypes.length !== 1) {
        tempArray.splice(indexOfEvent, 1);
        this.setState({
          eventTypes: tempArray,
        }, () => {
          this.filtersChanged();
        });
      }
    }
  }
  filterEvents(data) {
    const events = [];
    events.push(<EmptySpace key="emptySpace"/>);
    data.forEach((item, index) => {
      let typeColor, eventType;
      if (item['ethstats:eventType'] === 'block') {
        typeColor = 'blue';
        eventType = 'Block';
        const eventData = item['ethstats:eventData'];
        const propTime = eventData['ethstats:propagationTime'];
        const propTimeFormated = convertDurations(propTime);
        events.push(
          <EventRow key={index}>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
            <EventType className={typeColor}>{eventType}</EventType>
            <FlexRow className="wrap">
              <EventPropertyTitle>Block number</EventPropertyTitle>
              <EventPropertyValue>{numberWithCommas(eventData['ethon:number'])}</EventPropertyValue>
              <EventPropertyTitle>Block hash</EventPropertyTitle>
              <EventPropertyValue>{trimValue(eventData['ethon:blockHash'])}</EventPropertyValue>
              <EventPropertyTitle>Propagation time</EventPropertyTitle>
              <EventPropertyValue>{propTimeFormated}</EventPropertyValue>
            </FlexRow>
          </EventRow>
        );
      } else if (item['ethstats:eventType'] === 'auth') {
        typeColor = 'purple';
        eventType = 'Auth';
        const eventData = item['ethstats:eventData'];
        events.push(
          <EventRow key={index}>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
            <EventType className={typeColor}>{eventType}</EventType>
            <FlexRow className="wrap">
              { eventData['ethstats:node'] && <EventPropertyTitle>Node</EventPropertyTitle>}
              { eventData['ethstats:node'] && <EventPropertyValue>{eventData['ethstats:node'].split('/')[0] + ' - ' + eventData['ethstats:node'].split('/')[2].split('-')[0]}</EventPropertyValue>}
              <EventPropertyTitle>Login timestamp</EventPropertyTitle>
              <EventPropertyValue>{moment(eventData['ethstats:loginTimestamp']).format('YYYY-MM-DD HH:mm:ss')}</EventPropertyValue>
              { eventData['ethstats:logoutTimestamp'] && <EventPropertyTitle>Logout timestamp</EventPropertyTitle>}
              { eventData['ethstats:logoutTimestamp'] && <EventPropertyValue>{moment(eventData['ethstats:logoutTimestamp']).format('YYYY-MM-DD HH:mm:ss')}</EventPropertyValue>}
              <EventPropertyTitle>Client</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:client']}</EventPropertyValue>
              <EventPropertyTitle>Api</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:api']}</EventPropertyValue>
              { eventData['ethstats:coinbase'] && <EventPropertyTitle>Coinbase/Acc</EventPropertyTitle>}
              { eventData['ethstats:coinbase'] && <EventPropertyValue>{trimValue(eventData['ethstats:coinbase'])}</EventPropertyValue>}
              { eventData['ethstats:onlineTime'] && <EventPropertyTitle>Online time</EventPropertyTitle>}
              { eventData['ethstats:onlineTime'] && <EventPropertyValue>{convertDurations(eventData['ethstats:onlineTime'])}</EventPropertyValue>}
              <EventPropertyTitle>OS</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:os']}</EventPropertyValue>
              <EventPropertyTitle>OS version</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:osVersion']}</EventPropertyValue>
              <EventPropertyTitle>Protocol</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:protocol']}</EventPropertyValue>
            </FlexRow>
          </EventRow>
        );
      } else if (item['ethstats:eventType'] === 'connection') {
        typeColor = 'lime';
        eventType = 'Conn';
        const eventData = item['ethstats:eventData'];
        events.push(
          <EventRow key={index}>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
            <EventType className={typeColor}>{eventType}</EventType>
            { eventData['ethstats:isConnected'] ?
              <FlexRow className="wrap">
                <EventPropertyTitle>State</EventPropertyTitle>
                <EventPropertyValue>Connected</EventPropertyValue>
              </FlexRow> :
              <FlexRow className="wrap">
                <EventPropertyTitle>State</EventPropertyTitle>
                <EventPropertyValue>Disconnected</EventPropertyValue>
              </FlexRow>
            }
          </EventRow>
        );
      } else if (item['ethstats:eventType'] === 'stats') {
        typeColor = 'teal';
        eventType = 'Stats';
        const eventData = item['ethstats:eventData'];
        events.push(
          <EventRow key={index}>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
            <EventType className={typeColor}>{eventType}</EventType>
            <FlexRow className="wrap">
              <EventPropertyTitle>Peers</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:numberOfPeers']}</EventPropertyValue>
              { eventData['ethstats:isMining'] ?
                <FlexRow>
                  <EventPropertyTitle>Is mining</EventPropertyTitle>
                  <EventPropertyValue>Yes</EventPropertyValue>
                </FlexRow> :
                <FlexRow>
                  <EventPropertyTitle>Is mining</EventPropertyTitle>
                  <EventPropertyValue>No</EventPropertyValue>
                </FlexRow>
              }
              <EventPropertyTitle>Latency</EventPropertyTitle>
              <EventPropertyValue>{convertDurations(eventData['ethstats:wsLatency'])}</EventPropertyValue>
            </FlexRow>
          </EventRow>
        );
      } else if (item['ethstats:eventType'] === 'sync') {
        typeColor = 'orange';
        eventType = 'Sync';
        const eventData = item['ethstats:eventData'];
        if (eventData['ethstats:syncOperation'] === 'finish') {
          events.push(
            <EventRow key={index}>
              <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
              <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
              <EventType className={typeColor}>{eventType}</EventType>
              <FlexRow className="wrap">
                <EventPropertyTitle>Progress</EventPropertyTitle>
                <EventPropertyValue>Finished</EventPropertyValue>
              </FlexRow>
            </EventRow>
          );
        } else if (eventData['ethstats:syncOperation'] === 'start') {
          events.push(
            <EventRow key={index}>
              <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
              <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
              <EventType className={typeColor}>{eventType}</EventType>
              <FlexRow className="wrap">
                <EventPropertyTitle>Progress</EventPropertyTitle>
                <EventPropertyValue>Started</EventPropertyValue>
              </FlexRow>
            </EventRow>
          );
        } else {
          events.push(
            <EventRow key={index}>
              <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
              <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
              <EventType className={typeColor}>{eventType}</EventType>
              <FlexRow className="wrap">
                <EventPropertyTitle>Starting block</EventPropertyTitle>
                <EventPropertyValue>{eventData['ethstats:startingBlock']}</EventPropertyValue>
                <EventPropertyTitle>Current block</EventPropertyTitle>
                <EventPropertyValue>{eventData['ethstats:currentBlock']}</EventPropertyValue>
                <EventPropertyTitle>Highest block</EventPropertyTitle>
                <EventPropertyValue>{eventData['ethstats:highestBlock']}</EventPropertyValue>
              </FlexRow>
            </EventRow>
          );
        }
      } else if (item['ethstats:eventType'] === 'usage') {
        typeColor = 'green';
        eventType = 'Usage';
        const eventData = item['ethstats:eventData'];
        events.push(
          <EventRow key={index}>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format('YYYY-MM-DD')}</EventPropertyTitle>
            <EventPropertyTitle>{moment(item['ethstats:eventTimestamp']).format(' HH:mm:ss')}</EventPropertyTitle>
            <EventType className={typeColor}>{eventType}</EventType>
            <FlexRow className="wrap">
              <EventPropertyTitle>Client CPU load</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:clientCpuLoad'].toFixed(2)}%</EventPropertyValue>
              <EventPropertyTitle>Client memory load</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:clientMemLoad'].toFixed(2)}%</EventPropertyValue>
              <EventPropertyTitle>Host CPU load</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:hostCpuLoad'].toFixed(2)}%</EventPropertyValue>
              <EventPropertyTitle>Host disk read</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:hostDiskRIOSec'].toFixed(2)} ops/s</EventPropertyValue>
              <EventPropertyTitle>Host disk write</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:hostDiskWIOSec'].toFixed(2)} ops/s</EventPropertyValue>
              <EventPropertyTitle>Host file system read</EventPropertyTitle>
              <EventPropertyValue>{formatBytes(eventData['ethstats:hostFsRxSec'], 2)}/s</EventPropertyValue>
              <EventPropertyTitle>Host file system write</EventPropertyTitle>
              <EventPropertyValue>{formatBytes(eventData['ethstats:hostFsWxSec'], 2)}/s</EventPropertyValue>
              <EventPropertyTitle>Host total memory</EventPropertyTitle>
              <EventPropertyValue>{formatBytes(eventData['ethstats:hostMemTotal'], 2)}</EventPropertyValue>
              <EventPropertyTitle>Host used memory</EventPropertyTitle>
              <EventPropertyValue>{formatBytes(eventData['ethstats:hostMemUsed'], 2)}</EventPropertyValue>
              <EventPropertyTitle>Host network received</EventPropertyTitle>
              <EventPropertyValue>{formatBytes(eventData['ethstats:hostNetRxSec'], 2)}/s</EventPropertyValue>
              <EventPropertyTitle>Host network transferred</EventPropertyTitle>
              <EventPropertyValue>{formatBytes(eventData['ethstats:hostNetTxSec'], 2)}/s</EventPropertyValue>
              <EventPropertyTitle>Node CPU load</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:nodeCpuLoad'].toFixed(2)}%</EventPropertyValue>
              <EventPropertyTitle>Node memory load</EventPropertyTitle>
              <EventPropertyValue>{eventData['ethstats:nodeMemLoad'].toFixed(2)}%</EventPropertyValue>
            </FlexRow>
          </EventRow>
        );
      }
    });
    return events;
  }
  filtersChanged() {
    const eventTypes = this.state.eventTypes;
    this.props.clearNodeData();
    this.oldEventsCount = 0;
    this.newEventsCount = 0;
    this.props.getNodeHistoryWithFilter(this.props.nodeName, this.state.endDate, eventTypes, this.state.startDate);
    this.props.getEventsCount(this.props.nodeName, this.state.startDate, this.state.endDate);
  }
  loadMoreInfo() {
    if (this.props.nodeName && this.props.nodeData.length !== 0) {
      const eventTypes = this.state.eventTypes;
      const to = moment(this.props.nodeData[this.props.nodeData.length - 1]['ethstats:eventTimestamp']).format('x') - 1;
      if (this.state.customTimeframe) {
        this.props.getNodeHistoryWithFilter(this.props.nodeName, to, eventTypes, this.state.startDate);
      } else {
        this.props.getNodeHistory(this.props.nodeName, to, eventTypes);
      }
    }
  }
  loadCustomTimeframeEvents() {
    if (moment(this.state.startDate).isSameOrBefore(this.state.endDate)) {
      const eventTypes = this.state.eventTypes;
      this.setState({
        customTimeframe: true,
        diffEndStart: this.state.endDate.diff(this.state.startDate),
      }, () => {
        this.props.clearNodeData();
        this.oldEventsCount = 0;
        this.newEventsCount = 0;
        this.props.getCustomTimeframeNodeHistory(this.props.nodeName, moment(this.state.startDate).format('x'), moment(this.state.endDate).format('x'), eventTypes);
        this.props.getEventsCount(this.props.nodeName, this.state.startDate, this.state.endDate);
      });
    } else {
      this.setState({
        showWrongTimeframeAlert: true,
      }, () => {
        setTimeout(() => { this.setState({showWrongTimeframeAlert: false}); }, 5000);
      });
    }
  }
  extendTimeframeAndLoadMore() {
    let oldStartDate = this.state.startDate;
    const newStartDate = oldStartDate.subtract(this.state.diffEndStart);
    const from = moment(this.props.nodeData[this.props.nodeData.length - 1]['ethstats:eventTimestamp']).format('x') - 1;
    const eventTypes = this.state.eventTypes;
    this.setState({
      startDate: newStartDate,
    }, () => {
      this.props.getNodeHistoryWithFilter(this.props.nodeName, from, eventTypes, this.state.startDate);
      this.props.getEventsCount(this.props.nodeName, this.state.startDate, this.state.endDate);
    });
  }
  handleStartChangeRaw(data) {
    const filteredData = this.filterData(data);
    if(moment(filteredData).isValid()) {
      this.setState({
        startDate: moment(filteredData),
      });
    }
  }
  handleEndChangeRaw(data) {
    const filteredData = this.filterData(data);
    if(moment(filteredData).isValid()) {
      this.setState({
        endDate: moment(filteredData),
      });
    }
  }
  filterData(data) {
    return data.replace(/[^0-9.\-:\s]/g, '' );
  }
  render() {
    const { nodeData, eventCount } = this.props;
    let events = [];
    events.push(<EmptySpace key="emptySpace"/>);
    let authCount = 0;
    let connCount = 0;
    let syncCount = 0;
    let statsCount = 0;
    let blockCount = 0;
    let usageCount = 0;
    const inactiveAuth = this.state.eventTypes.indexOf('auth') === -1;
    const inactiveBlock = this.state.eventTypes.indexOf('block') === -1;
    const inactiveConn = this.state.eventTypes.indexOf('connection') === -1;
    const inactiveStats = this.state.eventTypes.indexOf('stats') === -1;
    const inactiveSync = this.state.eventTypes.indexOf('sync') === -1;
    const inactiveUsage = this.state.eventTypes.indexOf('usage') === -1;
    if (nodeData) {
      events = this.filterEvents(nodeData);
    }
    if (eventCount) {
      eventCount.forEach( item => {
        if (item['ethstats:eventType'] === 'auth') {
          authCount = item['ethstats:count'];
        } else if (item['ethstats:eventType'] === 'block') {
          blockCount = item['ethstats:count'];
        } else if (item['ethstats:eventType'] === 'connection') {
          connCount = item['ethstats:count'];
        } else if (item['ethstats:eventType'] === 'stats') {
          statsCount = item['ethstats:count'];
        } else if (item['ethstats:eventType'] === 'sync') {
          syncCount = item['ethstats:count'];
        } else if (item['ethstats:eventType'] === 'usage') {
          usageCount = item['ethstats:count'];
        }
      });
    }
    let needMore = true;
    this.oldEventsCount = this.newEventsCount;
    if (nodeData) {
      this.newEventsCount = nodeData.length;
    } else {
      this.newEventsCount = 0;
    }
    if (this.newEventsCount - this.oldEventsCount !== 100) {
      needMore = false;
    }
    return (
      <Container>
        <Header nodeName={this.props.nodeName}/>
        { nodeData ?
          <FlexRow>
            <Content>
              <FilterContainer>
                <FilterTitle>Type</FilterTitle>
                <FilterTypeContainer className={inactiveAuth ? 'inactive' : 'active purple'} onClick={() => {this.handleSwitchEventType('auth');}}>
                  <FilterBullet className={inactiveAuth ? '' : 'active purple'}>
                    <InnerBullet className={inactiveAuth ? '' : 'active purple'}/>
                  </FilterBullet>
                  <div>Auth</div>
                  <div>{authCount}</div>
                </FilterTypeContainer>
                <FilterTypeContainer className={inactiveBlock ? 'inactive' : 'active blue'} onClick={() => {this.handleSwitchEventType('block');}}>
                  <FilterBullet className={inactiveBlock ? '' : 'active blue'}>
                    <InnerBullet className={inactiveBlock ? '' : 'active blue'}/>
                  </FilterBullet>
                  <div>Block</div>
                  <div>{blockCount}</div>
                </FilterTypeContainer>
                <FilterTypeContainer className={inactiveConn ? 'inactive' : 'active lime'} onClick={() => {this.handleSwitchEventType('connection');}}>
                  <FilterBullet className={inactiveConn ? '' : 'active lime'}>
                    <InnerBullet className={inactiveConn ? '' : 'active lime'}/>
                  </FilterBullet>
                  <div>Connection</div>
                  <div>{connCount}</div>
                </FilterTypeContainer>
                <FilterTypeContainer className={inactiveStats ? 'inactive' : 'active teal'} onClick={() => {this.handleSwitchEventType('stats');}}>
                  <FilterBullet className={inactiveStats ? '' : 'active teal'}>
                    <InnerBullet className={inactiveStats ? '' : 'active teal'}/>
                  </FilterBullet>
                  <div>Stats</div>
                  <div>{statsCount}</div>
                </FilterTypeContainer>
                <FilterTypeContainer className={inactiveSync ? 'inactive' : 'active orange'} onClick={() => {this.handleSwitchEventType('sync');}}>
                  <FilterBullet className={inactiveSync ? '' : 'active orange'}>
                    <InnerBullet className={inactiveSync ? '' : 'active orange'}/>
                  </FilterBullet>
                  <div>Sync</div>
                  <div>{syncCount}</div>
                </FilterTypeContainer>
                <FilterTypeContainer className={inactiveUsage ? 'inactive' : 'active green'} onClick={() => {this.handleSwitchEventType('usage');}}>
                  <FilterBullet className={inactiveUsage ? '' : 'active green'}>
                    <InnerBullet className={inactiveUsage ? '' : 'active green'}/>
                  </FilterBullet>
                  <div>Usage</div>
                  <div>{usageCount}</div>
                </FilterTypeContainer>
              </FilterContainer>
              <FilterContainer>
                <FilterTitle>Timeframe</FilterTitle>
                <DatepickerRow>
                  <DatepickerLabel>Start</DatepickerLabel>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartChange}
                    showTimeSelect
                    maxDate={moment()}
                    utcOffset={0}
                    dateFormat="YYYY-MM-DD HH:mm"
                    showYearDropdown
                    onChangeRaw={(event) =>
                      this.handleStartChangeRaw(event.target.value)}
                  />
                </DatepickerRow>
                <DatepickerRow>
                  <DatepickerLabel>End</DatepickerLabel>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndChange}
                    showTimeSelect
                    minDate={this.state.startDate}
                    maxDate={moment()}
                    utcOffset={0}
                    dateFormat="YYYY-MM-DD HH:mm"
                    showYearDropdown
                    onChangeRaw={(event) =>
                      this.handleEndChangeRaw(event.target.value)}
                  />
                </DatepickerRow>
                <ApplyBtn onClick={() => {this.loadCustomTimeframeEvents();}}>Apply</ApplyBtn>
              </FilterContainer>
              { this.state.showWrongTimeframeAlert &&
              <FilterContainer>
                <FilterTitle>Error</FilterTitle>
                <TimeIntervalWarning>Start time needs to be before end time.</TimeIntervalWarning>
              </FilterContainer>}
            </Content>
            <EventsList style={{width: '100%', maxHeight: this.state.scrollHeight + 5}}>
              <Scrollbars style={{width: '100%', height: this.state.scrollHeight}} autoHide autoHideTimeout={1000} autoHideDuration={100}>
                { nodeData.length > 0 ? <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMoreInfo.bind(this)}
                  hasMore={needMore}
                  loader={<EventPropertyTitle key="a" className="infinite-loader">Loading more events...</EventPropertyTitle>}
                  useWindow={false}
                  threshold={150}
                >
                  {events}
                  {!needMore && <div>
                    <EventPropertyTitle className="infinite-loader pointer">Finished loading all events.</EventPropertyTitle>
                    <ApplyBtn small onClick={() => {this.extendTimeframeAndLoadMore();}}>Extend timeframe and load more.</ApplyBtn>
                  </div>}
                </InfiniteScroll> : <div><EmptySpace/><EventPropertyTitle className="infinite-loader">No events found. Please choose another timeframe.</EventPropertyTitle></div> }
              </Scrollbars>
            </EventsList>
          </FlexRow> :
          <EventPropertyTitle>
            <div>Loading Node History</div>
          </EventPropertyTitle>}
      </Container>
    );
  }
}

NodeModal.propTypes = {
  nodeData: PropTypes.array,
  eventCount: PropTypes.array,
  nodeName: PropTypes.string,
  getInitialNodeHistory: PropTypes.func,
  getCustomTimeframeNodeHistory: PropTypes.func,
  getNodeHistoryWithFilter: PropTypes.func,
  getNodeHistory: PropTypes.func,
  getEventsCount: PropTypes.func,
  clearNodeData: PropTypes.func,
  hideNodeHistoryModal: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    nodeData: state.nodeHistory.data,
    nodeName: state.nodeHistory.nodeName,
    eventCount: state.nodeHistory.countData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInitialNodeHistory: (nodeName) => dispatch(getInitialNodeHistoryAction(nodeName)),
    getNodeHistory: (nodeName, to, eventTypes) => dispatch(getNodeHistoryAction(nodeName, to, eventTypes)),
    getNodeHistoryWithFilter: (nodeName, to, eventTypes, limitTimestamp) => dispatch(getNodeHistoryWithFilterAction(nodeName, to, eventTypes, limitTimestamp)),
    getCustomTimeframeNodeHistory: (nodeName, from, to, eventTypes) => dispatch(getCustomTimeframeNodeHistoryAction(nodeName, from, to, eventTypes)),
    getEventsCount: (nodeName, from, to) => dispatch(getEventsCountAction(nodeName, from, to)),
    clearNodeData: () => dispatch(clearNodeDataAction()),
    hideNodeHistoryModal: () => dispatch(hideNodeHistoryModalAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(onClickOutside(NodeModal));
