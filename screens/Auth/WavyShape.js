// WavyShape.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const WavyShape = ({ top = true }) => (
  <Svg width={width} height={100} viewBox={`0 0 ${width} 100`} fill="none">
    <Path
      d={top
        ? `M0 60 Q${width / 4} 100 ${width / 2} 60 T${width} 60 V100 H0 V60Z`
        : `M0 80 Q${width / 4} 100 ${width / 2} 80 T${width} 80 V0 H0 V80Z`}
      fill="#E6E6FA" // Lavender color
    />
  </Svg>
);

export default WavyShape;
