import React from 'react';
import { Image } from 'react-native';
import { windowWidth } from '../../lib/util/dimensionUtil';
const Background = () => {
  return (
    <Image
      source={require('./../../../assets/images/background.png')}
      style={{
        aspectRatio: 778 / 380,
        width: windowWidth,
        height: windowWidth * (380 / 778),
        justifyContent: 'flex-end',
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
      }}
    />
  );
};

export default Background;
