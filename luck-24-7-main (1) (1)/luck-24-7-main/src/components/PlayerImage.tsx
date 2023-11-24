import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, Image, View } from 'react-native';

const PlayerImage = ({ imageName }: { imageName: string }) => {
  const [playerImage, setPlayerImage] = useState<string | 'loading'>('loading');
  const [token, setToken] = useState<string | null>(null);

  const getImage = async () => {
    let imageRef = firebase.storage().ref(`/players/${imageName}.png`);
    imageRef
      .getDownloadURL()
      .then(url => {
        setPlayerImage(url);
      })
      .catch(e => {
        console.log('getting downloadURL of image error => ', e);
        setPlayerImage('loading');
      });
  };

  const getToken = async () => {
    await AsyncStorage.getItem('token').then(token => {
      setToken(token);
    });
  };

  useEffect(() => {
    getImage();
    getToken();
  }, []);

  if (playerImage === 'loading') {
    return (
      <View className="bg-red-500 rounded-full border-2 border-red-500 justify-center items-center">
        <Image
          source={require('../../assets/images/players_not-found.png')}
          className={'w-[64px] h-[64px] block bg-white rounded-full '}
        />
      </View>
    );
  }

  return (
    // <View className="bg-white mr-2 rounded-full border-2 border-red-500 w-[60px] h-[60px]">
    <FastImage
      source={{
        uri: playerImage,
        headers: { Authorization: token || '' },
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
      className={
        'w-[60px] h-[60px] block rounded-full bg-white border-2 border-red-500 '
      }
    />
    // </View>
  );
};

export default PlayerImage;

import FastImage from 'react-native-fast-image';
