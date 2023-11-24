import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { gql, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootParamList } from '../../../App';
import TeamCard from '../../components/HomeScreen/TeamCard';
import TeamLogo from '../../components/TeamLogo';
import { listOfAllPools } from '../main/PoolsScreen';

const Tab = createMaterialTopTabNavigator();
type Props = NativeStackScreenProps<RootParamList, 'CompletedMatchScreen'>;

const MATCH_QUERY = gql`
  query CompletedMatch($match_key: String!) {
    match(key: $match_key) {
      key
      status
      teams {
        a {
          code
          name
        }
        b {
          code
          name
        }
      }
      winner {
        name
        code
      }
      play {
        result {
          msg
        }
        innings {
          score {
            runs
          }
          wickets
          overs
        }
      }
    }
  }
`;

const CompletedMatchScreen = ({ route }: Props) => {
  const navigation: Props['navigation'] = useNavigation();

  const { match_key } = route.params;

  const { loading, error, data } = useQuery(MATCH_QUERY, {
    variables: { match_key },
  });

  if (loading) {
    return (
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
          Loading...
        </Text>
      </View>
    );
  }
  if (error) {
    return (
      <View className="w-11/12 p-2 bg-black/10 mx-auto rounded-md mt-2">
        <Text className="text-black">
          {error.message} {error.graphQLErrors.map(e => e.message)}
        </Text>
      </View>
    );
  }

  const {
    match: {
      status,
      teams: {
        a: { code: teamAcode, name: teamAname },
        b: { code: teamBcode, name: teamBname },
      },
      winner: { name: winnerName, code: winnerCode },
      play: {
        result: { msg },
        innings,
      },
    },
  } = data;

  return (
    <SafeAreaView
      style={{
        height: '100%',
      }}>
      <View className="bg-[#1D3A4B]">
        <View className="mx-auto flex-row items-center w-11/12 h-16">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <View className="flex-row flex-1 justify-center items-center">
            <Text className="text-white uppercase text-xl font-poppins700">
              {teamAcode} vs {teamBcode}
            </Text>
          </View>
        </View>
      </View>

      <View className="py-2 w-11/12 mx-auto">
        <View className="flex-row items-center justify-between">
          <View>
            <TeamLogo name={teamAcode} bigName={teamAname} size="md" />
            <Text className="text-black font-poppins600">{teamAcode}</Text>
            <Text className="text-black font-poppins600">
              {innings[0].score.runs}/{innings[0].wickets}({innings[0].overs[0]}
              .{innings[0].overs[1]})
            </Text>
          </View>
          <View className="items-center justify-center flex-row space-x-1">
            <View className="w-2 h-2 rounded-full bg-green-600" />
            <Text className="text-green-600 text-sm font-poppins700">
              Winner Declared
            </Text>
          </View>
          <View className="items-end">
            <TeamLogo name={teamBcode} bigName={teamBname} size="md" />
            <Text className="text-black font-poppins600 text-right">
              {teamBcode}
            </Text>
            <Text className="text-black font-poppins600 text-right">
              {innings[1].score.runs}/{innings[1].wickets}({innings[1].overs[0]}
              .{innings[1].overs[1]})
            </Text>
          </View>
        </View>
      </View>

      <View className="py-1 rounded-b-md bg-slate-100">
        <Text className="text-center font-poppins500 text-xs text-black">
          {msg}
        </Text>
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
          name="Contest"
          children={() => (
            <ContestSection
              match_key={match_key}
              teamA={teamAcode}
              teamB={teamBcode}
              status={status}
            />
          )}
        />
        <Tab.Screen
          name="Teams"
          children={() => (
            <TeamsSection
              match_key={match_key}
              teamA={teamAcode}
              teamB={teamBcode}
              status={status}
            />
          )}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default CompletedMatchScreen;

const ContestSection = ({ match_key, teamA, teamB, start_at, status }) => {
  const [contestsList, setContestsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation: Props['navigation'] = useNavigation();
  const getContests = async () => {
    setRefreshing(true);
    const temp = [];
    await AsyncStorage.getItem('mobileNumber').then(mobileNumber => {
      firestore()
        .collection('Users')
        .doc(`${mobileNumber}`)
        .collection(`myContests`)
        .doc(`${match_key}`)
        .collection('pool')
        .get()
        .then(res => {
          // console.log('>>>>>',res.docs);
          res.docs.forEach(response => {
            temp.push(response.data());
          });
        })
        .then(() => {
          setContestsList(temp);
          setRefreshing(false);
        });
    });
  };

  useEffect(() => {
    getContests();
  }, []);

  return (
    <View className="flex-1">
      <FlatList
        data={contestsList}
        keyExtractor={(item, index) => {
          return index;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getContests} />
        }
        ListFooterComponent={<View style={{ width: '100%', height: 60 }} />}
        renderItem={({ item }) => {
          const entry_fee = item.entryFee;
          const poolName = item.poolName;
          return (
            <TouchableOpacity
              className="w-11/12 mx-auto mt-2 overflow-hidden border border-slate-900 rounded-xl"
              onPress={() => {
                navigation.navigate('LiveMatchPoolDetails', {
                  match_key: match_key,
                  entry_fee: +entry_fee,
                  teamA: teamA,
                  teamB: teamB,
                  name: poolName,
                  pool_prize: listOfAllPools.filter(
                    pool =>
                      pool.name === poolName && pool.entryFee === +entry_fee,
                  )[0].prizePool,
                });
              }}>
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
                    ₹{' '}
                    {
                      listOfAllPools.filter(
                        pool =>
                          pool.name === item.poolName &&
                          pool.entryFee === +item.entryFee,
                      )[0]?.prizePool
                    }
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
                    <Text className="text-black">Your Spot</Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      ---
                    </Text>
                  </View>
                  <View style={{ justifyContent: 'flex-start' }}>
                    <Text className="text-black">Spots</Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      {
                        listOfAllPools.filter(
                          pool => pool.name === item.poolName,
                        )[0].totalSpots
                      }
                    </Text>
                  </View>
                  <View style={{ justifyContent: 'flex-start' }}>
                    <Text className="text-black">Entry</Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      ₹ {item.entryFee}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const TeamsSection = ({ match_key, teamA, teamB, status }) => {
  const [refreshing, setRefreshing] = useState(false);

  const [teamsList, setTeamsList] = useState([]);

  const getTeams = async () => {
    setRefreshing(true);

    const temp = [];
    await AsyncStorage.getItem('mobileNumber').then(mobileNumber => {
      firestore()
        .collection('Users')
        .doc(`${mobileNumber}`)
        .collection(`myTeams`)
        .doc(`${match_key}`)
        .collection('team')
        .get()
        .then(res => {
          // console.log(res.docs);
          res.docs.forEach(response => {
            temp.push(response.data());
          });
        })
        .then(() => {
          setTeamsList(temp);
          setRefreshing(false);
        });
    });
  };

  useEffect(() => {
    getTeams();
  }, []);
  return (
    <View className="flex-1" style={{ paddingHorizontal: 10 }}>
      <FlatList
        data={teamsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTeams} />
        }
        keyExtractor={(item, index) => {
          return `${index}`;
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ width: '100%', height: 260 }} />}
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
                id={item.id}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
