import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const Spinner = styled.img`
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  animation: ${rotate360} 2s linear infinite;
}
`;

export default Spinner;
