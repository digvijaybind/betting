import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator, Button } from 'react-native-paper';
import { RootParamList } from '../../../App';
import PlayerImage from '../../components/PlayerImage';
import Keys from '../../values/keys/Keys';

type Props = NativeStackScreenProps<RootParamList, 'TeamPreview'>;
const TeamPreview = ({ route }: Props) => {
  const navigation: Props['navigation'] = useNavigation();
  const {
    selectedPlayer,
    type,
    match_key,
    teamA,
    teamB,
    start_at,
    caption,
    viceCaption,
    id,
  } = route.params;
  const { goBack, navigate } = navigation;
  const [playing11, setPlaying11] = useState<string[]>([]);
  const [hasError, setHasError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(caption);
  const getToken = async () => {
    await AsyncStorage.getItem('token').then(token => {
      if (token) teamPlayers({ token, project_key: Keys.projectKey });
      else console.log('no token');
    });
  };

  const teamPlayers = useCallback(
    async ({ token, project_key }: { token: string; project_key: string }) => {
      await axios({
        method: 'get',
        url: `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${match_key}/`,
        headers: {
          'rs-token': token,
        },
      })
        .then(function (response) {
          const data1 = response.data;
          const data2 = data1.data;
          setPlaying11(
            data2.squad.a.playing_xi && data2.squad.b.playing_xi
              ? [...data2.squad.a.playing_xi, ...data2.squad.b.playing_xi]
              : [],
          );
          console.log('playing 11', playing11);
          setIsLoading(false);
        })
        .catch(function (error: AxiosError) {
          console.log('error', error.message);
          setIsLoading(false);
          setPlaying11([]);
        });
    },
    [],
  );

  useEffect(() => {
    getToken();
  }, []);

  const deleteTeam = async () => {
    await AsyncStorage.getItem('mobileNumber').then(mobileNumber => {
      firestore()
        .collection('Users')
        .doc(`${mobileNumber}`)
        .collection('myTeams')
        .doc(`${match_key}`)
        .collection('team')
        .doc(`${id}`)
        .delete()
        .then(() => {
          Alert.alert('Team Deleted.', 'Your team has been removed.', [
            {
              text: 'ok',
              onPress: () => {
                navigate('PoolsScreen', {
                  match_key,
                  teamA,
                  teamB,
                  start_at,
                });
              },
            },
          ]);
        });
    });
  };

  if (hasError) {
    return (
      <View className="h-full flex-1">
        <View className="bg-[#FC2B2D] py-3">
          <View className="mx-auto flex-row items-center w-11/12 ">
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <View className="flex-row flex-1 justify-center items-center">
              <Text className="text-white text-lg font-poppins600">
                Team Preview
              </Text>
            </View>
            <Button
              className="text-right font-poppins700 bg-white text-[#FC2B2D] rounded-md px-2 py-0"
              onPress={() => {
                getToken();
              }}>
              <Text>Retry</Text>
            </Button>
          </View>
        </View>
        <Text className="text-black">{hasError}</Text>

        <Text className="text-black">{match_key}</Text>
      </View>
    );
  }

  if (isLoading || !playing11) {
    return (
      <View className="h-52 justify-center items-center">
        <ActivityIndicator size="large" color="#FC2B2D" />
      </View>
    );
  }
  const categories = [
    {
      id: 1,
      category: 'keeper',
      title: 'Wicket Keeper',
    },
    {
      id: 2,
      category: 'batsman',
      title: 'Batsman',
    },
    {
      id: 3,
      category: 'all_rounder',
      title: 'All Rounder',
    },
    {
      id: 4,
      category: 'bowler',
      title: 'Bowler',
    },
  ];

  if (false) {
    return (
      <SafeAreaView
        style={{
          height: '100%',
        }}>
        {/* background */}
        <ImageBackground
          className="flex-1 relative items-center justify-evenly"
          source={require('../../../assets/images/team_full_bg.png')}>
          {/* Navbar */}
          <View className="absolute top-0 w-full py-3">
            <View className="mx-auto flex-row justify-between items-center w-11/12 ">
              <TouchableOpacity onPress={() => goBack()} style={{ width: 40 }}>
                <AntDesign name="arrowleft" size={20} color="white" />
              </TouchableOpacity>
              {type === 'edit' && (
                <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('CreateTeamScreen', {
                        type: 'edit',
                        start_at,
                        match_key,
                        players: selectedPlayer,
                        teamA,
                        teamB,
                        caption,
                        viceCaption,
                        id,
                      })
                    }>
                    <AntDesign name="edit" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                      Alert.alert(
                        'Are you sure?',
                        'Your team will be removed permanantly.',
                        [
                          {
                            text: 'Yes',
                            onPress: () => {
                              deleteTeam();
                            },
                          },
                          {
                            text: 'no',
                            onPress: () => {
                              null;
                            },
                          },
                        ],
                      );
                    }}>
                    <AntDesign name="delete" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View className="items-center">
            {selectedPlayer.filter(p => p.seasonal_role === 'keeper').length >
              0 && (
              <Text className="text-white font-poppins600 px-2 rounded-lg text-sm pb-3 uppercase">
                Wicket Keeper
              </Text>
            )}
            <View className="flex-row flex-wrap justify-center ">
              {selectedPlayer
                .filter(p => p.seasonal_role === 'keeper')
                .map(player => {
                  const isCaption = player.key === caption?.key;
                  const isViceCaption = player.key === viceCaption?.key;
                  const isPlaying =
                    playing11.length !== 0
                      ? playing11.some(p11 => p11 === player.key)
                        ? 'playing'
                        : 'not-playing'
                      : null;
                  return (
                    <PlayerBox
                      {...player}
                      playerKey={player.key}
                      isCaption={isCaption}
                      isViceCaption={isViceCaption}
                      isPlaying={isPlaying}
                    />
                  );
                })}
            </View>
          </View>
          <View className="items-center">
            {selectedPlayer.filter(p => p.seasonal_role === 'batsman').length >
              0 && (
              <Text className="text-white font-poppins600 px-2 rounded-lg text-sm pb-3 uppercase">
                Batsman
              </Text>
            )}
            <View className="flex-row flex-wrap justify-center">
              {selectedPlayer
                .filter(p => p.seasonal_role === 'batsman')
                .map(player => {
                  const isCaption = player.key === caption?.key;
                  const isViceCaption = player.key === viceCaption?.key;
                  const isPlaying =
                    playing11.length !== 0
                      ? playing11.some(p11 => p11 === player.key)
                        ? 'playing'
                        : 'not-playing'
                      : null;
                  return (
                    <PlayerBox
                      {...player}
                      playerKey={player.key}
                      isCaption={isCaption}
                      isViceCaption={isViceCaption}
                      isPlaying={isPlaying}
                    />
                  );
                })}
            </View>
          </View>

          <View className="items-center">
            {selectedPlayer.filter(p => p.seasonal_role === 'all_rounder')
              .length > 0 && (
              <Text className="text-white font-poppins600 px-2 rounded-lg text-sm pb-3 uppercase">
                All Rounder
              </Text>
            )}
            <View className="flex-row flex-wrap  justify-center ">
              {selectedPlayer
                .filter(p => p.seasonal_role === 'all_rounder')
                .map(player => {
                  const isCaption = player.key === caption?.key;
                  const isViceCaption = player.key === viceCaption?.key;
                  const isPlaying =
                    playing11.length !== 0
                      ? playing11.some(p11 => p11 === player.key)
                        ? 'playing'
                        : 'not-playing'
                      : null;
                  return (
                    <PlayerBox
                      {...player}
                      playerKey={player.key}
                      isCaption={isCaption}
                      isViceCaption={isViceCaption}
                      isPlaying={isPlaying}
                    />
                  );
                })}
            </View>
          </View>
          <View className="items-center">
            {selectedPlayer.filter(p => p.seasonal_role === 'bowler').length >
              0 && (
              <Text className="text-white font-poppins600 px-2 rounded-lg text-sm pb-3 uppercase">
                Bowler
              </Text>
            )}
            <View className="flex-row flex-wrap justify-center ">
              {selectedPlayer
                .filter(p => p.seasonal_role === 'bowler')
                .map(player => {
                  const isCaption = player.key === caption?.key;
                  const isViceCaption = player.key === viceCaption?.key;
                  const isPlaying =
                    playing11.length !== 0
                      ? playing11.some(p11 => p11 === player.key)
                        ? 'playing'
                        : 'not-playing'
                      : null;
                  return (
                    <PlayerBox
                      {...player}
                      playerKey={player.key}
                      isCaption={isCaption}
                      isViceCaption={isViceCaption}
                      isPlaying={isPlaying}
                    />
                  );
                })}
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          height: '100%',
        }}>
        <ImageBackground
          className="flex-1 relative items-center justify-evenly"
          source={require('../../../assets/images/team_full_bg.png')}>
          {/* Navbar */}
          <View className="absolute top-0 w-full py-3">
            <View className="mx-auto flex-row justify-between items-center w-11/12 ">
              <TouchableOpacity onPress={() => goBack()} style={{ width: 40 }}>
                <AntDesign name="arrowleft" size={20} color="white" />
              </TouchableOpacity>
              {type === 'edit' && (
                <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate('CreateTeamScreen', {
                        type: 'edit',
                        start_at,
                        match_key,
                        players: selectedPlayer,
                        teamA,
                        teamB,
                        caption,
                        viceCaption,
                        id,
                      })
                    }>
                    <AntDesign name="edit" size={20} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                      Alert.alert(
                        'Are you sure?',
                        'Your team will be removed permanantly.',
                        [
                          {
                            text: 'Yes',
                            onPress: () => {
                              deleteTeam();
                            },
                          },
                          {
                            text: 'no',
                            onPress: () => {
                              null;
                            },
                          },
                        ],
                      );
                    }}>
                    <AntDesign name="delete" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {categories.map(category => (
            <TeamSeperatorComponent
              key={category.id}
              title={category.title}
              category={category.category}
              caption={caption}
              viceCaption={viceCaption}
              playing11={playing11}
              selectedPlayer={selectedPlayer}
            />
          ))}
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

