import { AntDesign, Entypo } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { BlurView } from 'expo-blur';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, TouchableRipple } from 'react-native-paper';
import { RootParamList, ToastContext } from '../../../App';
import TeamCard, { TeamCardProps } from '../../components/HomeScreen/TeamCard';
import TeamLogo from '../../components/TeamLogo';
import useGetRemaingTimeString from '../../lib/useGetRemaingTimeString';

type Props = NativeStackScreenProps<RootParamList, 'SelectTeamScreen'>;
const SelectTeam = ({ route }: Props) => {
  const { goBack, navigate }: Props['navigation'] = useNavigation();
  const {
    match_key,
    teamA,
    teamB,
    start_at,
    entryFee,
    totalSpots,
    spotsLeft,
    name,
    prizePool,
  } = route.params;

  const [myTeams, setMyTeams] = useState<TeamCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const time = useGetRemaingTimeString(start_at);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [addMoneyModal, setAddMoneyModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [walletAmount, setWalletAmount] = useState('');
  const [docId, setDocId] = useState('');
  const [data, setData] = useState([]);
  const [paying, setPaying] = useState(false);
  const { setVisible } = useContext(ToastContext);

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

  const createPools = async () => {
    const date = new Date();
    const timeNow = date.getTime();
    await firestore()
      .collection('Users')
      .doc(`${mobileNumber}`)
      .collection('myTeams')
      .doc(`${match_key}`)
      .collection('team')
      .doc(`${selectedTeam}`)
      .get()
      .then(res => {
        const data = res.data();
        // console.log(data);
        return data;
      })
      .then(data => {
        firestore()
          .collection('pools')
          .doc(`${name}`)
          .collection('matchName')
          .doc(`${match_key}`)
          .collection('entryFee')
          .doc(`${entryFee}`)
          .collection('pool')
          .get()
          .then(res => {
            const empty = res.empty;
            // console.log('>>>', res.size);
            const size = res.size;

            if (empty) {
              setDocId(size + 1);
              console.log('>>>>>>>> Empty', size + 1);
              firestore()
                .collection('pools')
                .doc(`${name}`)
                .collection('matchName')
                .doc(`${match_key}`)
                .set({ id: `${match_key}` });
              firestore()
                .collection('pools')
                .doc(`${name}`)
                .collection('matchName')
                .doc(`${match_key}`)
                .collection('entryFee')
                .doc(`${entryFee}`)
                .set({ id: `${entryFee}` });
              firestore()
                .collection('pools')
                .doc(`${name}`)
                .collection('matchName')
                .doc(`${match_key}`)
                .collection('entryFee')
                .doc(`${entryFee}`)
                .collection('pool')
                .doc(`${Number(size) + 1}`)
                .set({
                  user: [{ mobileNumber: `${mobileNumber}`, DATA: data }],
                  userCount: 1,
                  id: `${Number(size) + 1}`,
                })
                .then(res => console.log('ok'))
                .catch(e => console.log('error1 ', e));
            }
            if (!empty) {
              firestore()
                .collection('pools')
                .doc(`${name}`)
                .collection('matchName')
                .doc(`${match_key}`)
                .collection('entryFee')
                .doc(`${entryFee}`)
                .collection('pool')
                .where('userCount', '<', totalSpots)
                .get()
                .then(res => {
                  if (!res.empty) {
                    res.docs.forEach(res => {
                      const id = res.data().id;
                      setDocId(res.data().id);
                      console.log('>>>>>>>', docId);
                      firestore()
                        .collection('pools')
                        .doc(`${name}`)
                        .collection('matchName')
                        .doc(`${match_key}`)
                        .collection('entryFee')
                        .doc(`${entryFee}`)
                        .collection('pool')
                        .doc(`${id}`)
                        .update({
                          user: firestore.FieldValue.arrayUnion({
                            DATA: data,
                            mobileNumber: mobileNumber,
                          }),
                          userCount: Number(res.data().userCount) + 1,
                          id: id,
                        });
                    });
                  }
                  if (res.empty) {
                    setDocId(`${Number(size) + 1}`);
                    firestore()
                      .collection('pools')
                      .doc(`${name}`)
                      .collection('matchName')
                      .doc(`${match_key}`)
                      .set({ id: `${match_key}` });
                    firestore()
                      .collection('pools')
                      .doc(`${name}`)
                      .collection('matchName')
                      .doc(`${match_key}`)
                      .collection('entryFee')
                      .doc(`${entryFee}`)
                      .set({ id: `${entryFee}` });
                    firestore()
                      .collection('pools')
                      .doc(`${name}`)
                      .collection('matchName')
                      .doc(`${match_key}`)
                      .collection('entryFee')
                      .doc(`${entryFee}`)
                      .collection('pool')
                      .doc(`${Number(size) + 1}`)
                      .set({
                        user: [{ mobileNumber: `${mobileNumber}`, data: data }],
                        userCount: 1,
                        id: `${Number(size) + 1}`,
                      })
                      .then(res => console.log('ok'))
                      .catch(e => console.log('error2 ', e));
                  }
                });
            }

            setVisible('Contest is joined successfully.');
          });
      });
  };

  useEffect(() => {
    console.log(docId);

    if (docId) {
      Alert.alert('Pool Joined.', 'Create a new team or Join other contests.', [
        {
          text: 'ok',
          onPress: () => {
            firestore()
              .collection('Users')
              .doc(`${mobileNumber}`)
              .collection('myContests')
              .doc(`${match_key}`)
              .set({ id: `${match_key}` });

            firestore()
              .collection('Users')
              .doc(`${mobileNumber}`)
              .collection('myContests')
              .doc(`${match_key}`)
              .collection('pool')
              .doc(`${name}`)
              .set({
                entryFee: `${entryFee}`,
                poolId: docId,
                poolName: `${name}`,
                totalSpots: `${totalSpots}`,
                start_at: `${start_at}`,
                teamA: `${teamA}`,
                teamB: `${teamB}`,
                match_key: `${match_key}`,
                players: data,
              })
              .then(() => {
                setDocId('');
                navigate('PoolsScreen', {
                  match_key,
                  teamA,
                  teamB,
                  start_at,
                });
              });
          },
        },
      ]);
    }
  }, [docId]);

  const deductAmount = async walletAmount => {
    const newAmount = Number(walletAmount) - Number(entryFee);
    console.log('mobileNumber', mobileNumber);

    await firestore()
      .collection('Users')
      .doc(mobileNumber)
      .update({
        walletAmount: newAmount,
      })
      .then(() => {
        createPools();
      })
      .catch(e => console.log('>>>>', e));
  };

  const payAndJoin = async () => {
    setPaying(true);
    await AsyncStorage.getItem('mobileNumber').then(res => {
      setMobileNumber(res);
      firestore()
        .collection('Users')
        .doc(res)
        .get()
        .then(res => {
          const data = res.data();
          console.log(data.walletAmount);
          if (data.walletAmount >= entryFee) {
            // console.log('you can join');
            deductAmount(data.walletAmount);
          }
          if (data.walletAmount < entryFee) {
            Alert.alert(
              `NOT ENOUGH MONEY!`,
              `Go to wallet Section and money to wallet.`,
              [
                {
                  text: 'add money',
                  onPress: () => {
                    navigate('WalletStack', { openModal: true });
                  },
                },
                {
                  text: 'NOT now',
                  onPress: () => {
                    null;
                  },
                },
              ],
            );
          }
        });
    });
    setPaying(false);
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
      <View className="bg-[#FC2B2D] py-3">
        <View className="mx-auto flex-row items-center w-11/12 ">
          <TouchableOpacity
            onPress={() =>
              navigate('PoolsScreen', {
                match_key,
                start_at,
                teamA,
                teamB,
              })
            }>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg font-poppins600">
              Select Teams
            </Text>
            <Text className="text-xs text-white font-poppins600">{time}</Text>
          </View>
        </View>

        <View className="flex-row justify-center pt-2 items-center">
          <TeamLogo size="md" name={teamA} />
          <Text className="text-center mx-2 text-lg text-white  font-poppins700">
            VS
          </Text>
          <TeamLogo size="md" name={teamB} />
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
            return (
              <SelectTeamCard
                {...item}
                match_key={match_key}
                isSeleted={selectedTeam}
                setIsSelected={setSelectedTeam}
                start_at={start_at}
              />
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
                teamA: teamA,
                teamB: teamB,
                start_at,
              })
            }
            className="bg-[#1D3A4B] py-1 px-8 rounded-md">
            <Text className="text-center text-md font-poppins700 text-white">
              Create new Team
            </Text>
          </Button>
          {selectedTeam && (
            <Button
              onPress={() => {
                payAndJoin();
              }}
              disabled={paying}
              loading={paying}
              className="bg-[#1D3A4B] py-1 px-8 rounded-md">
              <Text className="text-center text-md font-poppins700 text-white">
                Pay {entryFee}
              </Text>
            </Button>
          )}
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

export default SelectTeam;

type SelectTeamCardProps = TeamCardProps & {
  isSeleted: string | null;
  setIsSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

const SelectTeamCard = (props: SelectTeamCardProps) => {
  return (
    <TouchableRipple
      className={clsx('mt-1 p-1')}
      onPress={() => props.setIsSelected(props.id)}>
      <View className="flex-row items-center">
        {props.isSeleted === props.id ? (
          <AntDesign name="checkcircleo" size={17} color="green" />
        ) : (
          <Entypo name="circle" size={17} color="black" />
        )}
        <TeamCard {...props} type="edit" as="View" />
      </View>
    </TouchableRipple>
  );
};
