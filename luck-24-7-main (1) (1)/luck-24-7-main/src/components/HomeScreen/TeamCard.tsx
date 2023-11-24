import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import React from 'react';
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { RootParamList } from '../../../App';
import { SelectPlayerType } from '../../screens/main/CreateTeamScreen';
import PlayerImage from '../PlayerImage';

export type TeamCardProps = {
  caption: SelectPlayerType;
  viceCaption: SelectPlayerType;
  players: SelectPlayerType[];
  match_key: string;
  teamA: string;
  teamB: string;
  start_at: number;
  id: number;
};

type Props = TeamCardProps;

type NavType = NativeStackScreenProps<
  RootParamList,
  'TeamPreview'
>['navigation'];

const TeamCard = ({
  caption,
  viceCaption,
  players,
  match_key,
  teamA,
  start_at,
  teamB,
  id,
  as,
  type,
}: Props) => {
  const nav: NavType = useNavigation();

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
                nav.navigate('PoolsScreen', {
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

  const Component = as === 'View' ? View : TouchableOpacity;

  return (
    <Component
      className={clsx(
        'border overflow-hidden rounded-xl bg-white justify-between border-slate-900',
        as === 'View' ? 'flex-1 ml-2' : 'w-full ',
      )}
      onLongPress={() => {
        Alert.alert('Are you sure?', 'Your team will be removed permanantly.', [
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
        ]);
      }}>
      <ImageBackground
        source={require('../../../assets/images/team_bg.png')}
        className="w-full flex-col overflow-hidden">
        <View className="px-2 pb-2 pt-4 flex-row justify-between items-center">
          <View className="flex-row space-x-2">
            <View className="items-center">
              <View>
                <PlayerImage imageName={caption.key} />
                <View className="absolute top-0 left-0 bg-white px-1 h-[14px] justify-center items-center rounded-lg">
                  <Text className="font-poppins700 text-[10px] text-black">
                    C
                  </Text>
                </View>
              </View>
              <View className="bg-[#FC2B2D] py-1 px-2 rounded-md">
                <Text className="font-poppins500 text-white text-xs text-center">
                  {caption.name.split(' ')[0]}
                </Text>
              </View>
            </View>
            <View className="items-center">
              <View>
                <PlayerImage imageName={viceCaption.key} />
                <View className="absolute top-0 left-0 bg-white px-1 h-[14px]  justify-center items-center rounded-lg">
                  <Text className="font-poppins700 text-[10px] text-black">
                    VC
                  </Text>
                </View>
              </View>
              <View className="bg-[#FC2B2D] py-1 px-2 rounded-md">
                <Text className="font-poppins500 text-white text-xs text-center">
                  {viceCaption.name.split(' ')[0]}
                </Text>
              </View>
            </View>
          </View>

          <Button
            onPress={() => {
              nav.navigate('TeamPreview', {
                selectedPlayer: players,
                match_key,
                teamA,
                teamB,
                caption,
                viceCaption,
                id,
                ...(type === 'edit'
                  ? {
                      type: 'edit',
                      start_at,
                    }
                  : null),
              });
            }}
            mode="contained-tonal"
            className="bg-[#1D3A4B] p-1 rounded-lg">
            <Text className="text-white text-xs h-3 font-poppins500">View</Text>
          </Button>
        </View>
        <View className="bg-white py-2 space-x-10 mt-2 flex-row w-full items-center justify-center">
          <View className="flex-row gap-1">
            <Text className="text-xs text-gray-800 font-poppins500">WK</Text>
            <Text className="text-xs font-poppins800 text-black">
              {players.filter(p => p.seasonalRole === 'keeper').length}
            </Text>
          </View>
          <View className="flex-row gap-1">
            <Text className="text-xs text-gray-800 font-poppins500">BAT</Text>
            <Text className="text-xs font-poppins800 text-black">
              {players.filter(p => p.seasonalRole === 'batsman').length}
            </Text>
          </View>
          <View className="flex-row gap-1">
            <Text className="text-xs text-gray-800 font-poppins500">BOL</Text>
            <Text className="text-xs font-poppins800 text-black">
              {players.filter(p => p.seasonalRole === 'bowler').length}
            </Text>
          </View>
          <View className="flex-row gap-1">
            <Text className="text-xs text-gray-800 font-poppins500">AR</Text>
            <Text className="text-xs font-poppins800 text-black">
              {players.filter(p => p.seasonalRole === 'all_rounder').length}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Component>
  );
};

export default TeamCard;
