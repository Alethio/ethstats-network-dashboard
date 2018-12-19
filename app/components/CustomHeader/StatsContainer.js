import styled from 'styled-components';

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.bright_gray};
`;

export default StatsContainer;
