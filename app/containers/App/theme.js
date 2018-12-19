import { transparentize } from 'polished';

const theme = {
  colors: {
    header_bg_color: '#182231',
    base_color: '#324156',
    white: '#FFFFFF',
    grey_v1: '#6B6B76',
    grey_v2: transparentize(0.3, '#4F5054'),
    grey_v3: transparentize(0.3, '#1A222F'),
    transparent_blue: transparentize(0.2, '#2774FE'),
    red: '#F16B69',
    green: '#4AC563',
    blue: '#378CFF',
    yellow: '#F0C95C',
    teal: '#46E9D3',
    black: '#101229',
    line_color: '#324156',
    stat_bg: '#182231',
    filter_bg: '#0F1927',
    blocklist_bg: '#141E2C',
    border_semi: transparentize(0.5, '#324156'),
    active_card_bg: '#182231',
    violet: '#668DED',
    block_chart_color: '#8399B8',
    blue_v1: '#2774FE',
    contract_msg_keyword: '#1F6FFF',
    contract_msg_comment: '#46E9D3',
    contract_msg_content: '#0D1928',
    red_event: '#EF6C6C',
    error_bg: '#DC5F5F',
    green_event: '#48E2A2',
    lime_event: '#B8E986',
    orange_event: '#EFC865',
    teal_event: '#50E9D2',
    blue_event: '#2774FE',
    purple_event: '#DB56F5',
    bright_gray: '#41526A',
    min_max_gray: '#586982',
  },
  fonts: {
    mainFont: 'Helvetica, Arial, sans-serif',
    secondaryFont: 'Helvetica, Arial, sans-serif',
    sizes: {
      header: '12px',
      block_card: '16px',
      block_card_extra_data: '12px'
    }
  },
};

export default theme;
