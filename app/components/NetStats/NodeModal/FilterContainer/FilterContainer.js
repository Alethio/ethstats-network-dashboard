import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  margin-bottom: 13px;
  background-color: ${props => props.theme.colors.filter_bg};
  width: 220px;
  border-radius: 8px;
  padding-bottom: 7px;
`;

export default FilterContainer;
