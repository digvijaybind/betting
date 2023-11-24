import clsx from 'clsx';
import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getTeamLogo } from '../lib/util/imgUtil';

const TeamLogo = ({
  name,
  size = 'base',
  bigName,
}: {
  name: string;
  size?: 'md' | 'base';
  bigName?: string;
}) => {
  if (getTeamLogo(name) === null) {
    return (
      <View
        className={clsx(
          'justify-center items-center border border-red-500/30 bg-red-500/20',
          {
            'w-[70px] h-[70px] rounded-full': size === 'base',
            'w-[50px] h-[50px] rounded-full': size === 'md',
          },
        )}>
        <Text className="text-black text-center text-[10px] font-poppins600 ">
          {bigName ? bigName : name}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        source={getTeamLogo(name)}
        className={clsx({
          'w-[70px] h-[65.625px] rounded-full': size === 'base',
          'w-[44px] h-[46.875px] rounded-full': size === 'md',
        })}
        style={{
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default TeamLogo;
