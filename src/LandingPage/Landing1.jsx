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
      <View className="flex items-center justify-center h-screen">
        <StatusBar barStyle="dark-content" />
        <Image
          source={images.landing}
        />
        <TouchableOpacity onPress={signHandler} className='bg-primary mt-7 px-10 py-3 rounded-lg shadow shadow-[#3A8DEC]'>
          <Text className='font-semibold text-xl text-white text-center'>Ayo Mulai</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}