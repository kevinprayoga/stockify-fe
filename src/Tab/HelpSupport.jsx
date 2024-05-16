import React from "react";
import { Image, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";

export default function HelpSupport() {
  return (
    <View>
      <TouchableOpacity>
        <View className= "bg-primary rounded-full h-[40] w-[40] m-auto place-items-start my-[75px] ml-6">
          <View className="mt-3 ml-3 m-auto">
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </View>
        </View>
      </TouchableOpacity>
      
      <Text className="text-center text-2xl font-p font-semibold -mt-[180] pt-[72px]">Support & Help</Text>
        <View className="place-items-center m-auto mt-40">
            <Image source={images.faq} className="h-130 w-130"/>      
            <Text className="text-center text-xl font-p font-semibold my-6 m-auto text-primary">Coming Soon...</Text>
        </View>
    </View>
  );
}