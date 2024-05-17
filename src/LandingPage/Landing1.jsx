import React from "react";
import { Image, Text, TouchableOpacity, View, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { images } from "../../constants"

export default function Landing1() {
  const nav = useNavigation();

  const signHandler = () => {
    nav.push("Landing2")
  };

  return (
    <View className='flex items-center bg-bg h-screen'>
      <StatusBar barStyle="dark-content" />
      <Image
        source={images.landing}
        className='mt-96'
      />
      <TouchableOpacity onPress={signHandler} className='bg-primary mt-7 px-10 py-3 rounded-lg shadow shadow-[#3A8DEC]'>
        <Text className='font-p text-xl text-white font-semibold'>Ayo Mulai</Text>
      </TouchableOpacity>
    </View>
  );
}