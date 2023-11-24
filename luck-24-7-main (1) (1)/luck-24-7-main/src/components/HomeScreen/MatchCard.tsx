import { AntDesign } from '@expo/vector-icons';
import clsx from 'clsx';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MatchType } from '../../lib/content/upcoming';
import { getTeamTitle } from '../../lib/helper';
import useGetRemaingTimeString from '../../lib/useGetRemaingTimeString';
import TeamLogo from '../TeamLogo';

type Props = MatchType & {
  onPress: () => void;
};

const MatchCard = ({
  start_at,
  status,
  teams,
  tournament: { name: tournament_name },
  onPress,
}: Props) => {
  const time = useGetRemaingTimeString(start_at);

  return (
    <TouchableOpacity
      className="mt-2 w-11/12 mx-auto overflow-hidden border-2 border-slate-300 bg-slate-200 rounded-xl"
      onPress={() => onPress()}>
      <View className="flex-row items-center justify-center pb-2 pt-2 px-3 bg-slate-400/40">
        <Text className="font-poppins600 text-black text-xs text-center">
          {tournament_name} - {getTeamTitle(teams?.a.code, teams?.b.code)}
        </Text>
      </View>

      <View className="flex-row p-4 px-3">
        <View className="flex-row flex-1 justify-between">
          <View className="items-center justify-center block">
            <TeamLogo name={teams?.a.code} bigName={teams.a.name} />
          </View>
          <View className="items-center px-2 gap-1 justify-center">
            <Text className="font-poppins700 text-sm text-black">VS</Text>
            <AntDesign name="clockcircleo" size={11} color="black" />
            <Text
              style={{ textAlign: 'center' }}
              className={clsx(
                'font-poppins600 text-md  text-center',
                status === 'started' ? 'text-[#f00]' : 'text-black',
              )}>
              {status === 'started' && 'Live'}
              {status === 'completed' && 'Completed'}
              {status !== 'started' && time}
            </Text>
          </View>
          <View className="items-center justify-center block">
            <TeamLogo name={teams?.b.code} bigName={teams.b.name} />
          </View>
        </View>

        <View className="mx-4 bg-white w-[2px] h-full rounded-2xl" />
        <View className="justify-center space-y-1">
          <View className="bg-white mx-auto flex-row py-1 px-2 justify-center items-center space-x-1 rounded-xl">
            <AntDesign name="star" size={10} color="rgb(22,163,74)" />
            <Text className="text-green-600 text-[10px] font-poppins500">
              Mega
            </Text>
          </View>
          <Text className="font-poppins600 text-sm text-center text-black">
            ₹3 Lakh
          </Text>
          <Image
            source={require('../../../assets/images/cash.png')}
            className="h-[16px] block border mx-auto"
            style={{
              aspectRatio: 69 / 34,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchCard;
