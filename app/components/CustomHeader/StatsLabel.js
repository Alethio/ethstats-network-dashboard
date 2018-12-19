import styled from 'styled-components';

const StatsLabel = styled.div`
  //opacity: 0.6;
  color: ${props => props.color === 'white' ? props.theme.colors.white : props.theme.colors.bright_gray};
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  padding-right: 6px;
`;

export default StatsLabel;
