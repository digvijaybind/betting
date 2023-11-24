import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { RootParamList } from '../../../App';
import { numberStyle } from '../../lib/util/numberUtil';

type NavigationType = NativeStackScreenProps<
  RootParamList,
  'PoolsScreen'
>['navigation'];

export type LeaderboardType = {
  id: number;
  rankFrom: number;
  rankTo: number;
  prize: number;
};

export type BasicPoolType = {
  name: string;
  id: string;
  prizePool: number;
  entryFee: number;
  spotsLeft: number;
  totalSpots: number;
  leaderboard: LeaderboardType[];
};

export type PoolType = BasicPoolType & {
  teamA: string;
  teamB: string;
  match_key: string;
  start_at: number;
  hasTeam: boolean;
};

type Props = PoolType;

const PoolCard = ({
  name,
  prizePool,
  entryFee,
  spotsLeft,
  totalSpots,
  teamA,
  teamB,
  id,
  match_key,
  start_at,
  hasTeam,
  leaderboard,
}: Props) => {
  const navigation: NavigationType = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('PoolsDetailScreen', {
          match_key,
          teamA,
          teamB,
          start_at,
          hasTeam,
          leaderboard,
          entryFee,
          name,
          prizePool,
          spotsLeft,
          totalSpots,
          id,
        });
      }}
      className="mt-2 overflow-hidden border border-slate-900 rounded-xl">
      <View className="px-3 py-2">
        <View className="flex-row justify-between">
          <View>
            <View className="flex-row gap-1 items-center">
              <MaterialIcons name="grid-on" size={15} color="green" />
              <Text className="font-poppins600 text-xs text-black">{name}</Text>
            </View>
            <Text className="font-poppins600 mt-2 text-xs h-4 text-[#FC2B2D]">
              Prize
            </Text>
            <Text className="text-xl text-black font-poppins600 h-7">
              ₹ {numberStyle(prizePool)}
            </Text>
          </View>

          <View>
            <Text className="text-black text-right text-sm font-poppins500">
              Joining Fee
            </Text>
            <TouchableOpacity
              onPress={() => {
                hasTeam
                  ? navigation.navigate('SelectTeamScreen', {
                      match_key,
                      teamA,
                      teamB,
                      start_at,
                      entryFee,
                      totalSpots,
                      spotsLeft,name
                    })
                  : navigation.navigate('CreateTeamScreen', {
                      match_key,
                      teamA,
                      teamB,
                      start_at,
                      entryFee,
                      totalSpots,
                      spotsLeft,name
                    });
              }}
              className="bg-[#2ab92a] py-1 px-3 mt-2 rounded-lg">
              <Text className="text-center font-poppins700 text-md text-white">
                ₹ {entryFee}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {!(totalSpots <= 4) ? (
        <>
          {/* <View className="px-3 pb-2">
            <ProgressBar
              progress={spotsLeft / totalSpots}
              color={'#FC2B2D'}
              className=""
            />

            <View className="flex-row mt-1 justify-between">
              <Text className="text-xs font-poppins500 text-[#FC2B2D]">
                {totalSpots - spotsLeft} spots left
              </Text>
              <Text className="text-xs font-poppins500 text-black">
                {totalSpots} Spots
              </Text>
            </View>
          </View> */}
          <View className="py-2 rounded-b-md bg-slate-300">
            <View className="flex-row items-center justify-between px-3">
              <View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="ios-medal-outline" size={13} color="black" />
                  <Text className="mr-2 font-poppins500 text-xs text-black">
                    ₹{leaderboard[0].prize}
                  </Text>
                  <Ionicons name="trophy-sharp" size={13} color="black" />
                  <Text className="font-poppins500 text-xs text-black">
                    100%
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-1 ml-auto">
                <MaterialIcons
                  name="verified-user"
                  size={13}
                  color="black"
                  className="ml-auto"
                />
                <Text className="font-poppins500 text-xs text-black">
                  Guaranteed
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View className="py-2 rounded-b-md bg-slate-300">
          <View className="flex-row items-center justify-center px-3">
            <Text className="font-poppins500 text-center text-xs text-black">
              Unlimited slots
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default PoolCard;
