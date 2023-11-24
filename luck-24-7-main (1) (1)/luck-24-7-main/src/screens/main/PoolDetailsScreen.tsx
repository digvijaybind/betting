import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import CryptoJS from 'crypto-js';
import base64 from 'react-native-base64'
import { ActivityIndicator, Avatar, ProgressBar } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '../../../App';
import TeamLogo from '../../components/TeamLogo';
import useGetRemaingTimeString from '../../lib/useGetRemaingTimeString';
import { numberStyle } from '../../lib/util/numberUtil';
import { useGetLeaderbaordrank } from '../../lib/getLeaderboard';
const Tab = createMaterialTopTabNavigator();
type Props = NativeStackScreenProps<RootParamList, 'PoolsDetailScreen'>;
const PoolDetailsScreen = ({ route }: Props) => {
  const navigation: Props['navigation'] = useNavigation();
  const [myTeams, setMyTeams] = useState([]);
  const {
    match_key,
    teamA,
    teamB,
    start_at,
    hasTeam,
    leaderboard,
    entryFee,
    prizePool,
    spotsLeft,
    totalSpots,
    name,
    entry_fee,
  } = route.params;
  const time = useGetRemaingTimeString(start_at);
  const payNow = (entryFee: Number) => {
    const payload = {
      "merchantId": "LUCK24UAT",
      "merchantTransactionId": "MT7850590068188104",
      "merchantUserId": "MUID123",
      "amount": entryFee * 100,
      "redirectUrl": "https://luck24seven.com/phonepeRedirect.php",
      "redirectMode": "REDIRECT",
      "callbackUrl": "https://luck24seven.com/phonepecallback.php",
      "mobileNumber": "9999999999",
      "paymentInstrument": {
        "type": "PAY_PAGE"
      }
    }

    // Convert the JSON object to a JSON string
    const jsonStr = JSON.stringify(payload);

    // Encode the JSON string as Base64
    const base64Payload = base64.encode(jsonStr);

    // Define your salt key and salt index
    const saltKey = "0b89fa1c-6607-469f-9566-1250cf2b4ab0";
    const saltIndex = "1";

    // Concatenate the Base64 payload with "/pg/v1/pay" and salt key
    const concatenatedString = base64Payload + "/pg/v1/pay" + saltKey;

    // Calculate the SHA256 hash of the concatenated string
    const hash = CryptoJS.SHA256(concatenatedString);

    // Convert the hash to a hex string
    const hashHex = hash.toString(CryptoJS.enc.Hex);

    // Append "###" and salt index to the hash
    const xVerifyHeader = hashHex + "###" + saltIndex;

    // Send your HTTP request with the X-VERIFY header
    fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'X-VERIFY': xVerifyHeader,
      },
      body: JSON.stringify({ request: base64Payload })
    })
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        if (data.success) {
          if (data.data.instrumentResponse.type == "PAY_PAGE") {
            let uri = data.data.instrumentResponse.redirectInfo.url;
            // Linking.openURL(data.data.instrumentResponse.redirectInfo.url);
            navigation.navigate('PaymentScreen', {uri})

          }
        }

      })
      .catch(error => {
        console.error(error);
      });
  }
  const getMyTeams = async () => {
    // await AsyncStorage.getItem('mobileNumber').then(res => {
    await AsyncStorage.getItem('uid').then(res => {
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
        })
        .catch(e => { });
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
      <View className="bg-white">
        <View className="mx-auto flex-row items-center h-16 w-11/12 ">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <View className="flex-row flex-1 justify-center items-center">
            <TeamLogo name={teamA} size="md" />
            <View className="justify-center items-center">
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

      <View className="py-1">
        <View className="w-11/12 mx-auto">
          <Text className="font-poppins600 mt-2 text-xs h-4 text-[#FC2B2D]">
            Prize
          </Text>
          <Text className="text-xl text-black font-poppins600 h-7">
            ₹ {numberStyle(prizePool)}
          </Text>
        </View>

        {!(totalSpots <= 4) && (
          <View className="py-2 w-11/12 mx-auto">
            <ProgressBar progress={0} color={'#FC2B2D'} className="" />
            <View className="flex-row mt-1 justify-between">
              <Text className="text-xs font-poppins500 text-[#FC2B2D]">
                {totalSpots - spotsLeft} spots left
              </Text>
              <Text className="text-xs font-poppins500 text-black">
                {totalSpots} Spots
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            payNow(entryFee)
            // hasTeam
            //   ? navigation.navigate('SelectTeamScreen', {
            //     match_key,
            //     teamA,
            //     teamB,
            //     start_at,
            //     entryFee,
            //     totalSpots,
            //     spotsLeft,
            //     name,
            //     prizePool,
            //   })
            //   : navigation.navigate('CreateTeamScreen', {
            //     match_key,
            //     teamA,
            //     teamB,
            //     start_at,
            //     entryFee,
            //     totalSpots,
            //     spotsLeft,
            //     name,
            //     prizePool,
            //   });
          }}
          className="bg-[#2ab92a] flex-row justify-center p-2 py-3 w-11/12 mx-auto rounded-md">
          <Text className="text-center text-md font-poppins700 text-white">
            JOIN ₹{entryFee}
          </Text>
        </TouchableOpacity>
      </View>

      {!(totalSpots <= 4) && (
        <View className="py-2 mt-2 bg-slate-300">
          <View className="flex-row items-center justify-between px-3">
            <View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="ios-medal-outline" size={13} color="black" />
                <Text className="mr-2 font-poppins500 text-xs text-black">
                  ₹{leaderboard[0].prize}
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
      )}

      <View className="flex-1">
        {/* <View className="justify-between py-2 border-b border-b-slate-200 bg-white px-4 flex-row">
          <Text className="text-gray-600 text-xs font-poppins500">Rank</Text>
          <Text className="text-gray-600 text-xs font-poppins500">
            Winnings
          </Text>
        </View> */}



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
              <WinningsSection leaderboard={leaderboard} />
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



        {/* <View>
          <FlatList
            data={leaderboard}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  className="border-b border-b-slate-200 justify-between py-3 px-4 flex-row">
                  <View className="flex-row gap-1 items-center">
                    {item.rankFrom === item.rankTo ? (
                      <>
                        <MaterialCommunityIcons
                          name="crown-outline"
                          size={24}
                          color={
                            index === 0 // Use index here to determine color
                              ? '#eb6200'
                              : 1 === 1
                                ? '#bebb00'
                                : '#0072be'
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
                        <Text className="font-poppins600 text-md text-black">
                          -
                        </Text>
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
              );
            }}
          />
        </View> */}


        {/* <ScrollView>
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
                    <Text className="font-poppins600 text-md text-black">
                      -
                    </Text>
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
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default PoolDetailsScreen;


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