const TeamSeperatorComponent = ({
  selectedPlayer,
  category,
  title,
  caption,
  viceCaption,
  playing11,
}) => {
  return (
    <View className="flex-row max-w-xs ">
      <View className="flex-1">
        {selectedPlayer.filter(p => p.seasonal_role === category).length >
          0 && (
          <Text className="text-white text-center font-poppins600 px-2 rounded-lg text-sm pb-3 uppercase">
            {title}
          </Text>
        )}
        <View className="flex-row justify-between">
          {selectedPlayer
            .filter(p => p.seasonal_role === category)
            .map(player => {
              const isCaption = player.key === caption?.key;
              const isViceCaption = player.key === viceCaption?.key;
              const isPlaying =
                playing11.length !== 0
                  ? playing11.some(p11 => p11 === player.key)
                    ? 'playing'
                    : 'not-playing'
                  : null;
              return (
                <PlayerBox
                  {...player}
                  playerKey={player.key}
                  isCaption={isCaption}
                  isViceCaption={isViceCaption}
                  isPlaying={isPlaying}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
};

export default TeamPreview;

const PlayerBox = ({
  playerKey,
  name,
  isCaption,
  isViceCaption,
  isPlaying,
}: {
  playerKey: string;
  name: string;
  isCaption: boolean;
  isViceCaption: boolean;
  isPlaying: 'playing' | 'not-playing' | null;
}) => {
  return (
    <View className="justify-center mt-3 items-center ">
      <PlayerImage imageName={playerKey} />
      {(isCaption || isViceCaption) && (
        <View className="absolute top-0 left-0 bg-white px-1 h-[14px]  justify-center items-center rounded-lg">
          <Text className="font-poppins700 text-[10px] text-black">
            {isCaption && 'C'}
            {isViceCaption && 'VC'}
          </Text>
        </View>
      )}
      {isPlaying && (
        <View
          className={clsx(
            'absolute top-0 w-3 h-3 right-3 bg-white justify-center items-center rounded-full border',
            isPlaying === 'playing' && 'bg-green-500',
            isPlaying === 'not-playing' && 'bg-red-500',
          )}></View>
      )}
      <View className="bg-red-500 px-3 py-[2px] mt-[-8px]">
        <Text className="font-poppins500 text-center text-[10px] text-white">
          {`${name.split(' ')[0][0]} ${name.split(' ')[1]}`}
        </Text>
      </View>
    </View>
  );
};
