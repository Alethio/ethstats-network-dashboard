import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  order: ${props => props.order};
  display: flex;
  flex-direction: row;
  opacity: 0.6;
  padding-right: 52px;
  padding-left: 56px;
  position: relative;
  min-height: 57px;
  transition: opacity linear 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;
/**
 * if min-height is modified also change the NODE_ITEM_HEIGHT in NodesList/SortableNodesList.js accordingly
 */

export default Container;
