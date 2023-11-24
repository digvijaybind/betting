import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Appbar, List, Switch } from 'react-native-paper';
import { RootParamList } from '../../../App';

type Props = NativeStackScreenProps<RootParamList, 'SettingsScreen'>;
const Settings = () => {
  const { goBack }: Props['navigation'] = useNavigation();
  return (
    <SafeAreaView style={{}}>
      <Appbar.Header
        elevated
        className="bg-[#1D3A4B]"
        statusBarHeight={0}
        mode="small">
        <Appbar.BackAction onPress={() => goBack()} iconColor="#fff" />
        <Appbar.Content title="Settings" color="#fff" />
      </Appbar.Header>
      <View>
        <Text className="py-2 px-4 font-poppins500 text-black">Normal</Text>
      </View>

      <List.Item
        className="bg-gray-100 mb-[1px]"
        title="Allow SMS Notification"
        right={props => <Switch {...props} />}
      />

      <List.Item
        className="bg-gray-100 mb-[1px]"
        title="Make Me Discoverable"
        right={props => <Switch {...props} />}
      />

      <View>
        <Text className="py-2 px-4 font-poppins500 text-black">Presonl Info</Text>
      </View>

      <List.Item
        className="bg-gray-100 mb-[1px]"
        title="Display my full name on profiile"
        description="This will be visible to other users"
        right={props => <Switch {...props} />}
      />

      <View>
        <Text className="py-2 px-4 font-poppins500 text-black">Gameplay</Text>
      </View>

      <List.Item
        className="bg-gray-100 mb-[1px]"
        title="Show my previous teams"
        description="People who view your profile will be able to see teams that you have createrd for completed matches"
        right={props => <Switch {...props} />}
      />

      <List.Item
        className="bg-gray-100 mb-[1px]"
        title="Show which contest I join"
        description="People who view your profile will be able to see teams that you have createrd for completed matches"
        right={props => <Switch {...props} />}
      />
      <View>
        <Text className="py-2 px-4 font-poppins500 text-black">Danger Zone</Text>
      </View>

      <List.Item
        className="bg-gray-100 mb-[1px]"
        title="Logout"
        titleStyle={{ fontWeight: 'bold' }}
        left={props => <Ionicons name="power" size={24} {...props} />}
      />
    </SafeAreaView>
  );
};

export default Settings;
