import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import { RootParamList } from '../../../App';
import TeamLogo from '../../components/TeamLogo';
import { getTimeRemaing } from '../../lib/util/timeUtil';

import { gql, useQuery } from '@apollo/client';
import { getTeamTitle } from '../../lib/helper';

type Props = NativeStackScreenProps<RootParamList, 'MyMatchesStack'>;

const MyMatchScreen = () => {
  const { navigate, dispatch }: Props['navigation'] = useNavigation();
  const [match_key_list, setMatch_key_list] = useState<string[]>([]);
  const [matchesData, setMatchesData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getMyMateches = async () => {
    setRefreshing(true);
    await AsyncStorage.getItem('mobileNumber').then(mobileNumber => {
      const temp = [];
      firestore()
        .collection('Users')
        .doc(`${mobileNumber}`)
        .collection('myContests')
        .get()
        .then(res => {
          const docs = res.docs;
          docs.forEach(response => {
            const id = response.data().id;
            firestore()
              .collection('Users')
              .doc(`${mobileNumber}`)
              .collection('myContests')
              .doc(`${response.data().id}`)
              .collection('pool')
              .get()
              .then(res => {
                // console.log(res.docs);
                res.docs.forEach(response => {
                  temp.push(response.data());
                });
              })
              .then(() => {
                setMatchesData([...new Set(temp.map(t => t.match_key))]);
                setRefreshing(false);
              });
          });
        });
    });
  };

  const getStatus = timeStamp => {
    console.log(timeStamp);
    const date = new Date(timeStamp * 1000);
    const currentDate = new Date();
    // get the started, completed, not-started
    if (date < currentDate) {
      return 'completed';
    }
    if (date > currentDate) {
      return 'not-started';
    }
    return 'started';
  };

  useEffect(() => {
    getMyMateches();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigate('HomeScreen');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigate]);

  return (
    <SafeAreaView>
      <Appbar.Header mode="small" statusBarHeight={0} className="">
        <Appbar.Content
          title={
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="menu" size={34} color="black" />
              </TouchableOpacity>
              <Text className="flex-1 ml-2 text-center text-lg font-poppins600 text-black">
                My Matches
              </Text>
              <Appbar.Action
                icon="bell-badge-outline"
                color="#FC2B2D"
                size={25}
                onPress={() => navigate('NotificationScreen')}
              />
            </View>
          }
        />
      </Appbar.Header>

      <View className="h-full">
        <FlatList
          style={{ width: '100%' }}
          data={matchesData}
          keyExtractor={(item, index) => {
            return `${index}`;
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => getMyMateches()}
            />
          }
          renderItem={({ item }) => {
            return <MyMatchCard match_key={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyMatchScreen;

export const MATCH_QUERY = gql`
  query MatchCompltedData($match_key: String!) {
    match(key: $match_key) {
      key
      startAt
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
      tournament {
        name
      }
      winner {
        name
        code
      }
    }
  }
`;

const MyMatchCard = ({ match_key }: { match_key: string }) => {
  const nav: Props['navigation'] = useNavigation();

  const { loading, error, data } = useQuery(MATCH_QUERY, {
    variables: { match_key },
  });

  if (loading) {
    return (
      <View className="w-11/12 p-2  border-2 border-slate-300 bg-slate-200  mx-auto rounded-md mt-2">
        <Image
          source={require('../../../assets/images/logo.png')}
          className="mx-auto opacity-25"
          style={{
            width: 100,
            height: 100 * (162 / 312),
          }}
        />
        <Text className="text-black/30 font-poppins600 text-center">
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
  try {
    var {
      match: {
        startAt,
        status,
        teams: {
          a: { code: teamAcode, name: teamAname },
          b: { code: teamBcode, name: teamBname },
        },
        tournament: { name: tournament_name },
        winner: { name: winnerName, code: winnerCode },
      },
    } = data;
  } catch (error) {
    console.log(error);
    
  }

  const time = getTimeRemaing(startAt);

  return (
    <TouchableOpacity
      onPress={() => {
        if (status === 'started') {
          nav.navigate('LiveMatchScreen', {
            match_key,
            teamA: teamAcode,
            teamB: teamBcode,
            start_at: startAt,
          });
        }

        if (status === 'completed') {
          nav.navigate('CompletedMatchScreen', {
            match_key,
            teamA: teamAcode,
            teamB: teamBcode,
            start_at: startAt,
            status,
          });
        }

        if (status === 'not-started') {
          nav.navigate('PoolsScreen', {
            match_key,
            teamA: teamAcode,
            teamB: teamBcode,
            start_at: startAt,
          });
        }
      }}
      className="mt-2 w-11/12 mx-auto overflow-hidden border-2 border-slate-300 bg-slate-200 rounded-xl">
      <View className="flex-row items-center justify-center pb-2 pt-2 px-3 bg-slate-400/40">
        <Text className="font-poppins600 text-black text-xs text-center">
          {tournament_name} - {getTeamTitle(teamAcode, teamBcode)}
        </Text>
      </View>

      <View className="flex-row p-4 px-3">
        <View className="flex-row flex-1 justify-between">
          <View className="items-center justify-center block">
            <TeamLogo name={teamAcode} bigName={teamAname} />
          </View>
          <View className="items-center px-2 justify-center">
            <Text className="font-poppins700 text-sm text-black">VS</Text>
            <Text
              className="font-poppins700 text-xs text-green-500"
              style={{ textAlign: 'center' }}>
              {winnerName}
            </Text>
            <Text
              style={{ textAlign: 'center' }}
              className={clsx(
                'font-poppins600 text-md text-center',
                status === 'started' ? 'text-[#f00]' : 'text-black',
              )}>
              {status === 'started' && 'Live'}
              {status === 'completed' && 'Completed'}
              {status === 'notStarted' && time}
            </Text>
          </View>
          <View className="items-center justify-center block">
            <TeamLogo name={teamBcode} bigName={teamBname} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
