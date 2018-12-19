import React from 'react';
import styled from 'styled-components';

const CloseIcon = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    /* Oval 3: */
    border: 2px solid #324156;
    border-radius: 50%;
    position: absolute;
    top: 17px;
    right: 16px;
    :after {
        content: '';
        height: 12px;
        border-left: 2px solid #324156;
        position: absolute;
        transform: rotate(50deg);
        left: 7px;
        top: 2px;
    }
    :before {
        content: '';
        height: 12px;
        border-left: 2px solid #324156;
        position: absolute;
        transform: rotate(-50deg);
        left: 7px;
        top: 2px;
    }
`;

export default CloseIcon;
