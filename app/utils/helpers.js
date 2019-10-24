import Web3 from 'web3';
import { BigNumber }  from 'bignumber.js';

import { ScriptLoader } from "@puzzl/browser/lib/network/ScriptLoader";

import moment from 'moment/moment';
import _ from 'lodash';

import { NETSTATS_API_URL } from 'config';

export function trimValue(string, digits = 4) {
  string = string.replace('0x', '');
  return `${string.substr(0, digits)} ... ${string.substr(-digits)}`;
}

export function hexToString(hexCode) {
  const hex = hexCode.toString();
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

export function numberWithCommas(x) {
  if (x) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
}

export function weiToEth(wei, digitsAfterDecimal = 4) {
  return parseFloat(wei / 1000000000000000000).toFixed(digitsAfterDecimal);
}

export function formatNumber(number, format = 4) {
  if (number) {
    const bigNumber = new BigNumber(number);
    return bigNumber.toFormat(format);
  }
  return null;
}


export function weiToSymbol(wei, symbol = 'ether', decimals = 10) {
  if (wei) {
    const value = Web3.utils.fromWei(String(wei), symbol);
    const factor = Math.pow(10, decimals);
    return (Math.ceil(value * factor) / factor).toString();
  }
  return null;
}

export function computeGasPrice(gasUsed, gasPrice) {
  if (gasUsed && gasPrice) {
    const gas = new BigNumber(gasUsed);
    const price = new BigNumber(gasPrice);
    const totalWeiUsed = gas.times(price);
    return weiToSymbol(totalWeiUsed.toString());
  }
  return null;
}


function extractData(context, dataArray) {
  const contextValues = Object.keys(context);

  return dataArray.map((data) => Object.keys(data).reduce(((acc, key) => {
    const [ contextValue, valueKey ] = key.split(':');
    let value = data[key];

    if (value instanceof Array) {
      value = value.map((item) => {
        const [ contextValue, value ] = item.split(':');
        return {
          title: value,
          href: `${context[contextValue]}${value}`,
        };
      });
    } else if (value.includes(':')) {
      // format url if needed
      for (let i = 0; i < contextValues.length; i++) {
        if (value.includes(`${contextValues[i]}:`)) {
          const [, concreteValue] = value.split(':');
          value = {
            title: concreteValue,
            href: `${context[contextValues[i]]}${concreteValue}`,
          };
          break;
        }
      }
    }

    // treat key edge case
    if (contextValue === '@id') {
      return {
        ...acc,
        id: value,
      };
    }

    return {
      ...acc,
      [ contextValue ]: {
        ...acc[contextValue],
        [ valueKey ]: value,
      }
    };
  }), {}));
}

export function parseResponse(response) {
  const { context, data } = response.data;
  const resultData = extractData(context, data);

  if (resultData.length === 1) {
    return {
      context,
      values: resultData[0],
    };
  }

  return {
    context,
    values: resultData,
  };
}

export function convertHashes(hashes, decimals = 2) {
  let result = 0;
  let unit = '';

  if(hashes !== 0 && hashes < 1000) {
    result = parseInt(hashes, 10);
    unit = '';
  }

  if(hashes >= 1000 && hashes < Math.pow(1000, 2)) {
    result = hashes / 1000;
    unit = 'K';
  }

  if(hashes >= Math.pow(1000, 2) && hashes < Math.pow(1000, 3)) {
    result = hashes / Math.pow(1000, 2);
    unit = 'M';
  }

  if(hashes >= Math.pow(1000, 3) && hashes < Math.pow(1000, 4)) {
    result = hashes / Math.pow(1000, 3);
    unit = 'G';
  }

  if(hashes >= Math.pow(1000, 4) && hashes < Math.pow(1000, 5)) {
    result = hashes / Math.pow(1000, 4);
    unit = 'T';
  }
  if(hashes >= Math.pow(1000, 5) && hashes < Math.pow(1000, 6)) {
    result = hashes / Math.pow(1000, 5);
    unit = 'P';
  }

  return result.toFixed(decimals) + ' ' + unit + 'H';
}

export function converter(valueParameter, measureUnit) {
  const value = parseFloat(valueParameter);
  let result = 0;
  let unit = '';

  if(value !== 0 && value < 1000) {
    result = value;
    unit = '';
  }

  if(value >= 1000 && value < Math.pow(1000, 2)) {
    result = value / 1000;
    unit = 'K';
  }

  if(value >= Math.pow(1000, 2) && value < Math.pow(1000, 3)) {
    result = value / Math.pow(1000, 2);
    unit = 'M';
  }

  if(value >= Math.pow(1000, 3) && value < Math.pow(1000, 4)) {
    result = value / Math.pow(1000, 3);
    unit = 'G';
  }

  if(value >= Math.pow(1000, 4) && value < Math.pow(1000, 5)) {
    result = value / Math.pow(1000, 4);
    unit = 'T';
  }
  if(value >= Math.pow(1000, 5) && value < Math.pow(1000, 6)) {
    result = value / Math.pow(1000, 5);
    unit = 'P';
  }

  return result.toFixed(2) + ' ' + unit + measureUnit;
}

export function formatBytes(value, digits = 2) {
  if (value === 0) {
    return '0 Bytes';
  }
  const multiplier = 1024;
  const measureUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const power = Math.floor(Math.log(value) / Math.log(multiplier));
  return parseFloat((value / Math.pow(multiplier, power)).toFixed(digits)) + ' ' + measureUnits[power];
}

export function convertDurations(milliseconds, decimals = 2) {
  let convertedString = '';
  if (milliseconds < 1000) {
    convertedString = milliseconds + 'ms';
  } else if (milliseconds >= 1000 && milliseconds < 60000) {
    convertedString = moment.duration(milliseconds).asSeconds().toFixed(decimals) + 's';
  } else if (milliseconds >= 60000 && milliseconds < 60000 * 60) {
    convertedString = moment.duration(milliseconds).asMinutes().toFixed(decimals) + 'min';
  } else if (milliseconds >= 60000 * 60 && milliseconds < 60000 * 60 * 60) {
    convertedString = moment.duration(milliseconds).asHours().toFixed(decimals) + 'h';
  } else {
    convertedString = moment.duration(milliseconds).asDays().toFixed(decimals) + 'days';
  }
  return convertedString;
}

export function sliceRecords(records, endPoint) {
  return records.slice(0, endPoint);
}

function paddingRight(string, paddingValue, length = 42) {
  return String(string + paddingValue.repeat(length)).slice(0, length);
}

export function sanitizeEthAccount(account) {
  if (account && account.split('_')[1]) {
    let acc = account.split('_')[1];
    if (acc.indexOf('0x') === -1) {
      acc = '0x' + acc;
    }
    return paddingRight(acc, '0');
  }
  return account;
}

export function prepareChartData(data, dataKey) {
  const finalArray = [];
  for (let i = 0; i < data.length; i++) {
    finalArray.push({
      block: (data[i] && data[i]['ethon:number']) ? `${numberWithCommas(data[i]['ethon:number'])}` : 'N/A',
      [dataKey]: (data[i] && data[i][dataKey]) ? parseFloat(data[i][dataKey]) : 0
    });
  }
  return finalArray;
}

export function prepareETHPendingChartData(data, dataKey) {
  const finalArray = [];
  for (let i = data.length - 1; i >= 0; i--) {
    finalArray.push({
      block: ` ${numberWithCommas(data[data.length - i - 1]['ethon:number'])}`,
      [dataKey]: parseFloat(weiToEth(data[data.length - i - 1][dataKey], 2)),
    });
  }
  return finalArray;
}

export function prepareGasPriceChartData(data, dataKey) {
  const finalArray = [];
  for (let i = data.length - 1; i >= 0; i--) {
    finalArray.push({
      block: ` ${numberWithCommas(data[data.length - i - 1]['ethon:number'])}`,
      [dataKey]: parseFloat(parseFloat(data[data.length - i - 1][dataKey] / Math.pow(1000, 3) / parseInt(data[data.length - i - 1]['pendingCount'], 10)).toFixed(2)),
    });
  }
  return finalArray;
}

export function prepareUncleChartData(data, dataKey) {
  const finalArray = [];
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[data.length - i - 1]['ethstats:numberMin']) {
      finalArray.push({
        block: `From: ${numberWithCommas(data[data.length - i - 1]['ethstats:numberMin'])}/To: ${numberWithCommas(data[data.length - i - 1]['ethstats:numberMax'])}`,
        [dataKey]: parseFloat(data[data.length - i - 1]['ethstats:count']),
      });
    } else {
      finalArray.push({
        block: 'From: N/A To: N/A',
        [dataKey]: 0,
      });
    }
  }
  return finalArray;
}

