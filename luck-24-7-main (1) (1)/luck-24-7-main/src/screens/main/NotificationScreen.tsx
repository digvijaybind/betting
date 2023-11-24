import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { RootParamList } from '../../../App';

type NotificationType = {
  id: string;
  title: string;
  description: string;
  otherData?: string;
};

type Props = NativeStackScreenProps<RootParamList, 'NotificationScreen'>;
const NotificationScreen = () => {
  const { goBack, navigate }: Props['navigation'] = useNavigation();
  const [noti, setNoti] = useState<NotificationType[]>([]);

  const getNotification = async () => {
    const tempNotifications: NotificationType[] = [];
    await firestore()
      .collection('notificationForAll')
      .get()
      .then(res => {
        // console.log(res.docs);
        res.docs.forEach(notification => {
          tempNotifications.push(notification.data());
        });
      })
      .then(() => {
        const sorted = [...tempNotifications].sort((a, b) => b.id - a.id);
        setNoti(sorted);
      })
      .catch(e => {
        console.log(e);
      });
  };

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

  useLayoutEffect(() => {
    getNotification();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}>
      <Appbar.Header elevated mode="small" statusBarHeight={0}>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="Notification" />
      </Appbar.Header>
      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={noti}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            // console.log(item);
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#5A0EBF',
                  marginVertical: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  elevation: 10,
                  borderRadius: 5,
                }}>
                <Text
                  className="font-poppins800"
                  style={{
                    color: '#FFF',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {item.title}
                </Text>
                <Text
                  className="font-poppins800"
                  style={{ color: '#FFF', fontWeight: '500', marginBottom: 5 }}>
                  {item.description}
                </Text>
                {item.otherData ? (
                  <Text
                    className="font-poppins800"
                    style={{
                      color: '#FFF',
                      fontWeight: '500',
                      marginBottom: 5,
                    }}>
                    {item.otherData}
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
