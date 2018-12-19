import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  color: ${props => props.theme.colors.white};
  border: none;
  background: none;
  padding: 7px 0 6px 10px;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.8px;
  font-weight: 600;
  text-align: center;
  width: 133px;
  
  
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: auto; /* Safari */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  
  &:focus,
  &:active {
    outline: none;
  }
  
  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: ${props => props.theme.colors.white};
    opacity: 0.4;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: ${props => props.theme.colors.white};
    opacity: 0.4;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: ${props => props.theme.colors.white};
    opacity: 0.4;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: ${props => props.theme.colors.white};
    opacity: 0.4;
  }
`;

export default SearchInput;
