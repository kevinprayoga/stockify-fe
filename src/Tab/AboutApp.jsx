import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function AboutApp() {
  const nav = useNavigation();

  const backHandler = () => {
    nav.navigate("Profile");
  };
  return (
    <View className="bg-bg h-screen">
      <View className="flex mx-8 mt-20">
        <View className="flex-row">
          <TouchableOpacity title="Back" onPress={backHandler} className="rounded-full p-1.5 bg-primary">
            <Ionicons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <View className="ml-4">
            <Text className="text-2xl font-p font-semibold">About App</Text>
          </View>
        </View>
        <View className="place-items-center m-auto mt-20">
          <Image source={images.aboutappillustration} className="h-130 w-130"/>      
          <Image source={images.splash} className="m-auto -my-20 h-56 w-56"/>   
          <Text className="text-center text-lg font-p font-semibold pt-0 m-auto text-primary">Develop by Group 2 (2Man)</Text>
          <Text className="text-center text-lg font-p font-normal pt-60 m-auto text-primary">©Stockify 2024, All right reserved</Text>
        </View>
      </View>
    </View>
  );
};
