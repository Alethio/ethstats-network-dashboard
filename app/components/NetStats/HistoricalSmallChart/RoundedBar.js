import React from 'react';

const RoundedBar = (props) => {
  const {fill, x, y, height} = props;

  return (
    <g>
      <rect id="Rectangle-3" x={x} y={y} width="4" height={height} fill={fill} rx="1"/>
      <rect id="Rectangle-3" x={x - 1} y="0" width="6" height="80" fill={fill} fillOpacity="0" rx="1"/>
    </g>
  );
};

export default RoundedBar;
