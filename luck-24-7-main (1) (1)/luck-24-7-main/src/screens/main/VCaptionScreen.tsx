import { AntDesign } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { BlurView } from 'expo-blur';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import * as React from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Modal, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { RootParamList, ToastContext } from '../../../App';
import PlayerImage from '../../components/PlayerImage';
import TeamLogo from '../../components/TeamLogo';
import { SelectPlayerType } from './CreateTeamScreen';

type Props = NativeStackScreenProps<RootParamList, 'VCaptionScreen'>;

const VCaptionScreen = ({ route }: Props) => {
  const { goBack, navigate }: Props['navigation'] = useNavigation();

  const {
    match_key,
    selectedPlayer,
    dataFetched,
    teamA,
    teamB,
    start_at,
    caption: getCap,
    viceCaption: getViceCap,
    type,
    id,
    entryFee,
    totalSpots,
    spotsLeft,
    name,
  } = route.params;

  const { setVisible } = React.useContext(ToastContext);

  const [caption, setCaption] = React.useState<SelectPlayerType | null>(
    getCap || null,
  );
  const [viceCaption, setViceCaption] = React.useState<SelectPlayerType | null>(
    getViceCap || null,
  );
  const [loading, setLoading] = React.useState(false);

  // ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = React.useMemo(() => ['15%', '38%'], []);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [selectedTeam, setSelectedTeam] = React.useState('');
  // console.log('caption screen', id);

  const handleContinue = () => {
    if (!caption || !viceCaption) {
      Alert.alert('Select Caption and Vice Caption');
      return;
    }
    setLoading(true);
    if (type === 'edit') {
      console.log('edited', id);
      updateTeamInDatabase();
    } else savedTeamInDatabase();
    setLoading(false);
  };
  const [amountToAdd, setAmountToAdd] = React.useState('');
  const [addMoneyModal, setAddMoneyModal] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [walletAmount, setWalletAmount] = React.useState('');
  const [docId, setDocId] = React.useState('');
  const [data, setData] = React.useState([]);
  const [paying, setPaying] = React.useState(false);

  const updateTeamInDatabase = async () => {
    await AsyncStorage.getItem('mobileNumber')
      .then(res => {
        firestore()
          .collection('Users')
          .doc(`${res}`)
          .collection('myTeams')
          .doc(`${match_key}`)
          .collection('team')
          .doc(`${id}`)
          .update({
            players: selectedPlayer,
            caption,
            viceCaption,
            teamA,
            teamB,
            // createdOn: `${timeNow}`,
            id: `${id}`,
            match_key,
          })
          .then(() => {
            console.log('work done');
            navigate('TeamsScreen', {
              match_key,
              dataFetched,
              teamA: teamA,
              teamB: teamB,
              start_at: start_at,
              selectedPlayer: selectedPlayer,
            });
          })
          .catch(e => {
            console.log('internal ', e);
          });
      })
      .catch(e => {
        console.log('external ', e);
      });
  };

  const savedTeamInDatabase = async () => {
    const time = new Date();
    const timeNow = time.getTime();
    const matchId = id ? id : timeNow;
    setSelectedTeam(timeNow);

    console.log(timeNow);

    // await AsyncStorage.getItem('mobileNumber').then(res => {
      await AsyncStorage.getItem('uid').then(res => {
      firestore()
        .collection('Users')
        .doc(`${res}`)
        .collection('myTeams')
        .doc(match_key)
        .collection('team')
        .doc(`${timeNow}`)
        .set({
          players: selectedPlayer,
          caption,
          viceCaption,
          teamA,
          teamB,
          createdOn: `${timeNow}`,
          id: timeNow,
          match_key,
        })
        .then(() => {
          if (entryFee) {
            handlePresentModalPress();
          } else {
            navigate('PoolsScreen', {
              match_key,
              teamA: teamA,
              teamB: teamB,
              start_at: start_at,
            });
            setVisible('Team created Join the contest now');
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  const addMoney = async money => {
    await firestore()
      .collection('Users')
      .doc(mobileNumber)
      .update({
        walletAmount: Number(walletAmount) + Number(money),
      })
      .then(() => {
        Alert.alert(
          'Added to wallet',
          'Successfully added money to your wallet.',
          [
            {
              text: 'ok',
              onPress: () => {
                setAmountToAdd(''), setAddMoneyModal(false);
              },
            },
          ],
        );
        setAddMoneyModal(false);
        setAmountToAdd('');
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

  React.useEffect(() => {
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

    // await AsyncStorage.getItem('mobileNumber').then(mobileNumber => {
      await AsyncStorage.getItem('uid').then(uid => {
      firestore()
        .collection('Users')
        .doc(uid)
        .update({
          walletAmount: newAmount,
        })
        .then(() => {
          createPools();
        })
        .catch(e => console.log('>>>>', e));
    });
  };

  const payAndJoin = async () => {
    setPaying(true);
    // await AsyncStorage.getItem('mobileNumber').then(res => {
      await AsyncStorage.getItem('uid').then(res => {
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

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          height: '100%',
        }}>
        {/* Navbar */}
        <View className="bg-[#FC2B2D] py-3">
          <View className="mx-auto flex-row items-center w-11/12 ">
            <TouchableOpacity onPress={() => goBack()}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>
            <View className="flex-1 justify-center items-center">
              <Text className="text-white text-lg font-poppins600">
                Caption and Vice Caption
              </Text>
            </View>
          </View>

          <View className="flex-row justify-center pt-2 items-center">
            <TeamLogo
              size="md"
              name={Object.entries(dataFetched.teams)[0][1]['code']}
            />

            <Text className="text-center mx-2 text-lg text-white  font-poppins700">
              VS
            </Text>

            <TeamLogo
              size="md"
              name={Object.entries(dataFetched.teams)[1][1]['code']}
            />
          </View>
        </View>

        <View className="items-center py-2 bg-white mx-auto w-full justify-between border-b border-slate-200">
          <Text className="font-poppins500 text-sm text-black">
            Choose your caption and vice caption
          </Text>
          <View className="flex-row justify-center pt-2 items-center space-x-1">
            <Avatar.Text size={20} label="C" className="bg-[#f00]" />
            <Text className="font-poppins500 text-xs text-black">
              Get 2X Points
            </Text>
            <Avatar.Text size={20} label="VC" className="bg-[#f00]" />
            <Text className="font-poppins500 text-xs text-black">
              Get 1.5X Points
            </Text>
          </View>
        </View>

        <FlatList
          className="h-full"
          data={selectedPlayer}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            const team = Object.entries(dataFetched.teams)
              .map(([_, value]) => value)
              .filter(team => team.key === item.team_key)[0].name;

            return (
              <View className="flex-row border-b border-slate-200 bg-white py-4 px-3 items-center">
                <View className="justify-between space-x-2 flex-row">
                  <PlayerImage imageName={item.key} />
                  <View>
                    <Text className="font-poppins600 h-5 text-md text-black">
                      {item.name}
                    </Text>
                    <Text className="font-poppins600 text-[10px] h-4 text-black">
                      {team} ( {item.seasonal_role.toUpperCase()} )
                    </Text>
                  </View>
                </View>
                <View className="flex-row gap-2 ml-auto">
                  <TouchableOpacity
                    className={clsx(
                      'w-9 h-9 justify-center items-center rounded-full',
                      caption?.key === item.key
                        ? 'bg-[#f00]'
                        : 'bg-white border',
                    )}
                    onPress={() => {
                      if (viceCaption?.key === item.key) {
                        setViceCaption(null);
                      }
                      setCaption(item);
                    }}>
                    <Text
                      style={{
                        color: caption?.key === item.key ? '#fff' : '#000',
                      }}
                      className="font-poppins600 text-sm">
                      C
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={clsx(
                      'w-9 h-9 justify-center items-center rounded-full',
                      viceCaption?.key === item.key
                        ? 'bg-[#f00]'
                        : 'bg-white border',
                    )}
                    onPress={() => {
                      if (caption?.key === item.key) {
                        setCaption(null);
                      }
                      setViceCaption(item);
                    }}>
                    <Text
                      style={{
                        color: viceCaption?.key === item.key ? '#fff' : '#000',
                      }}
                      className="font-poppins600 text-sm">
                      VC
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

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
            className="w-11/12 mx-auto flex-row justify-center py-3 space-x-2 items-center">
            <Button
              mode="outlined"
              onPress={() =>
                navigate('TeamPreview', {
                  selectedPlayer,
                  caption,
                  id,
                  match_key,
                  teamB,
                  teamA,
                  viceCaption,
                  start_at,
                })
              }
              className="border-[#000] py-1 w-1/2 rounded-md">
              <Text className="text-center text-md font-poppins700 text-[#000]">
                Team Preview
              </Text>
            </Button>
            {caption && viceCaption && (
              <Button
                onPress={handleContinue}
                disabled={loading}
                loading={loading}
                className="bg-[#1D3A4B] py-1 w-1/2 rounded-md">
                <Text className="text-center text-md font-poppins700 text-white">
                  {entryFee ? `Pay ₹ ${entryFee}` : 'Save'}
                </Text>
              </Button>
            )}
          </View>
        </BlurView>
        {entryFee && (
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}>
            <View className="w-11/12 mx-auto py-2">
              <Text className="font-poppins600 text-black text-lg text-center">
                Pay and Join Contest
              </Text>
              <View className="flex-row w-2/3 mx-auto justify-between mt-5">
                <Text className="font-poppins500 text-black">Wallet</Text>
                <Text className="font-poppins500 text-black">
                  {' '}
                  ₹ {entryFee}
                </Text>
              </View>
              <View className="flex-row w-2/3 mx-auto justify-between mt-5">
                <Text className="font-poppins500 text-black">Bonus</Text>
                <Text className="font-poppins500 text-black"> ₹ 0</Text>
              </View>
              <View className="w-2/3 mx-auto border-t-2 border-[#00000010] mt-3"></View>
              <View className="flex-row w-2/3 mx-auto justify-between mt-5">
                <Text className="font-poppins500 text-black">Total</Text>
                <Text className="font-poppins500 text-black">
                  {' '}
                  ₹ {entryFee}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => payAndJoin()}
                className="bg-[#FC2B2D] mx-auto mt-4 p-2 px-10 w-2/3 rounded-lg">
                <Text className="text-md text-center text-white font-poppins600">
                  Let's Play
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        )}

        <Modal
          visible={addMoneyModal}
          transparent={true}
          onDismiss={() => {
            setAddMoneyModal(addMoneyModal);
          }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                opacity: 0.7,
                position: 'absolute',
              }}
            />
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  marginVertical: 10,
                  fontWeight: '600',
                  fontSize: 20,
                  color: '#252525',
                  // textDecorationLine:'underline'
                }}>
                ENTER AMOUNT
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '30%',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: 'red',
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    paddingHorizontal: 5,
                    borderRadius: 5,
                    fontSize: 20,
                    paddingLeft: 10,
                    flex: 1,
                  }}>
                  ₹
                </Text>
                <TextInput
                  style={{
                    // width: '20%',
                    fontSize: 20,
                    flex: 7,
                  }}
                  keyboardType="number-pad"
                  className="text-black"
                  maxLength={5}
                  value={amountToAdd}
                  onChangeText={text => {
                    setAmountToAdd(text);
                  }}
                />
              </View>
              <View className="flex-row pt-2 justify-center gap-2">
                <Button
                  mode="contained"
                  className="rounded-lg px-2 bg-[#2DA94F]"
                  onPress={() => {}}>
                  ADD NOW
                </Button>
              </View>

              <TouchableOpacity
                onPress={() => setAddMoneyModal(false)}
                style={{
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 20,
                  marginTop: 5,
                  paddingVertical: 15,
                  borderRadius: 5,
                }}>
                <Text
                  style={{ fontSize: 16, color: 'grey', fontWeight: '600' }}>
                  DISMISS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default VCaptionScreen;
