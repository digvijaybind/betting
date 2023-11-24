import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging().getInitialNotification(async remoteMessage => {
    console.log('Message handled in the kill state!', remoteMessage);
  });
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
