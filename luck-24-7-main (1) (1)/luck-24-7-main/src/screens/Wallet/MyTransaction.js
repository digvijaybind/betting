import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyTransaction = () => {
  const navigation = useNavigation();
  const [allTransaction, setAllTransaction] = useState([]);

  const getMyTransactions = async mobileNumber => {
    const temp = [];
    await firestore()
      .collection('Users')
      .doc(`${mobileNumber}`)
      .collection('myTransactions')
      .get()
      .then(res => {
        const data = res.docs;
        data.forEach(response => {
          temp.push(response.data());
        });
      })
      .then(() => {
        const sort = [...temp].sort((a, b) => b.id - a.id);
        setAllTransaction(sort);
      });
  };

  const convertTime=(time) =>{
    var hours = parseInt(time.substr(0, 2));
    var minutes = time.substr(3, 2);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ':' + minutes + ' ' + ampm;
  }

  const convertTimeDate = timestamp => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedTime = `${hours
        .toString()
        .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
    
    const formattedDate = `${year}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')} `;

      const formattedDateTime = `${formattedDate} ${convertTime(formattedTime)}`
    return formattedDateTime;
  };

  useEffect(() => {
    AsyncStorage.getItem('mobileNumber').then(res => {
      getMyTransactions(res);
    });
  }, []);
  return (
    <View style={styles.root}>
      <View className="bg-white">
        <View className="mx-auto flex-row items-center h-16 w-11/12 ">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('WalletStack');
            }}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
          <View className="flex-row flex-1 justify-center items-center">
            <View className="justify-center items-center px-2">
              <Text className="text-black uppercase text-xl font-poppins700">
                My Transaction
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.transactionList}>
        <FlatList
          style={{ width: '100%' }}
          data={allTransaction}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => {
            console.log(item);
            const time = convertTimeDate(item.id);
            return (
              <View style={styles.flatListView}>
                <View style={styles.flatListDetailView}>
                  <Text style={styles.flatListTextTitle}>
                    {`Payment Mode : ${item.mode}`}
                  </Text>
                  <Text style={styles.flatListTextTime}>{time}</Text>
                </View>
                <View style={styles.flatListMoneyView}>
                  <Text style={styles.flatListTextMoney}>{`${item.type == 'add' ? '+ ' : '- '} ₹ ${
                    item.amount
                  }`}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default MyTransaction;

const styles = StyleSheet.create({
  root: { width: '100%', height: '100%' },
  transactionList: {
    width: '100%',
    height: '93%',
    padding: 10,
    alignItems: 'center',
  },
  flatListView: {
    backgroundColor: '#5A0EBF',
    width: '100%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  flatListTextTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    paddingVertical: 5,
  },
  flatListTextTime: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    paddingVertical: 5,
  },
  flatListDetailView: {
    width: '80%',
  },
  flatListMoneyView: {
    width: '20%',justifyContent:'center',alignItems:'center'
  },
  flatListTextMoney: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    paddingVertical: 5,
  },
});
