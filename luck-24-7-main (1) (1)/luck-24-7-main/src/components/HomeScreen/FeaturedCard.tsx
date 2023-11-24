import React from 'react';
import { Image, View } from 'react-native';
interface FeaturedCardProps {
  uri: any;
}

const FeaturedCard = ({ uri }: FeaturedCardProps) => {
  return (
    <View className="items-center justify-center m-1 mt-0 mx-4 overflow-hidden rounded-md bg-slate-50">
      <Image source={{ uri: uri }} className="w-full h-[215px] object-contain" />
    </View>
  );
};

export default FeaturedCard;
