import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { ActivityIndicator, Button } from 'react-native-paper';
import { RootParamList } from '../../../App';
import { default as TeamLogo } from '../../components/TeamLogo';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import TeamCard, { TeamCardProps } from '../../components/HomeScreen/TeamCard';
import Keys from '../../values/keys/Keys';
const project_key = Keys.projectKey;
const Tab = createMaterialTopTabNavigator();

type Props = NativeStackScreenProps<RootParamList, 'LiveMatchScreen'>;
const LiveMatchScreen = ({ route }: Props) => {
  const navigation: Props['navigation'] = useNavigation();
  const { match_key, teamA, teamB } = route.params;
  const [matchData, setMatchData] = useState();
  const [ballByBallData, setBallByBallData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [hasErr, setHasErr] = useState<false | string>('');
  const [token, setToken] = useState('');

  const getToken = async () => {
    await AsyncStorage.getItem('token').then(token => {
      if (token) {
        getAllData(token);
        setToken(token);
      } else console.log('no token');
    });
  };

  const getAllData = async (token: string) => {
    let urls = [
      `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${match_key}/`,
      `https://api.sports.roanuz.com/v5/cricket/${project_key}/match/${match_key}/ball-by-ball/`,
    ];

    const requests = urls.map(url =>
      axios.get(url, {
        headers: {
          'rs-token': token,
        },
      }),
    );

    axios
      .all(requests)
      .then(responses => {
        responses.forEach((resp, i) => {
          if (i === 0) setMatchData(resp.data.data);
          if (i === 1) setBallByBallData(resp.data.data);
          // console.log(JSON.stringify(resp.data.data));
        });
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch((err: AxiosError) => {
        console.log(err, match_key, token);
        setHasErr('true');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  // useEffect(() => {

  //   getAllData(token);
  //   // const intv = setInterval(() => {
  //   //   setRefreshing(true);
  //   //   getAllData(token);
  //   // }, 5000);

  //   return () => {
  //     clearInterval(intv);
  //   };
  // }, []);

  if (hasErr) {
    return (
      <View className="h-full justify-center items-center">
        <View className="bg-[#1D3A4B] pb-2">
          <View className="mx-auto flex-row items-center w-11/12 h-16">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <View className="flex-row flex-1 justify-center items-center">
              Loading Live Match Data
            </View>
            <Ionicons
              name="refresh"
              size={20}
              disabled={refreshing}
              color={
                refreshing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255)'
              }
              onPress={() => {
                setRefreshing(true);
                getAllData(token);
              }}
            />
          </View>
        </View>
        <Text className="text-red-500">Something went wrong </Text>
        <Button
          mode="contained"
          className="bg-[#FC2B2D] mt-2"
          onPress={() => {
            setHasErr(false);
            setIsLoading(true);
            getAllData(token);
          }}>
          <Text className="text-white font-poppins500">Retry</Text>
        </Button>
      </View>
    );
  }

  if (isLoading || !matchData) {
    return (
      <View className="h-full justify-center items-center">
        <ActivityIndicator size="large" color="#FC2B2D" />
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full">
      {/* Navbar */}
      <View className="bg-[#1D3A4B] pb-2">
        <View className="mx-auto flex-row items-center w-11/12 h-16">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <View className="flex-row flex-1 justify-center items-center">
            <Text className="text-white uppercase text-xl font-poppins700">
              {matchData.teams?.a.code} vs {matchData.teams.b.code}
            </Text>
          </View>
          {/* <Ionicons
            name="add"
            size={20}
            onPress={() => {
              navigation.navigate('CreateTeamScreen', {
                match_key,
                teamA,
                teamB,
                start_at: matchData.start_at,
              });
            }}
          /> */}
        </View>

        {/* Live Score Box */}
        <View className="mx-auto flex-row items-center w-11/12 pt-2 pb-3">
          <View className="flex-row flex-1 justify-between items-center">
            <View>
              <Text className="text-white text-xs font-poppins500">
                {matchData.teams?.a.name}
              </Text>
              <View className="flex-row pt-2 items-center space-x-1">
                <TeamLogo name={matchData.teams?.a.code} size="md" />
                <View className="flex-row items-center">
                  {matchData.play.innings.a_1.overs[0] === 0 &&
                  matchData.play.innings.a_1.overs[0] === 0 ? (
                    <Text className="text-white font-poppins500">
                      Yet to bet
                    </Text>
                  ) : (
                    <>
                      <Text className="text-white font-poppins700 text-lg">
                        {matchData.play.innings.a_1.score.runs}/
                        {matchData.play.innings.a_1.wickets}
                      </Text>
                      <Text className="text-white font-poppins500">
                        {' '}
                        ({matchData.play.innings.a_1.overs[0]}.
                        {matchData.play.innings.a_1.overs[1]})
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>
            <View className="justify-center flex-row gap-1 px-2 items-center">
              <View className="h-2 w-2 rounded-full bg-[#f00]" />
              <Text className="text-white uppercase text-xs font-poppins700">
                Live
              </Text>
            </View>
            {matchData.play_status === 'innings_break' && (
              <Text className="text-white font-poppins500 text-xs">
                Innings Break
              </Text>
            )}
            <View>
              <Text className="text-white font-poppins500 text-xs">
                {matchData.teams.b.name}
              </Text>
              <View className="flex-row items-center justify-end pt-2">
                <View className="flex-row pr-1">
                  {matchData.play.innings.b_1.overs[0] === 0 &&
                  matchData.play.innings.b_1.overs[0] === 0 ? (
                    <Text className="text-white font-poppins500">
                      Yet to bet
                    </Text>
                  ) : (
                    <>
                      <Text className="text-white font-poppins700 text-lg">
                        {matchData.play.innings.b_1.score.runs}/
                        {matchData.play.innings.b_1.wickets}
                      </Text>
                      <Text className="text-white font-poppins500">
                        {' '}
                        ({matchData.play.innings.b_1.overs[0]}.
                        {matchData.play.innings.b_1.overs[1]})
                      </Text>
                    </>
                  )}
                </View>
                <TeamLogo name={matchData.teams.b.code} size="md" />
              </View>
            </View>
          </View>
        </View>

        {/* Live Over Box */}
        {matchData.play.live && (
          <View className="mx-auto flex-row items-center w-11/12 pt-3 pb-3 border-t border-white/50 justify-between ">
            <View>
              {matchData.play.innings[matchData.play.live.innings].partnerships
                .length === 0 && (
                <Text className="text-white text-xs">No Partnerships yet</Text>
              )}
              {matchData.play.innings[matchData.play.live.innings].partnerships
                .slice(-1)
                .map((partner,key) => {
                  return (
                    <View key={key}>
                      <View className="justify-between flex-row">
                        <Text className="text-white">
                          {matchData.players[partner.player_a_key].player.name}{' '}
                        </Text>
                        <Text className="text-white">
                          {partner.player_a_score.runs} (
                          {partner.player_a_score.balls}){' '}
                          {matchData.play.live.striker_key ===
                          partner.player_a_key ? (
                            <Text className="text-white">*</Text>
                          ) : null}
                        </Text>
                      </View>

                      <View className="justify-between flex-row">
                        <Text className="text-white">
                          {matchData.players[partner.player_b_key].player.name}{' '}
                        </Text>
                        <Text className="text-white">
                          {partner.player_b_score.runs} (
                          {partner.player_b_score.balls}){' '}
                          {matchData.play.live.striker_key ===
                          partner.player_b_key ? (
                            <Text className="text-white">*</Text>
                          ) : null}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
            <View className="">
              <View className="justify-between flex-row">
                <Text className="text-white text-xs">
                  {matchData.play.live.recent_players?.bowler?.name ||
                    'Selecting New Bolwer'}
                </Text>

                <Text className="text-xs text-white">
                  {matchData.play.live?.recent_players?.bowler && (
                    <>
                      {matchData.play.live.recent_players.bowler?.stats.wickets}
                      /{matchData.play.live.recent_players.bowler?.stats.runs} (
                      {
                        matchData.play.live.recent_players.bowler?.stats
                          .overs[0]
                      }
                      .
                      {
                        matchData.play.live.recent_players.bowler?.stats
                          .overs[0]
                      }
                      )
                    </>
                  )}
                </Text>
              </View>
              <View className="flex-row space-x-1 mt-2">
                {Array.from({ length: 6 }, (v, k) => k).map((ball,key) => {
                  return (
                    <View
                      className={clsx(
                        'w-5 h-5 border border-white/50 rounded-full justify-center items-center',
                        matchData.play.live?.recent_overs_repr[0].ball_repr[
                          ball
                        ] === 'w'
                          ? 'bg-[#ff000060]'
                          : 'bg-[#ffffff30]',
                      )} key={key}>
                      <Text className="text-white text-xs">
                        {matchData.play.live?.recent_overs_repr[0].ball_repr[
                          ball
                        ]?.startsWith('r') || ''
                          ? matchData.play.live?.recent_overs_repr[0].ball_repr[
                              ball
                            ]?.slice(1)
                          : matchData.play.live?.recent_overs_repr[0].ball_repr[
                              ball
                            ] || ''}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Live Score Card */}
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
          name="My Contest"
          children={() => <MyContest {...route.params} />}
        />
        <Tab.Screen
          name="My Teams"
          children={() => <MyTeams {...route.params} />}
        />
        <Tab.Screen
          name="Scoreboard"
          children={() => <ScoreBoardScreen matchData={matchData} />}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default LiveMatchScreen;

function MyContest({
  match_key,
  teamA,
  teamB,
}: {
  match_key: string;
  teamA: string;
  teamB: string;
  start_at: number;
}) {
  const [myContests, setMyContests] = useState<TeamCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation: Props['navigation'] = useNavigation();

  const getMyContests = async () => {
    setRefreshing(true);

    await AsyncStorage.getItem('mobileNumber').then(res => {
      const temp = [];
      firestore()
        .collection('Users')
        .doc(res)
        .collection('myContests')
        .doc(match_key)
        .collection('pool')
        .get()
        .then(res => {
          const docs = res.docs;

          docs.forEach(teams => {
            temp.push(teams.data());
          });
        })
        .then(() => {
          const sorted = [...temp].sort((a, b) => b.createdOn - a.createdOn);
          setMyContests(sorted);
          setRefreshing(false);
          // console.log('sorted', JSON.stringify(sorted));
        })
        .catch(e => {
          setRefreshing(false);
        });
    });
  };

  useEffect(() => {
    getMyContests();
  }, []);

  return (
    <View
      className="w-11/12 flex-1 mx-auto mt-2"
      style={{
        paddingBottom: 30,
      }}>
      {myContests.length === 0 ? (
        <View className="justify-center flex-1 items-center">
          <Image
            source={require('../../../assets/images/logo.png')}
            className="mx-auto opacity-25 mb-2"
            style={{
              width: 100,
              height: 100 * (162 / 312),
            }}
          />
          <Text className="text-md font-poppins600 text-black/40">
            No Contest jioned
          </Text>
        </View>
      ) : (
        <FlatList
          data={myContests}
          keyExtractor={(_, i) => `${i}`}
          renderItem={({ item }) => {
            const pool = item.poolName;
            const entryFee = item.entryFee;

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LiveMatchPoolDetails', {
                    match_key,
                    name: pool,
                    entry_fee: item.entryFee,
                    pool_prize:
                      pool == 'Premium'
                        ? 350000
                        : pool == 'Mega'
                        ? 350000
                        : pool == 'Chota Packet'
                        ? 210000
                        : 0,
                    teamA,
                    teamB,
                  });
                }}
                className="mt-2 overflow-hidden border border-slate-900 rounded-xl">
                <View className="px-3 py-2">
                  <View>
                    <View className="flex-row gap-1 items-center">
                      <MaterialIcons name="grid-on" size={15} color="green" />
                      <Text className="font-poppins600 text-xs text-black">
                        {item.poolName}
                      </Text>
                    </View>
                    <Text className="font-poppins600 mt-2 text-xs h-4 text-[#FC2B2D]">
                      Prize
                    </Text>
                    <Text className="text-xl text-black font-poppins600 h-7">
                      {pool == 'Premium'
                        ? '₹ 350000'
                        : pool == 'Mega'
                        ? '₹ 350000'
                        : pool == 'Chota Packet'
                        ? '₹ 210000'
                        : pool == '1v1' && entryFee == '100'
                        ? '₹ 165'
                        : pool == '1v1' && entryFee == '200'
                        ? '₹ 330'
                        : pool == '1v1' && entryFee == '500'
                        ? '₹ 825'
                        : pool == '1v1' && entryFee == '1000'
                        ? '₹ 1650'
                        : pool == '1v1' && entryFee == '2000'
                        ? '₹ 3300'
                        : pool == '1v1' && entryFee == '5000'
                        ? '₹ 8500'
                        : pool == '1v1' && entryFee == '10000'
                        ? '₹ 17000'
                        : pool == '1v2' && entryFee == '100'
                        ? '₹ 250'
                        : pool == '1v2' && entryFee == '200'
                        ? '₹ 500'
                        : pool == '1v2' && entryFee == '500'
                        ? '₹ 1200'
                        : pool == '1v2' && entryFee == '1000'
                        ? '₹ 2500'
                        : pool == '1v2' && entryFee == '2000'
                        ? '₹ 5000'
                        : pool == '1v2' && entryFee == '5000'
                        ? '₹ 12500'
                        : pool == '1v3' && entryFee == '100'
                        ? '₹ 300'
                        : pool == '1v3' && entryFee == '200'
                        ? '₹ 600'
                        : pool == '1v3' && entryFee == '500'
                        ? '₹ 1500'
                        : pool == '1v3' && entryFee == '1000'
                        ? '₹ 3000'
                        : pool == '1v3' && entryFee == '2000'
                        ? '₹ 6000'
                        : pool == '1v3' && entryFee == '5000'
                        ? '₹ 15000'
                        : pool == '1v3' && entryFee == '10000'
                        ? '₹ 30000'
                        : 0}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginVertical: 5,
                      width: '100%',
                      height: 1,
                      backgroundColor: '#000',
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ justifyContent: 'flex-start' }}>
                      <Text className="text-black">Prize Pool</Text>
                      <Text style={{ color: '#000', fontWeight: '600' }}>
                        {pool == 'Premium'
                          ? '₹ 350000'
                          : pool == 'Mega'
                          ? '₹ 350000'
                          : pool == 'Chota Packet'
                          ? '₹ 210000'
                          : pool == '1v1' && entryFee == '100'
                          ? '₹ 165'
                          : pool == '1v1' && entryFee == '200'
                          ? '₹ 330'
                          : pool == '1v1' && entryFee == '500'
                          ? '₹ 825'
                          : pool == '1v1' && entryFee == '1000'
                          ? '₹ 1650'
                          : pool == '1v1' && entryFee == '2000'
                          ? '₹ 3300'
                          : pool == '1v1' && entryFee == '5000'
                          ? '₹ 8500'
                          : pool == '1v1' && entryFee == '10000'
                          ? '₹ 17000'
                          : pool == '1v2' && entryFee == '100'
                          ? '₹ 250'
                          : pool == '1v2' && entryFee == '200'
                          ? '₹ 500'
                          : pool == '1v2' && entryFee == '500'
                          ? '₹ 1200'
                          : pool == '1v2' && entryFee == '1000'
                          ? '₹ 2500'
                          : pool == '1v2' && entryFee == '2000'
                          ? '₹ 5000'
                          : pool == '1v2' && entryFee == '5000'
                          ? '₹ 12500'
                          : pool == '1v3' && entryFee == '100'
                          ? '₹ 300'
                          : pool == '1v3' && entryFee == '200'
                          ? '₹ 600'
                          : pool == '1v3' && entryFee == '500'
                          ? '₹ 1500'
                          : pool == '1v3' && entryFee == '1000'
                          ? '₹ 3000'
                          : pool == '1v3' && entryFee == '2000'
                          ? '₹ 6000'
                          : pool == '1v3' && entryFee == '5000'
                          ? '₹ 15000'
                          : pool == '1v3' && entryFee == '10000'
                          ? '₹ 30000'
                          : 0}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start' }}>
                      <Text className="text-black">Spots</Text>
                      <Text style={{ color: '#000', fontWeight: '600' }}>
                        {pool == 'Premium'
                          ? '20000'
                          : pool == 'Mega'
                          ? '10000'
                          : pool == 'Chota Packet'
                          ? '25000'
                          : pool == '1v1'
                          ? '2'
                          : pool == '1v2'
                          ? '3'
                          : pool == '1v3'
                          ? '3'
                          : 0}
                      </Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start' }}>
                      <Text className="text-black">Entry</Text>
                      <Text style={{ color: '#000', fontWeight: '600' }}>
                        {`₹ ${item.entryFee}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

function MyTeams({
  match_key,
  teamA,
  teamB,
  start_at,
}: {
  match_key: string;
  teamA: string;
  teamB: string;
  start_at: number;
}) {
  const [refreshing, setRefreshing] = useState(false);

  const [myTeams, setMyTeams] = useState<TeamCardProps[]>([]);
  const getMyTeams = async () => {
    setRefreshing(true);

    await AsyncStorage.getItem('mobileNumber').then(res => {
      const temp = [];
      firestore()
        .collection('Users')
        .doc(res)
        .collection('myTeams')
        .doc(match_key)
        .collection('team')
        .get()
        .then(res => {
          const docs = res.docs;
          docs.forEach(teams => {
            temp.push(teams.data());
          });
        })
        .then(() => {
          const sorted = [...temp].sort((a, b) => b.createdOn - a.createdOn);
          setMyTeams(sorted);
          setRefreshing(false);
        })
        .catch(e => {
          setRefreshing(false);
        });
    });
  };

  useEffect(() => {
    getMyTeams();
  }, []);

  return (
    <View
      className="w-11/12 flex-1 mx-auto mt-2"
      style={{
        paddingBottom: 30,
      }}>
      {myTeams.length === 0 ? (
        <View className="justify-center flex-1 items-center">
          <Image
            source={require('../../../assets/images/logo.png')}
            className="mx-auto opacity-25 mb-2"
            style={{
              width: 100,
              height: 100 * (162 / 312),
            }}
          />
          <Text className="text-md font-poppins600 text-black/40">
            No Team created
          </Text>
        </View>
      ) : (
        <FlatList
          data={myTeams}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getMyTeams} />
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => {
            return index;
          }}
          ListFooterComponent={<View style={{ width: '100%', height: 260 }} />}
          renderItem={({ item }) => {
            return (
              <View className="mt-2">
                <TeamCard
                  as="View"
                  caption={item.caption}
                  viceCaption={item.viceCaption}
                  players={item.players}
                  match_key={match_key}
                  teamA={teamA}
                  teamB={teamB}
                  start_at={start_at}
                  id={item.id}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

function ScoreBoardScreen({ matchData }) {
  // toss: {
  //   called: 'b',
  //   winner: 'a',
  //   elected: 'bowl',
  // },
  const [teamOpen, setTeamOpen] = useState<'a' | 'b'>(() => {
    if (matchData.toss.elected === 'bat') {
      return matchData.toss.winner;
    }
    return matchData.toss.winner === 'a' ? 'b' : 'a';
  });
  return (
    <ScrollView>
      {matchData.play.innings_order.map((inning, index) => {
        const currentTeamCode = inning.replace('_1', '');
        const ops_team = matchData.play?.live.bowling_team;
        const ops_id = `${ops_team}_1`;
        return (
          <View className="w-11/12 mx-auto" key={index}>
            <View className="flex-row items-center py-3">
              <Text className="text-black text-lg mr-auto font-poppins700">
                {matchData.teams[currentTeamCode].code}
              </Text>
              <Text className="text-black font-poppins500">
                ({matchData.play.innings[inning].overs[0]}.
                {matchData.play.innings[inning].overs[1]}){' '}
              </Text>
              <Text className="text-black font-poppins700 text-lg">
                {matchData.play.innings[inning].score.runs}/
                {matchData.play.innings[inning].wickets}
              </Text>
              <TouchableOpacity
                className={clsx(
                  'w-7 h-7 ml-2 rounded-full justify-center items-center',
                  currentTeamCode === teamOpen && 'rotate-90',
                )}
                onPress={() => {
                  setTeamOpen(p => {
                    if (p === 'a') return 'b';
                    else return 'a';
                  });
                }}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View
              className={clsx(
                teamOpen === currentTeamCode ? 'flex' : 'hidden',
              )}>
              <View className="flex-row mt-2 items-center py-2 border-b border-black/30">
                <Text className="text-black mr-auto font-poppins500 text-xs">
                  Batter
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  R
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  B
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  4s
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  6s
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  S/R
                </Text>
              </View>

              {matchData.play.innings[inning].batting_order.map(
                (player, index) => {
                  return (
                    <View
                      className="flex-row items-center border-b border-black/10 py-2"
                      key={index}>
                      <View className="mr-auto">
                        <Text className="text-black mr-auto font-poppins500 text-xs">
                          {matchData.players[player].player.name}
                        </Text>
                        {matchData.players[player].score[1].batting
                          ?.dismissal !== null && (
                          <Text className="text-black mr-auto font-poppins500 text-xs">
                            {matchData.players[player].score[1].batting
                              .dismissal.msg.length > 25
                              ? matchData.players[
                                  player
                                ].score[1].batting.dismissal.msg.substring(
                                  0,
                                  25 - 3,
                                ) + '...'
                              : matchData.players[player].score[1].batting
                                  .dismissal.msg}
                          </Text>
                        )}
                      </View>
                      <Text className="text-black w-9 font-poppins700 text-xs">
                        {matchData.players[player].score[1].batting.score.runs}
                      </Text>
                      <Text className="text-black w-9 font-poppins500 text-xs">
                        {matchData.players[player].score[1].batting.score.balls}
                      </Text>
                      <Text className="text-black w-9 font-poppins500 text-xs">
                        {matchData.players[player].score[1].batting.score.fours}
                      </Text>
                      <Text className="text-black w-9 font-poppins500 text-xs">
                        {matchData.players[player].score[1].batting.score.sixes}
                      </Text>
                      <Text className="text-black w-9 font-poppins500 text-xs">
                        {
                          matchData.players[player].score[1].batting.score
                            .strike_rate
                        }
                      </Text>
                    </View>
                  );
                },
              )}
              <View className="flex-row items-center border-b border-black/10 py-2">
                <View className="mr-auto ">
                  <Text className="text-black font-poppins500 text-xs">
                    Extras
                  </Text>
                  <Text className="text-black font-poppins500 text-[10px]">
                    (nb {matchData.play.innings[inning].extra_runs.no_ball || 0}
                    , wb {matchData.play.innings[inning].extra_runs.wide || 0},
                    b {matchData.play.innings[inning].extra_runs.bye || 0}, lb{' '}
                    {matchData.play.innings[inning].extra_runs.leg_bye || 0},
                    pen {matchData.play.innings[inning].extra_runs.penalty || 0}
                    )
                  </Text>
                </View>
                <Text className="text-black w-9 font-poppins700 text-xs">
                  {matchData.play.innings[inning].extra_runs.extra}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
              </View>

              <View className="flex-row items-center border-b border-black/10 py-2">
                <View className="mr-auto ">
                  <Text className="text-black font-poppins500 text-xs">
                    Total
                  </Text>
                  <Text className="text-black font-poppins500 text-[10px]">
                    ({matchData.play.innings[inning].wickets} wickets,{' '}
                    {matchData.play.innings[inning].overs[0]}.
                    {matchData.play.innings[inning].overs[1]} overs)
                  </Text>
                </View>
                <Text className="text-black w-9 font-poppins700 text-xs">
                  {matchData.play.innings[inning].score.runs}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  {' '}
                </Text>
              </View>

              <View className="py-2">
                <Text className="text-black font-poppins500 text-xs">
                  Did not bat
                </Text>
                <Text className="text-black font-poppins500">
                  |{' '}
                  {matchData.squad[currentTeamCode].playing_xi
                    .filter(
                      player =>
                        !matchData.play.innings[inning].batting_order.includes(
                          player,
                        ),
                    )
                    .map((p, i) => `${matchData.players[p].player.name} | `)}
                </Text>
              </View>

              <View className="flex-row mt-5 items-center py-2 border-b border-black/30">
                <Text className="text-black mr-auto font-poppins500 text-xs">
                  Bowler
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  O
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  M
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  R
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  W
                </Text>
                <Text className="text-black w-9 font-poppins500 text-xs">
                  Eco
                </Text>
              </View>
              {matchData.play.innings[ops_id].bowling_order.map((player, index) => {
                return (
                  <View className="flex-row items-center border-b border-black/10 py-2" key={index}>
                    <Text className="text-black mr-auto font-poppins500 text-xs">
                      {matchData.players[player].player.name}
                    </Text>
                    <Text className="text-black w-9 font-poppins500 text-xs">
                      {
                        matchData.players[player].score[1].bowling?.score
                          .overs[0]
                      }
                      .
                      {
                        matchData.players[player].score[1].bowling?.score
                          .overs[1]
                      }
                    </Text>
                    <Text className="text-black w-9 font-poppins500 text-xs">
                      {
                        matchData.players[player].score[1].bowling?.score
                          .maiden_overs
                      }
                    </Text>
                    <Text className="text-black w-9 font-poppins500 text-xs">
                      {matchData.players[player].score[1].bowling?.score.runs}
                    </Text>
                    <Text className="text-black w-9 font-poppins700 text-xs">
                      {
                        matchData.players[player].score[1].bowling?.score
                          .wickets
                      }
                    </Text>
                    <Text className="text-black w-9 font-poppins500 text-xs">
                      {
                        matchData.players[player].score[1].bowling?.score
                          .economy
                      }
                    </Text>
                  </View>
                );
              })}

              <View className="flex-row mt-5 items-center py-2 border-b border-black/30">
                <Text className="text-black mr-auto font-poppins500 text-xs">
                  Fall of wickets
                </Text>
                <Text className="text-black w-12 font-poppins500 text-xs">
                  Score
                </Text>
                <Text className="text-black w-12 font-poppins500 text-xs">
                  Over
                </Text>
              </View>

              {matchData.play.innings[inning].batting_order.map(
                (player, index) =>
                  matchData.players[player].score[1].batting?.dismissal !==
                    null && (
                    <View className="flex-row items-center border-b border-black/10 py-2" key={index}>
                      <Text className="text-black mr-auto font-poppins500 text-xs">
                        {matchData.players[player].player.name}
                      </Text>
                      <Text className="text-black w-12 font-poppins500 text-xs">
                        {
                          matchData.players[player].score[1].batting?.dismissal
                            .team_runs
                        }
                        -
                        {
                          matchData.players[player].score[1].batting?.dismissal
                            .wicket_number
                        }
                      </Text>
                      <Text className="text-black w-12 font-poppins500 text-xs">
                        {
                          matchData.players[player].score[1].batting?.dismissal
                            .overs[0]
                        }
                        .
                        {
                          matchData.players[player].score[1].batting?.dismissal
                            .overs[1]
                        }
                      </Text>
                    </View>
                  ),
              )}

              <View className="h-10"></View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}