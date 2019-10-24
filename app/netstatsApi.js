import axios from 'axios';
import { netstatsApiUrl } from 'utils/helpers';

const  axiosApiInstance = axios.create({
  baseURL: netstatsApiUrl(),
});

export function getInitialNodeHistory(nodeName) {
  return new Promise((resolve, reject) => {
    const url = `nodes/${nodeName}/events?limit=100`;
    axiosApiInstance.get(url)
      .then((response) => {
        resolve(response.data.body.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export function getNodeHistory(nodeName, to, eventTypes) {
  return new Promise((resolve, reject) => {
    let typesString = '';
    eventTypes.forEach(item => {
      typesString = typesString + '&eventTypes[]=' + item;
    });
    const url = `nodes/${nodeName}/events?timestampEnd=${to}${typesString}&limit=100`;
    axiosApiInstance.get(url)
      .then((response) => {
        resolve(response.data.body.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getCustomTimeframeNodeHistory(nodeName, from, to, eventTypes) {
  return new Promise((resolve, reject) => {
    let typesString = '';
    eventTypes.forEach(item => {
      typesString = typesString + '&eventTypes[]=' + item;
    });
    const url = `nodes/${nodeName}/events?timestampStart=${from}&timestampEnd=${to}${typesString}&limit=100`;
    axiosApiInstance.get(url)
      .then((response) => {
        resolve(response.data.body.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getEventsCount(nodeName, from, to) {
  return new Promise((resolve, reject) => {
    let typesString = '';
    const eventTypes = ['auth', 'block', 'connection', 'stats', 'sync', 'usage'];
    eventTypes.forEach(item => {
      typesString = typesString + '&eventTypes[]=' + item;
    });
    const url = `nodes/${nodeName}/events?timestampStart=${from}&timestampEnd=${to}${typesString}&countOnly=1`;
    axiosApiInstance.get(url)
      .then((response) => {
        resolve(response.data.body.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getChartsForBlock(blockNr) {
  return new Promise((resolve, reject) => {
    const url = `blocks/${blockNr}/statistics`;
    axiosApiInstance.get(url)
      .then((response) => {
        resolve(response.data.body.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getNodesForBlock(blockNr) {
  return new Promise((resolve, reject) => {
    const url = `blocks/${blockNr}/nodes`;
    axiosApiInstance.get(url)
      .then((response) => {
        resolve(response.data.body.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
