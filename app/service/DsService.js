import deepstream from 'deepstream.io-client-js';
import {DS_URL, DS_NAMESPACE, DS_USER, DS_PASS} from 'config';

class DsService {
  constructor() {
    this.success = false;
    const options = {
      // Reconnect after 10, 20 and 30 seconds
      reconnectIntervalIncrement: 10000,
      // Try reconnecting every thirty seconds
      maxReconnectInterval: 30000,
      // We never want to stop trying to reconnect
      maxReconnectAttempts: Infinity,
      // Send heartbeats only once a minute
      heartbeatInterval: 60000
    };

    this.DS = deepstream(this._dsUrl(), options).login({username: DS_USER, password: DS_PASS }, (success) => {
      if (success) {
        this.success = true;
      } else {
        console.error(new Error('There is no valid DeepStream instance'));
      }
    });
  }
  _dsUrl() {
    const currentHost = location.protocol.replace('http', 'ws') + '//' + 
                        location.hostname + 
                        (location.port ? ':' + location.port: '');

    return (DS_URL == "self" ? currentHost : DS_URL);
  }

  get() {
    return this.DS;
  }
  getList(listName) {
    return new Promise((resolve) => {
      this.DS.record.getList(DS_NAMESPACE + listName).whenReady((list) => {
        resolve(list.getEntries());
      });
    });
  }
  getRawList(listName) {
    return new Promise((resolve) => {
      this.DS.record.getList(DS_NAMESPACE + listName).whenReady((list) => {
        resolve(list);
      });
    });
  }
  getRawRecord(recordName) {
    return new Promise((resolve) => {
      this.DS.record.getRecord(recordName).whenReady((record) => {
        resolve(record);
      });
    });
  }
  getRecord(recordName) {
    return new Promise((resolve) => {
      this.DS.record.getRecord(recordName).whenReady((record) => {
        if (record.get('hash') || record.get('hashes') || record.get('data')) {
          resolve(record.get());
        } else {
          resolve(null);
        }
      });
    });
  }
}

export default DsService;
