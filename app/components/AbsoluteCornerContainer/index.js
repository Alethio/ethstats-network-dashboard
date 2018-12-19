import styled from 'styled-components';

const AbsoluteCornerContainer = styled.div`
  position: absolute;
  ${props => (props.top ? 'top: 14px;' : (props.bottom ? 'bottom: 10px;' : null))}
  ${props => (props.left ? 'left: 10px;' : (props.right ? 'right: 24px;' : null))}
  width: ${props => props.width};
  height: 24px;
`;

export default AbsoluteCornerContainer;
