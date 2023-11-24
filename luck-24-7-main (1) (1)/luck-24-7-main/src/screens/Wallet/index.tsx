import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import firestore from '@react-native-firebase/firestore';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import { Base64 } from 'js-base64';
import sha256 from 'crypto-js/sha256';
// import {
//   PlatformPay,
//   PlatformPayButton,
//   StripeProvider,
//   usePlatformPay,
//   useStripe,
// } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Modal,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import Share from 'react-native-share';
import { RootParamList } from '../../../App';
const API_URL = 'https://us-central1-luck24-7.cloudfunctions.net/stripe';
// const API_URL = 'http://127.0.0.1:5001/luck24-7/us-central1/stripe';

const environmentForSDK = 'UAT';
const merchantId = 'LUCK24UAT';
const isDebuggingEnabled = true;

type Props = NativeStackScreenProps<RootParamList, 'WalletStack'>;
const WalletScreen = ({ route }) => {
  const navigation: Props['navigation'] = useNavigation();
  const [walletAmount, setWalletAmount] = useState('');
  const [winningAmount, setWinningAmount] = useState('');
  const [cashBonus, setCashBonus] = useState('');
  const [amountAdded, setAmountAdded] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [addMoneyModal, setAddMoneyModal] = useState(false);
  const [withdrawaloneyModal, setWithdrawaloneyModal] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [amountToWithdrawal, setAmountToWithdrawal] = useState('');
  const [firstName, setFirstName] = useState('ok');
  const [lastName, setLastName] = useState('');
  const [UPI, setUPI] = useState('');
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardMMDD, setCardMMDD] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [appId, setAppId] = useState('');
  const [message, setMessage] = useState('');
  const [callbackUrl, setCallbackUrl] = useState(
    'https://6842-2401-4900-1f3e-7549-c16c-6397-1571-fd69.ngrok-free.app/payment',
  );

  try {
    var { openModal } = route.params;
    console.log('openModal >>>', openModal);
  } catch (error) {
    console.log('error>>>', error);
  }

  // console.log(confirmPayment);
  // const { isPlatformPaySupported, confirmPlatformPayPayment } =
  //   usePlatformPay();
  // const stripe = useStripe();

  // const initPhonePeSDK = () => {
  //   PhonePePaymentSDK.init(environmentForSDK, merchantId, appId, true)
  //     .then(result => {
  //       setMessage('Message: SDK Initialisation ->' + JSON.stringify(result));
  //     })
  //     .catch(error => {
  //       setMessage('error:' + error.message);
  //     });
  // };

  // const getPackageSignatureForAndroid = () => {
  //   if (Platform.OS === 'android') {
  //     PhonePePaymentSDK.getPackageSignatureForAndroid()
  //       .then(packageSignture => {
  //         setAppId(packageSignture || '');
  //       })
  //       .catch(error => {
  //         setMessage('error:' + error.message);
  //       });
  //   }
  // };

  // const handleStartTransaction = () => {
  //   const apiEndPoint = '/pg/v1/pay';

  //   const data = {
  //     merchantId: merchantId,
  //     merchantTransactionId,
  //     merchantUserId,
  //     amount: Number(amountToAdd) * 100,
  //     mobileNumber,
  //     callbackUrl,
  //     deviceContext: {
  //       deviceOS: Platform.OS.toUpperCase(),
  //     },
  //     paymentInstrument: {
  //       type: 'PAY_PAGE',
  //     },
  //   };

  //   PhonePePaymentSDK.startPGTransaction(
  //     requestBody,
  //     checksum,
  //     apiEndPoint,
  //     headers,
  //     packageName,
  //     callbackURL,
  //   )
  //     .then(a => {
  //       setMessage(JSON.stringify(a));
  //     })
  //     .catch(error => {
  //       setMessage('error:' + error.message);
  //     });
  // };

  const subscribe = async () => {
    try {
      const environmentForSDK = 'UAT';
      const merchantId = 'LUCK24UAT';

      const isDebuggingEnabled = true;

      let appId = '';

      const result = await PhonePePaymentSDK.init(
        environmentForSDK,
        merchantId,
        appId,
        isDebuggingEnabled,
      );

      if (Platform.OS === 'android') {
        appId = await PhonePePaymentSDK.getPackageSignatureForAndroid();
      } else {
        // Share the Apple Team ID
        appId = '';
      }

      const merchantTransactionId = `${new Date().getTime()}`;
      const merchantUserId = `${new Date().getTime()}`;

      console.log('merchantTransactionId', merchantTransactionId);

      if (result) {
        const data = {
          merchantId: merchantId,
          merchantTransactionId,
          merchantUserId,
          amount: Number(amountToAdd) * 100,
          mobileNumber,
          callbackUrl,
          deviceContext: {
            deviceOS: Platform.OS.toUpperCase(),
          },
          paymentInstrument: {
            type: 'PAY_PAGE',
          },
        };

        const apiEndPoint = '/pg/v1/pay';
        const salt = '0b89fa1c-6607-469f-9566-1250cf2b4ab0';
        const saltIndex = 1;
        const encodedData = Base64.toBase64(JSON.stringify(data));

        const checkSum = `${sha256(
          `${encodedData}${apiEndPoint}${salt}`,
        )}###${saltIndex}`;

        console.log('encodedData', encodedData);

        console.log('X-VERIFY', checkSum);

        const headers = {
          'X-VERIFY': checkSum,
          'Content-Type': 'application/json',
        };
        // ui callback
        const paymentResult = await PhonePePaymentSDK.startPGTransaction(
          encodedData,
          checkSum,
          apiEndPoint,
          headers,
          null,
          'https://luck24seven.page.link',
        );

        const statusChecksum = `${sha256(
          `/pg/v1/status/${merchantId}/${merchantTransactionId}${salt}`,
        )}###${saltIndex}`;

        const paymentStatus = await fetch(
          `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
              'X-VERIFY': statusChecksum,
              'X-MERCHANT-ID': merchantId,
            },
          },
        );

        const json = await paymentStatus.json();

        console.log('paymentStatus', json);

        // server api call

        // failer

        if (json.code === 'PAYMENT_SUCCESS') {
          setAddMoneyModal(false);

          // Alert.alert('Payment successfully!', 'Thank you for the payment.', [
          //   {
          //     text: 'ok',
          //     onPress: () => {
          //       // setAddMoneyModal(false);
          //       firestore()
          //         .collection('Users')
          //         .doc(`${mobileNumber}`)
          //         .update({
          //           walletAmount: Number(walletAmount) + Number(amountToAdd),
          //         })
          //         .then(() => {
          //           Alert.alert(
          //             'Account updated!',
          //             `Amount ${amountToAdd} hase been added to account.`,
          //           );
          //         })
          //         .then(() => {
          //           setAmountToAdd('');
          //         })
          //         .catch(e => {
          //           console.log('account updation error', e);
          //         });
          //     },
          //   },
          // ]);
        }

        // const paymentResult = await fetch(
        //   'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
        //   {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       request: encodedData,
        //     }),
        //     headers,
        //   },
        // );

        // const json = await paymentResult.json();

        // console.log(json);

        // if (Platform.OS === 'android') {
        //   PhonePePaymentSDK.getUpiAppsForAndroid().then(upiApps => {
        //     console.log(upiApps);
        //   });
        // }

        // PhonePePaymentSDK.startPGTransaction(
        //   JSON.stringify({
        //     request: encodedData,
        //   }),
        //   checkSum,
        //   apiEndPoint,
        //   headers,
        //   null,
        //   null,
        // )
        //   .then(a => {
        //     console.log(a);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }

      // const response = await fetch(`${API_URL}/pay`, {
      //   method: 'POST',
      //   body: JSON.stringify({ amount: Number(amountToAdd) * 100 }),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const data = await response.json();
      // console.log(data);
      // if (!response.ok) Alert.alert(data.message);
      // const clientSecret = data.clientSecret;
      // const clientSecretephemeralKey = data.clientSecretephemeralKey;
      // const customerId = data.customer;
      // const initSheet = await stripe.initPaymentSheet({
      //   paymentIntentClientSecret: clientSecret,
      //   merchantDisplayName: 'Merchant Name',
      // });
      // if (initSheet.error) Alert.alert(initSheet.error.message);

      // const presentSheet = await stripe.presentPaymentSheet({ clientSecret });

      // if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      // Alert.alert('Payment successfully!', 'Thank you for the payment.', [
      //   {
      //     text: 'ok',
      //     onPress: () => {
      //       setAddMoneyModal(false);
      //       firestore()
      //         .collection('Users')
      //         .doc(`${mobileNumber}`)
      //         .update({
      //           walletAmount: Number(walletAmount) + Number(amountToAdd),
      //         })
      //         .then(() => {
      //           Alert.alert(
      //             'Account updated!',
      //             `Amount ${amountToAdd} hase been added to account.`,
      //           );
      //         })
      //         .then(() => {
      //           setAmountToAdd('');
      //         })
      //         .catch(e => {
      //           console.log('account updation error', e);
      //         });
      //     },
      //   },
      // ]);
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong!', 'Please try again later!');
    }
  };

  // const withdrawal = async () => {
  //   const response = await fetch(`${API_URL}/withdrawal`, {
  //     method: 'POST',
  //     body: JSON.stringify({ amount: amountToWithdrawal, account: '' }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(response=>{
  //     // console.log('>>>>>>>>',response.json());

  //   })
  // };

  useEffect(() => {
    try {
      var { openModal } = route.params;
    } catch (error) {
      console.log(error);
    }
    setAddMoneyModal(openModal);
    console.log('addMoneyModal', typeof openModal);
  }, []);

  // const createPaymentMethod = async () => {
  //   const response = await fetch('http://172.20.10.10:8000/pay', {
  //     method: 'POST',
  //     body: JSON.stringify({ amount: amountToAdd }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   if (!response.ok) Alert.alert(data.message);
  //   const clientSecret = data.clientSecret;
  //   const clientSecretephemeralKey = data.clientSecretephemeralKey;
  //   const customerId = data.customer;
  //   const initSheet = await stripe.initGooglePay({
  //     countryCode: 'in',
  //     merchantName: 'cvfd',
  //     testEnv: false,
  //   });
  //   if (initSheet.error) {
  //     // console.error(initSheet.error);
  //     return Alert.alert(initSheet.error.message);
  //   }
  //   const presentSheet = await stripe.presentGooglePay({
  //     currencyCode: 'in',
  //     clientSecret: clientSecret,
  //   });
  //   if (presentSheet.error) {
  //     // console.error(presentSheet.error);
  //     return Alert.alert(presentSheet.error.message);
  //   }
  //   Alert.alert('Payment successfully! Thank you for the purchase.');
  //   // Update Bitcoin balance & total value
  //   // Reset quantity
  // };

  const createShareLink = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://google.com`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: `https://luck24seven.page.link/`,
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
      android: {
        packageName: 'com.luck247_rn',
        // fallbackUrl:
        //   'https://play.google.com/store/apps/details?id=com.wewillchase.thenoteswala',
      },
    });
    share(link);
  };
  const share = async link => {
    try {
      Share.open({
        message: `I'm inviting you on Luck 247\n`,
        url: link,
        title: 'title',
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log('error', err);
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getWalletData = async () => {
    await AsyncStorage.getItem('walletAmount').then(res => {
      setWalletAmount(res);
    });
    await AsyncStorage.getItem('cashBonus').then(res => {
      setCashBonus(res);
    });
    await AsyncStorage.getItem('winningAmount').then(res => {
      setWinningAmount(res);
    });
    await AsyncStorage.getItem('amountAdded').then(res => {
      setAmountAdded(res);
    });
    await AsyncStorage.getItem('mobileNumber').then(res => {
      setMobileNumber(res);
    });
    await AsyncStorage.getItem('firstName').then(res => {
      setFirstName(res);
    });
    await AsyncStorage.getItem('lastName').then(res => {
      setLastName(res);
    });
  };

  const onChangeWallet = async () => {
    try {
      const mobileNumber = await AsyncStorage.getItem('mobileNumber');
      firestore()
        .collection('Users')
        .doc(mobileNumber || '')
        .onSnapshot(data => {
          const userData = data.data();
          
          // console.log('data', userData);
          setCashBonus(userData?.cashBonus || 0);
          setWalletAmount(userData?.walletAmount || 0);
          setWinningAmount(userData?.winningAmount || 0);
          setAmountAdded(userData?.amountAdded || 0);
          AsyncStorage.setItem(
            'walletAmount',
            `${userData?.walletAmount || ''}`,
          );
          AsyncStorage.setItem('cashBonus', `${userData?.cashBonus || ''}`);
          AsyncStorage.setItem(
            'winningAmount',
            `${userData?.winningAmount || ''}`,
          );
          AsyncStorage.setItem('amountAdded', `${userData?.amountAdded || ''}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const payNowHandle = () => {};
  const addMoney = async money => {
    const date = new Date();
    const timeNow = date.getTime();
    await firestore()
      .collection('Users')
      .doc(mobileNumber)
      .update({
        walletAmount: Number(walletAmount) + Number(money),
      })
      .then(() => {
        firestore()
          .collection('Users')
          .doc(`${mobileNumber}`)
          .collection('myTransactions')
          .doc(`${timeNow}`)
          .set({ id: timeNow, amount: money, mode: 'mode', type: 'add' })
          .then(() => {
            console.log('saved');
          })
          .catch(e => {
            console.log(e);
          });
        Alert.alert(
          'Added to wallet',
          'Successfully added money to your wallet.',
        );
        setAddMoneyModal(false);
        setAmountToAdd('');
      });
  };

  const withdrawalMoney = async () => {
    const time = new Date();
    const id = mobileNumber + '-' + time.getTime();
    if (
      amountToWithdrawal <= walletAmount &&
      Number(amountToWithdrawal) >= 100
    ) {
      await firestore()
        .collection('withdrawalRequests')
        .doc(id)
        .set({
          id: amountToWithdrawal,
          withdrawalOn: time,
        })
        .then(() => {
          firestore()
            .collection('Users')
            .doc(mobileNumber)
            .update({
              walletAmount: Number(walletAmount) - Number(amountToWithdrawal),
            })
            .then(() => {
              Alert.alert(
                'Withdrawal initiated',
                'You will get your money within 3-4 hour',
              );
              setAmountToWithdrawal('');
              setWithdrawaloneyModal(false);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (Number(amountToWithdrawal) < 100) {
      Alert.alert('Withdrawal falid!', `Minimun withdrawal amount is ₹ 100`);
      setAmountToWithdrawal('');
    }
    if (amountToWithdrawal >= walletAmount) {
      Alert.alert(
        'Withdrawal falid!',
        `Amount can not be grater than ₹ ${walletAmount}`,
      );
      setAmountToWithdrawal('');
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);
  useEffect(() => {
    onChangeWallet();
    return () => onChangeWallet();
  }, [mobileNumber]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    // <StripeProvider
    //   publishableKey={
    //     'pk_live_51N68IcSEw5N4WIbeJRGTOPRIrfmlgLbJH6RGzj83fszUCPAA5k8M2uZjb2f2qGAotcJpgsgo9AXCFUTbWGhF3HhV00uNRUL2br'
    //   }>
    <SafeAreaView style={{}}>
      <Appbar.Header statusBarHeight={0} mode="small">
        <Appbar.Content
          title={
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Ionicons name="menu" size={34} color="black" />
              </TouchableOpacity>
              <Text className="flex-1 ml-2 text-center text-lg font-poppins600 text-black">
                My Wallet
              </Text>
            </View>
          }
        />
        <Appbar.Action
          icon="bell-badge-outline"
          color="#FC2B2D"
          onPress={() => navigation.navigate('NotificationScreen')}
        />
      </Appbar.Header>
      <View className="w-11/12 bg-[#1D3A4B] mx-auto rounded-lg p-8 mt-1">
        <Text className="text-center font-poppins600 text-white text-md h-5">
          Total Balance
        </Text>
        <Text className="font-poppins700 text-center text-white text-3xl">{`₹ ${walletAmount}`}</Text>
      </View>
      <View className="flex-row pt-2 justify-center gap-2">
        <Button
          onPress={() => {
            setWithdrawaloneyModal(true);
          }}
          className="rounded-lg px-2 bg-[#FC2B2D]"
          textColor="#fff">
          Withdraw
        </Button>
        <Button
          mode="contained"
          className="rounded-lg px-2 bg-[#2ab92a]"
          onPress={() => {
            setAddMoneyModal(true);
          }}>
          Add Money
        </Button>
      </View>

      <View className="w-11/12 border-black/10 mx-auto border rounded-md space-y-1 p-4 mt-3">
        <Text className="font-poppins500 text-sm text-black">Amount Added</Text>
        <Text className="font-poppins700 text-md text-black">{`₹ ${amountAdded}`}</Text>

        <Text className="font-poppins500 text-sm text-black">Winnings</Text>
        <Text className="font-poppins700 text-md text-black">{`₹ ${winningAmount}`}</Text>

        <Text className="font-poppins500 text-sm text-black">Cash Bonus</Text>
        <Text className="font-poppins700 text-md text-black">{`₹ ${cashBonus}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyTransaction');
        }}
        className="w-11/12 mt-3 border-black/10 mx-auto border rounded-md p-4 py-3 flex-row justify-between items-center">
        <Text className="text-center font-poppins500 text-black text-sm">
          My Transaction
        </Text>
        <Ionicons name="ios-arrow-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity className="w-11/12 mt-3 border-black/10 mx-auto border rounded-md p-4 py-3 flex-row justify-between items-center">
        <Text className="text-center font-poppins500 text-black text-sm">
          Manage Payments
        </Text>
        <Ionicons name="ios-arrow-forward" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          createShareLink();
        }}
        className="w-11/12 mt-3 bg-slate-50 border-black/10 mx-auto border rounded-md p-4 py-3 flex-row justify-between items-center">
        <Text className="text-center font-poppins500 text-black text-sm">
          Earn by share
        </Text>
        <Ionicons name="ios-arrow-forward" size={20} color="black" />
      </TouchableOpacity>

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
                  color: '#000',
                }}>
                ₹
              </Text>
              <TextInput
                style={{
                  // width: '20%',
                  fontSize: 20,
                  flex: 7,
                  color: '#252525',
                }}
                keyboardType="number-pad"
                maxLength={5}
                value={amountToAdd}
                onChangeText={text => {
                  setAmountToAdd(text);
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAmountToAdd('50');
                  }}
                  style={{
                    backgroundColor: '#1D3A4B',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text style={{ color: '#FFF', fontSize: 18 }}>₹ 50</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAmountToAdd('100');
                  }}
                  style={{
                    backgroundColor: '#1D3A4B',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text style={{ color: '#FFF', fontSize: 18 }}>₹ 100</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAmountToAdd('150');
                  }}
                  style={{
                    backgroundColor: '#1D3A4B',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text style={{ color: '#FFF', fontSize: 18 }}>₹ 150</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAmountToAdd('200');
                  }}
                  style={{
                    backgroundColor: '#1D3A4B',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text style={{ color: '#FFF', fontSize: 18 }}>₹ 200</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row pt-2 justify-center gap-2">
              <Button
                mode="contained"
                className="rounded-lg px-2 bg-[#2DA94F]"
                onPress={() => {
                  // setAddMoneyModal(false), setPaymentMethodModal(true);
                  subscribe();
                }}>
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
                backgroundColor: '#FEFEFE',
                paddingVertical: 15,
                borderRadius: 5,
              }}>
              <Text style={{ fontSize: 16, color: 'grey', fontWeight: '600' }}>
                DISMISS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={paymentMethodModal}
        transparent={true}
        onDismiss={() => {
          setPaymentMethodModal(paymentMethodModal);
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
              Select Payment Method
            </Text>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    subscribe();
                  }}
                  style={{
                    backgroundColor: '#2ab92a',
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    height: 60,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#FFF',
                      fontWeight: 'bold',
                    }}>
                    Card
                  </Text>
                </TouchableOpacity>
                {/* <PlatformPayButton
                    type={PlatformPay.ButtonType.Pay}
                    onPress={createPaymentMethod}
                    style={{
                      width: 100,
                      height: 60,
                    }}
                    borderRadius={0}
                    role="banner"
                  /> */}

                {/* <TouchableOpacity
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      backgroundColor: '#2ab92a',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#FFF',
                        fontWeight: 'bold',
                      }}>
                      Card
                    </Text>
                  </TouchableOpacity> */}
              </View>
            </View>
            {/* <View className="flex-row pt-2 justify-center gap-2">
                <Button
                  mode="contained"
                  className="rounded-lg px-2 bg-[#2DA94F]"
                  onPress={() => {
                    () => {};
                  }}>
                  PAY NOW
                </Button>
              </View> */}

            <TouchableOpacity
              onPress={() => setPaymentMethodModal(false)}
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                marginTop: 5,
                backgroundColor: '#FEFEFE',
                paddingVertical: 15,
                borderRadius: 5,
              }}>
              <Text style={{ fontSize: 16, color: 'grey', fontWeight: '600' }}>
                DISMISS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={withdrawaloneyModal}
        transparent={true}
        onDismiss={() => {
          setWithdrawaloneyModal(withdrawaloneyModal);
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
                  color: '#000',
                }}>
                ₹
              </Text>
              <TextInput
                style={{
                  // width: '20%',
                  fontSize: 20,
                  flex: 7,
                  color: '#252525',
                }}
                keyboardType="number-pad"
                maxLength={5}
                value={amountToWithdrawal}
                onChangeText={text => {
                  setAmountToWithdrawal(text);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                // if (
                //   Number(amountToWithdrawal) >= 100 &&
                //   Number(amountToWithdrawal) < Number(walletAmount)
                // ) {
                //   console.log('not ok');
                //   Alert.alert(
                //     'Withdrawal Failed!',
                //     `You don't enough money to withdrawal`,
                //   );
                // } else {
                //   console.log('ok');
                // }
              }}
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                backgroundColor: '#E32027',
                paddingVertical: 15,
                borderRadius: 5,
              }}>
              <Text style={{ fontSize: 18, color: '#fff', fontWeight: '600' }}>
                WITHDRAWAL
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setWithdrawaloneyModal(false)}
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                marginTop: 5,
                backgroundColor: '#fff',
                paddingVertical: 15,
                borderRadius: 5,
              }}>
              <Text style={{ fontSize: 18, color: 'grey', fontWeight: '600' }}>
                DISMISS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    // </StripeProvider>
  );
};

export default WalletScreen;
