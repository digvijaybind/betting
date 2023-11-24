import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { RootParamList } from '../../../App';
import TeamCard, { TeamCardProps } from '../../components/HomeScreen/TeamCard';
import PoolCard, { BasicPoolType } from '../../components/PoolsScreen/PoolCard';
import TeamLogo from '../../components/TeamLogo';
import useGetRemaingTimeString from '../../lib/useGetRemaingTimeString';
export const POOL_PRIZE = [100, 200, 500, 1000, 2000, 5000, 10000] as const;
export type POOL_PRIZE_TYPE = (typeof POOL_PRIZE)[number];

const PoolTypeArray = ['all', 1, 2, 3] as const;
const TabTypeArray = ['contest', 'teams', 'mycontest'] as const;
type Props = NativeStackScreenProps<RootParamList, 'PoolsScreen'>;

const PoolsScreen = ({ route }: Props) => {
  const navigation: Props['navigation'] = useNavigation();
  const { teamA, teamB, match_key, start_at } = route.params;

  const [selectedTab, setSelectedTab] =
    useState<(typeof TabTypeArray)[number]>('contest');

  const [selectedPoolType, setSelectedPoolType] =
    useState<(typeof PoolTypeArray)[number]>('all');

  const [myTeams, setMyTeams] = useState<TeamCardProps[]>([]);
  const [myContests, setMyContests] = useState<TeamCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const time = useGetRemaingTimeString(start_at);

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
          // console.log(res.docs);
          const docs = res.docs;

          docs.forEach(teams => {
            temp.push(teams.data());
          });
        })
        .then(() => {
          const sorted = [...temp].sort((a, b) => b.createdOn - a.createdOn);
          setMyTeams(sorted);
          setRefreshing(false);
          // console.log('sorted', JSON.stringify(sorted));
        })
        .catch(e => {
          setRefreshing(false);
          console.log(e);
        });
    });
  };

  const getToken = async () => {
    await AsyncStorage.getItem('token').then(token => {
      if (token) console.log('got token', token);
      else console.log('no token');
    });
  };

  const getMyContests = async () => {
    setRefreshing(true);

    // await AsyncStorage.getItem('mobileNumber').then(res => {
    await AsyncStorage.getItem('uid').then(res => {
      const temp = [];
      firestore()
        .collection('Users')
        .doc(res)
        .collection('myContests')
        .doc(match_key)
        .collection('pool')
        .get()
        .then(res => {
          console.log(res.docs);
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
    getToken();
    getMyTeams();
    getMyContests();
  }, []);

  useEffect(() => {
    getMyTeams();
    getMyContests();
  }, [navigation]);

  const basic_pool = {
    teamA,
    teamB,
    match_key,
    hasTeam: myTeams.length > 0,
    start_at,
  };

  // console.log(teamA, teamB);

  return (
    <SafeAreaView
      style={{
        position: 'relative',
      }}>
      {/* Navbar */}
      <View className="bg-white">
        <View className="mx-auto flex-row items-center h-16 w-11/12 ">
          <TouchableOpacity onPress={() => navigation.goBack()} style={{width:50,height:50}}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <View className="flex-row flex-1 justify-center items-center">
            <TeamLogo name={teamA} size="md" />
            <View className="justify-center items-center px-2">
              <Text className="text-black uppercase text-xl font-poppins700">
                vs
              </Text>
              <Text className="text-xs text-black font-poppins600 text-center">
                {time}
              </Text>
            </View>
            <TeamLogo name={teamB} size="md" />
          </View>
          {/* <Ionicons name="ios-wallet-outline" size={20} color="black" /> */}
        </View>
      </View>

      {/* Contest and My teams tab */}
      <View className="justify-center items-center">
        <View className="w-11/12 flex-row items-center py-2 justify-center space-x-2">
          <TouchableOpacity
            disabled={selectedTab === 'contest'}
            onPress={() => {
              setSelectedTab('contest');
            }}
            className={clsx(
              'px-4 py-2 rounded-md',
              selectedTab === 'contest' ? 'bg-[#FC2B2D]' : 'bg-gray-300',
            )}>
            <Text
              className={clsx(
                'font-poppins500 text-sm',
                selectedTab === 'contest' ? 'text-white' : 'text-black',
              )}>
              Contest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('teams')}
            disabled={selectedTab === 'teams'}
            className={clsx(
              'px-4 py-2 rounded-md',
              selectedTab === 'teams' ? 'bg-[#FC2B2D]' : 'bg-gray-300',
            )}>
            <Text
              className={clsx(
                'font-poppins500 text-sm',
                selectedTab === 'teams' ? 'text-white' : 'text-black',
              )}>
              My Teams ({myTeams.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTab('mycontest')}
            disabled={selectedTab === 'mycontest'}
            className={clsx(
              'px-4 py-2 rounded-md',
              selectedTab === 'mycontest' ? 'bg-[#FC2B2D]' : 'bg-gray-300',
            )}>
            <Text
              className={clsx(
                'font-poppins500 text-sm',
                selectedTab === 'mycontest' ? 'text-white' : 'text-black',
              )}>
              My Contest ({myContests.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contest Tab View */}
      {selectedTab === 'contest' && (
        <View className="h-full">
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            {PoolTypeArray.map(poolType => (
              <TouchableOpacity
                key={poolType}
                onPress={() => setSelectedPoolType(poolType)}
                className="px-1 rounded-md">
                <Text
                  className={clsx(
                    'font-poppins700 text-center',
                    selectedPoolType === poolType
                      ? 'text-[#FC2B2D]'
                      : 'text-black',
                  )}>
                  {poolType === 'all' ? 'All Pools' : `1 V ${poolType}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedPoolType === 'all' && (
            <View
              className="w-11/12 mx-auto mt-2"
              style={{
                paddingBottom: 100,
              }}>
              <Text className="text-md h-5 font-poppins600 text-black">
                All Pools
              </Text>
              <View>
                <FlatList
                  data={listOfAllPools}
                  ListFooterComponent={() => {
                    return <View className="h-32"></View>;
                  }}
                  keyExtractor={(item, index) => {
                    return `${index}`;
                  }}
                  renderItem={({ item }) => {
                    return <PoolCard {...item} {...basic_pool} />;
                  }}
                />
              </View>
              <View className="h-32"></View>
            </View>
          )}

          {selectedPoolType !== 'all' && (
            <View
              className="w-11/12 mx-auto mt-2"
              style={{
                paddingBottom: 100,
              }}>
              <Text className="text-md h-5 font-poppins600 text-black">
                1V{selectedPoolType} Pools
              </Text>
              {creatObjectForMatches(
                1,
                `1V${selectedPoolType} Pool`,
                selectedPoolType + 1,
                vsMatchs[selectedPoolType],
              ).map(pool => (
                <PoolCard key={pool.id} {...pool} {...basic_pool} />
              ))}
              <View className="h-32"></View>
            </View>
          )}
        </View>
      )}

      {/* Teams Tab View */}
      {selectedTab === 'teams' && (
        <View className="flex-grow h-full">
          <View
            className="w-11/12 mx-auto mt-2"
            style={{
              marginBottom: Platform.OS !== 'web' ? 90 : 0,
              paddingBottom: 30,
            }}>
            <Text className="text-md font-poppins600 text-black">
              All Teams
            </Text>
            <FlatList
              data={myTeams}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={getMyTeams}
                />
              }
              keyExtractor={(item, index) =>
                `${item.match_key}-${item.id}-${index}`
              }
              showsVerticalScrollIndicator={false}
              ListFooterComponent={
                <View style={{ width: '100%', height: 260 }} />
              }
              renderItem={({ item }) => {
                return (
                  <View className="mt-2">
                    <TeamCard
                      caption={item.caption}
                      viceCaption={item.viceCaption}
                      players={item.players}
                      match_key={match_key}
                      teamA={teamA}
                      teamB={teamB}
                      start_at={start_at}
                      id={item.id}
                      type="edit"
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}

      {/* Teams Tab View */}
      {selectedTab === 'mycontest' && (
        <View className="flex-grow h-full">
          <FlatList
            data={myContests}
            keyExtractor={item => {
              return item.id;
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getMyContests}
              />
            }
            renderItem={({ item }) => {
              const pool = item.poolName;
              const entryFee = item.entryFee;

              return (
                <View
                  style={{
                    paddingBottom: 30,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 10,
                    margin: 10,
                    borderWidth: 0.3,
                  }}>
                  <Text className="text-md font-poppins600 text-black">
                    {pool}
                  </Text>
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
                      <Text>Prize Pool</Text>
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
                      <Text>Spots</Text>
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
                      <Text>Entry</Text>
                      <Text style={{ color: '#000', fontWeight: '600' }}>
                        {`₹ ${item.entryFee}`}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}

      <BlurView
        intensity={100}
        tint="light"
        className="absolute w-full bottom-28">
        <View className="w-full py-2 items-center">
          <Button
            onPress={() => {
              // console.log(teamA, teamB);
              navigation.navigate('CreateTeamScreen', {
                match_key,
                teamA,
                teamB,
                start_at,
              });
            }}
            className="bg-[#1D3A4B] py-1 px-10 rounded-md">
            <Text className="text-center text-md font-poppins700 text-white">
              Create Team
            </Text>
          </Button>
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

export default PoolsScreen;

const vsMatchs: {
  [key: string]: [number, number][];
} = {
  1: [
    [100, 165],
    [200, 330],
    [500, 825],
    [1000, 1650],
    [2000, 3300],
    // [5000, 8500],
    // [10000, 17000],
  ],
  2: [
    [100, 250],
    [200, 500],
    [500, 1200],
    [1000, 2500],
    [2000, 5000],
    // [5000, 12500],
    // [10000, 25000],
  ],
  3: [
    [100, 300],
    [200, 600],
    [500, 1500],
    [1000, 3000],
    [2000, 6000],
    // [5000, 15000],
    // [10000, 30000],
  ],
};

const creatObjectForMatches = (
  indexStart: number,
  name: string,
  spots: number,
  winning: [number, number][],
): CompletePoolType[] => {
  return winning.map((wins, i) => {
    return {
      id: `${indexStart + i}`,
      name: name,
      entryFee: wins[0],
      prizePool: wins[1],
      totalSpots: spots,
      spotsLeft: 0,
      leaderboard: [
        {
          id: 1,
          rankFrom: 1,
          rankTo: 1,
          prize: wins[1],
        },
      ],
    };
  });
};

type CompletePoolType = BasicPoolType;

export const listOfAllPools: CompletePoolType[] = [
  {
    id: '1',
    name: 'Mega',
    entryFee: 49,
    prizePool: 3_50_000,
    totalSpots: 10000,
    spotsLeft: 0,
    leaderboard: [
      {
        id: 1,
        rankFrom: 1,
        rankTo: 1,
        prize: 51000,
      },
      {
        id: 2,
        rankFrom: 2,
        rankTo: 2,
        prize: 5100,
      },
      {
        id: 3,
        rankFrom: 3,
        rankTo: 4, //+1
        prize: 1100,
      },
      {
        id: 4,
        rankFrom: 5,
        rankTo: 15, //+2
        prize: 500,
      },
      {
        id: 5,
        rankFrom: 16,
        rankTo: 36, // +20
        prize: 400,
      },
      {
        id: 6,
        rankFrom: 37,
        rankTo: 62, // +25
        prize: 300,
      },
      {
        id: 7,
        rankFrom: 63,
        rankTo: 93, // +35
        prize: 200,
      },
      {
        id: 8,
        rankFrom: 94,
        rankTo: 144, // +50
        prize: 100,
      },
      {
        id: 9,
        rankFrom: 145,
        rankTo: 245, // +100
        prize: 90,
      },
      {
        id: 10,
        rankFrom: 246,
        rankTo: 446, // +200
        prize: 80,
      },
      {
        id: 11,
        rankFrom: 447,
        rankTo: 747, // +300
        prize: 70,
      },
      {
        id: 12,
        rankFrom: 748,
        rankTo: 1148, // +400
        prize: 60,
      },
      {
        id: 13,
        rankFrom: 1149,
        rankTo: 2149, // +1000
        prize: 49,
      },
      {
        id: 14,
        rankFrom: 2150,
        rankTo: 10000, // +17935
        prize: 24,
      },
    ],
  },
  {
    id: '2',
    name: 'Premium',
    entryFee: 25,
    prizePool: 3_50_000,
    totalSpots: 20_000,
    spotsLeft: 0,
    leaderboard: [
      {
        id: 1,
        rankFrom: 1,
        rankTo: 1,
        prize: 31000,
      },
      {
        id: 2,
        rankFrom: 2,
        rankTo: 2,
        prize: 21000,
      },
      {
        id: 3,
        rankFrom: 3,
        rankTo: 4,
        prize: 2500,
      },
      {
        id: 4,
        rankFrom: 5,
        rankTo: 15, //+10
        prize: 250,
      },
      {
        id: 5,
        rankFrom: 16,
        rankTo: 36, // +20
        prize: 200,
      },
      {
        id: 6,
        rankFrom: 37,
        rankTo: 62, // +25
        prize: 100,
      },
      {
        id: 7,
        rankFrom: 63,
        rankTo: 93, // +35
        prize: 50,
      },
      {
        id: 8,
        rankFrom: 94,
        rankTo: 144, // +50
        prize: 45,
      },
      {
        id: 9,
        rankFrom: 145,
        rankTo: 245, // +100
        prize: 25,
      },
      {
        id: 10,
        rankFrom: 246,
        rankTo: 446, // +200
        prize: 35,
      },
      {
        id: 11,
        rankFrom: 447,
        rankTo: 747, // +300
        prize: 30,
      },
      {
        id: 12,
        rankFrom: 748,
        rankTo: 1148, // +400
        prize: 30,
      },
      {
        id: 13,
        rankFrom: 1149,
        rankTo: 2149, // +1000
        prize: 25,
      },
      {
        id: 14,
        rankFrom: 2150,
        rankTo: 20000, // +17935
        prize: 12,
      },
    ],
  },
  {
    id: '3',
    name: 'Chota Packet',
    entryFee: 12,
    prizePool: 2_10_000,
    totalSpots: 25000,
    spotsLeft: 0,
    leaderboard: [
      {
        id: 1,
        rankFrom: 1,
        rankTo: 1,
        prize: 11000,
      },
      {
        id: 2,
        rankFrom: 2,
        rankTo: 2,
        prize: 5000,
      },
      {
        id: 3,
        rankFrom: 3,
        rankTo: 4,
        prize: 1100,
      },
      {
        id: 4,
        rankFrom: 5,
        rankTo: 15,
        prize: 150,
      },
      {
        id: 5,
        rankFrom: 16,
        rankTo: 56,
        prize: 90,
      },
      {
        id: 6,
        rankFrom: 57,
        rankTo: 107,
        prize: 80,
      },
      {
        id: 7,
        rankFrom: 108,
        rankTo: 168,
        prize: 70,
      },
      {
        id: 8,
        rankFrom: 169,
        rankTo: 329,
        prize: 60,
      },
      {
        id: 9,
        rankFrom: 330,
        rankTo: 340,
        prize: 50,
      },
      {
        id: 10,
        rankFrom: 341,
        rankTo: 641,
        prize: 40,
      },
      {
        id: 11,
        rankFrom: 642,
        rankTo: 442,
        prize: 30,
      },
      {
        id: 12,
        rankFrom: 443,
        rankTo: 943,
        prize: 20,
      },
      {
        id: 13,
        rankFrom: 944,
        rankTo: 3944,
        prize: 10,
      },
      {
        id: 14,
        rankFrom: 3945,
        rankTo: 25000,
        prize: 5,
      },
    ],
  },
  ...creatObjectForMatches(4, '1v1', 2, vsMatchs[1]),
  ...creatObjectForMatches(4 + vsMatchs[1].length, '1v2', 3, vsMatchs[2]),
  ...creatObjectForMatches(
    4 + vsMatchs[1].length + vsMatchs[2].length,
    '1v3',
    3,
    vsMatchs[3],
  ),
];
