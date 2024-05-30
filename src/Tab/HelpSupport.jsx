import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function HelpSupport() {
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
            <Text className="text-2xl font-p font-semibold">Support & Help</Text>
          </View>
        </View>
        <View className="place-items-center m-auto mt-40">
          <Image source={images.faq} className="h-130 w-130"/>      
          <Text className="text-center text-xl font-p font-semibold my-6 m-auto text-primary">Coming Soon...</Text>
        </View>
      </View>
    </View>
  );
}