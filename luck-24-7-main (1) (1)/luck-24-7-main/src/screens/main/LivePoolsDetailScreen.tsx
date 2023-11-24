import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { RootParamList } from '../../../App';
import TeamLogo from '../../components/TeamLogo';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { ActivityIndicator, Avatar } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { LeaderboardType } from '../../components/PoolsScreen/PoolCard';
import { useGetLeaderbaordrank } from '../../lib/getLeaderboard';
import { numberStyle } from '../../lib/util/numberUtil';
import { listOfAllPools } from './PoolsScreen';

const Tab = createMaterialTopTabNavigator();

type Props = NativeStackScreenProps<RootParamList, 'LiveMatchPoolDetails'>;
const LiveMatchPoolDetails = ({ navigation: { goBack }, route }: Props) => {
  const { match_key, pool_prize, name, entry_fee, teamA, teamB } = route.params;
  return (
    <SafeAreaView
      style={{
        height: '100%',
      }}>
      {/* Navbar */}
      <View className="bg-white">
        <View className="mx-auto flex-row items-center h-16 w-11/12 ">
          <TouchableOpacity onPress={() => goBack()}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <View className="flex-row flex-1 justify-center items-center">
            <TeamLogo name={teamA} size="md" />
            <View className="justify-center items-center">
              <Text className="text-black uppercase text-xl mx-2 font-poppins700">
                vs
              </Text>
            </View>
            <TeamLogo name={teamB} size="md" />
          </View>
          {/* <Ionicons name="ios-wallet-outline" size={20} color="black" /> */}
        </View>
      </View>

      <View className="py-1">
        <View className="w-11/12 mx-auto">
          <Text className="font-poppins600 mt-2 text-xs h-4 text-[#FC2B2D]">
            Prize
          </Text>
          <Text className="text-xl text-black font-poppins600 h-7">
            ₹ {numberStyle(pool_prize)}
          </Text>
        </View>
      </View>

      <View className="py-2 mt-2 bg-slate-300">
        <View className="flex-row items-center justify-between px-3">
          <View>
            <View className="flex-row items-center gap-1">
              <Ionicons name="ios-medal-outline" size={13} color="black" />
              <Text className="mr-2 font-poppins500 text-xs text-black">
                ₹
                {
                  listOfAllPools.filter(ls => ls.prizePool === pool_prize)[0]
                    .prizePool
                }
              </Text>
              <Ionicons name="trophy-sharp" size={13} color="black" />
              <Text className="font-poppins500 text-xs text-black">100%</Text>
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

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: 'none',
          },

          swipeEnabled: true,

          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,

          tabBarIndicatorStyle: {
            backgroundColor: '#f00',
            height: 4,
          },

          tabBarStyle: {
            width: 'auto',
            elevation: 0,
            height: 50,
            backgroundColor: 'white',
            borderBottomColor: '#00000020',
            borderBottomWidth: 1,
          },
        }}>
        <Tab.Screen
          name="Winnings"
          children={() => (
            <WinningsSection
              leaderboard={listOfAllPools.filter(
                ls => ls.entryFee === entry_fee && ls.name === name,
              )[0].leaderboard}
            />
          )}
        />
        <Tab.Screen
          name="Leaderboard"
          children={() => (
            <LeaderBoardScreen
              match_key={match_key}
              name={name}
              entry_fee={entry_fee}
            />
          )}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default LiveMatchPoolDetails;

const WinningsSection = ({
  leaderboard,
}: {
  leaderboard: LeaderboardType[];
}) => {
  return (
    <View className="flex-1">
      <View className="justify-between py-1 border-b border-b-slate-200 bg-white px-4 flex-row">
        <Text className="text-gray-600 text-xs font-poppins500">Rank</Text>
        <Text className="text-gray-600 text-xs font-poppins500">Winnings</Text>
      </View>
      <ScrollView>
        {leaderboard.map((item, i) => (
          <View
            key={item.id}
            className="border-b border-b-slate-200 justify-between py-3 px-4 flex-row">
            <View className="flex-row gap-1 items-center">
              {item.rankFrom === item.rankTo ? (
                <>
                  <MaterialCommunityIcons
                    name="crown-outline"
                    size={24}
                    color={
                      i === 0 ? '#eb6200' : 1 === 1 ? '#bebb00' : '#0072be'
                    }
                  />
                  <Text className="font-poppins600 text-md text-black">
                    {item.rankFrom}
                  </Text>
                </>
              ) : (
                <>
                  <Text className="font-poppins600 text-lg text-gray-900">
                    #
                  </Text>
                  <Text className="font-poppins600 text-md text-black">
                    {item.rankFrom}
                  </Text>
                  <Text className="font-poppins600 text-md text-black">-</Text>
                  <Text className="font-poppins600 text-md text-black">
                    {item.rankTo}
                  </Text>
                </>
              )}
            </View>
            <Text className="font-poppins600 text-md text-black">
              ₹ {item.prize}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const LeaderBoardScreen = ({ match_key, name, entry_fee }) => {
  const { event, leaderboard } = useGetLeaderbaordrank({
    match_key,
    name,
    entry_fee,
  });

  const navigation: Props['navigation'] = useNavigation();
  if (event === 'loading')
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          size={'large'}
          style={{ marginBottom: 10 }}
          color={'#E31E24'}
        />
      </View>
    );

  return (
    <View className="flex-1">
      <View className="border-b border-slate-200 py-1 bg-white px-4 flex-row">
        <Text className="text-gray-600 text-xs font-poppins500">Player</Text>
        <Text className="text-gray-600 text-xs font-poppins500 ml-auto">
          Points
        </Text>
        <Text className="text-gray-600 text-xs font-poppins500 pl-6">Rank</Text>
      </View>
      <ScrollView>
        {leaderboard.map((item, i) => {
          // console.log(item.DATA.match_key);
          return (
            <TouchableOpacity
              key={`${item.mobileNumber}${i}`}
              onPress={() => {
                navigation.navigate('TeamPreview', {
                  selectedPlayer: item.DATA.players,
                  match_key: item.DATA.match_key,
                  caption: item.DATA.captain,
                  viceCaption: item.DATA.viceCaption,
                  teamA: item.DATA.teamA,
                  teamB: item.DATA.teamB,
                });
              }}
              className="py-4 items-center gap-2 border-b border-black/10 bg-white px-4 flex-row">
              <Avatar.Icon
                size={35}
                icon="account"
                color="#f00"
                style={{
                  backgroundColor: '#00000010',
                }}
              />
              <Text className="text-md text-black mr-auto">
                {item.mobileNumber}
              </Text>
              <Text className="text-xs text-black text-center w-12">
                {item.DATA.score}
              </Text>
              <Text className="text-xs text-black text-center w-8">
                {item.rank}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
