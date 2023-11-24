import { AntDesign } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
import TeamLogo from '../../components/TeamLogo';
import useGetRemaingTimeString from '../../lib/useGetRemaingTimeString';

type Props = NativeStackScreenProps<RootParamList, 'TeamsScreen'>;
const TeamsScreen = ({ route }: Props) => {
  const { navigate }: Props['navigation'] = useNavigation();

  const { match_key, teamA, teamB, start_at } = route.params;
  const time = useGetRemaingTimeString(start_at);

  const [myTeams, setMyTeams] = useState<TeamCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log('all TeamsScreen screen');

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
    <SafeAreaView
      style={{
        height: '100%',
      }}>
      {/* Navbar */}
      <View className="bg-[#FC2B2D] py-2">
        <View className="mx-auto flex-row items-center w-11/12 ">
          <TouchableOpacity
            onPress={() =>
              navigate('PoolsScreen', {
                match_key,
                teamA,
                teamB,
                start_at,
              })
            }>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg font-poppins600">
              All Teams
            </Text>
            <Text className="text-xs text-white font-poppins600">{time}</Text>
          </View>
        </View>

        <View className="flex-row justify-center pt-2 items-center">
          <TeamLogo size="md" name={teamA.code} />
          <Text className="text-center mx-2 text-lg text-white  font-poppins700">
            VS
          </Text>
          <TeamLogo size="md" name={teamB.code} />
        </View>
      </View>

      <View className="mt-2 w-11/12 mx-auto">
        <FlatList
          data={myTeams}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getMyTeams} />
          }
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ width: '100%', height: 260 }} />}
          renderItem={({ item }) => {
            console.log(item.id);

            return (
              <View className="mt-2">
                <TeamCard {...item} />
              </View>
            );
          }}
        />
      </View>

      <BlurView
        intensity={100}
        tint="light"
        className="absolute w-full bottom-0">
        <View
          style={{
            ...(Platform.OS === 'android'
              ? {
                  backgroundColor: '#fff',
                }
              : {}),
          }}
          className="w-11/12 mx-auto flex-row justify-center py-1 space-x-2 items-center">
          <Button
            onPress={() =>
              navigate('CreateTeamScreen', {
                match_key,
                teamA,
                teamB,
                start_at,
              })
            }
            className="bg-[#1D3A4B] py-1 px-10 rounded-md">
            <Text className="text-center text-md font-poppins700 text-white">
              Create new Team
            </Text>
          </Button>
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

export default TeamsScreen;