export function preparePropagationChartData(data, dataKey) {
  const finalArray = [];
  for (let i = 0; i < data.length; i++) {
    let intervalString;
    if (i < data.length - 1) {
      intervalString = data[i].x.toFixed(2) + 's - ' + parseFloat(data[i].x - -data[i].dx).toFixed(2) + 's';
    } else {
      intervalString = `>= ${data[i].x}s`;
    }
    finalArray.push({
      [dataKey]: parseFloat(data[i].y) * 100,
      interval: intervalString,
      cumpercent: data[i].cumpercent,
      frequency: data[i].frequency,
      cumulative: data[i].cumulative,
    });
  }
  return finalArray;
}

export function ellipsis(value, nrOfChars) {
  return value.substr(0, nrOfChars) + '...';
}

export function abbreviateGraphEntity(str) {
  const split = str.split('_0x');
  const hex = split.pop();
  const kind = split.pop().split('/').pop();
  return kind + ' ' + hex.substr(0, 4) + '..' + hex.substr(-4, 4);
}

export function getRelativeUrlPath(path) {
  let finalPath = path;
  if (finalPath) {
    finalPath = finalPath.replace(/^(?:\/\/|[^\/]+)*\//, '');
  }
  return '/' + finalPath;
}

function getPageRelativeUrl() {
  return window.location.pathname + window.location.search;
}

export function getContractMessagesPageUrl() {
  const url = '/contract-messages';
  if (getPageRelativeUrl().indexOf(url) === -1) {
    return getPageRelativeUrl() + url;
  }
  return getPageRelativeUrl();
}

export function getTxUrl(tx) {
  return '/Tx_0x' + tx;
}

export function getContractMessageUrl(contractMsg) {
  return `/ContractMsg_${contractMsg}`;
}

export function extractHashFromURLData(urlData) {
  const rg = /(Account|Contract|Block|ReceiptsTrie|TxTrie)_(.*)/gmi;
  const arr = rg.exec(urlData) || [];
  if (arr.length > 0) {
    return arr[2];
  }
  return null;
}

export function filterEventsData(data, limitTimestamp) {
  return _.filter(data, (event) => {
    return (moment(limitTimestamp).format('x') <= moment(event['ethstats:eventTimestamp']).format('x'));
  });
}

export function initHotjar(hjId) {
  // <!-- Hotjar Tracking Code -->
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid: hjId,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
}

export function initGoogleAnalytics(gaId) {
  // <!-- Global site tag (gtag.js) - Google Analytics -->
  new ScriptLoader(document)
      .load(`https://www.googletagmanager.com/gtag/js?id=${gaId}`)
      .catch(e => console.error(e));

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());

  gtag("config", gaId);
}

export function netstatsApiUrl() {
 const currentHost = location.protocol + '//' + 
                     location.hostname + 
                     (location.port ? ':' + location.port: '');

 return NETSTATS_API_URL !== "self" ?  NETSTATS_API_URL : currentHost;
}

