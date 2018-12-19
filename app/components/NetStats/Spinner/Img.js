import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(-360deg);
	}
`;

const Img = styled.img`
  animation: ${rotate360} 2s linear infinite;
  width: 16px;
}
`;

export default Img;
