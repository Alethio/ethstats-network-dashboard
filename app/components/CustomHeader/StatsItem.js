import styled from 'styled-components';

const StatsItem = styled.div`
  display: flex;
  align-items: center;
  padding-left: 24px;
  opacity: ${props => props.fullOpacity ? 1 : 0.6}:
`;

export default StatsItem;
