import React from 'react';
import styled from 'styled-components';

const Plus = styled.div`
    cursor: pointer;
    width: 10px;
    height: 10px;
    /* Oval 3: */
    position: relative;
    margin-left: 5px;
    :after {
        content: '';
        height: 10px;
        border-left: 2px solid white;
        position: absolute;
        left: 7px;
        top: 3px;
    }
    :before {
        content: '';
        height: 10px;
        border-left: 2px solid white;
        position: absolute;
        transform: rotate(90deg);
        left: 7px;
        top: 3px;
    }

`;

export default Plus;
