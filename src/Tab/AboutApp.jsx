import React from "react";
import { Image, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";

export default function AboutApp() {
    return (
      <View>
        <View className= "bg-primary rounded-full h-[40] w-[40] m-auto place-items-start my-[75px] ml-6">
            <View className="mt-3 ml-3 m-auto">
                <Ionicons name="arrow-back-outline" size={28} color="white" />
            </View>
        </View>

        <Text className="text-center text-2xl font-p font-semibold -mt-[180] pt-[72px]">About App</Text>
        <View className="place-items-center m-auto mt-20">
            <Image source={images.aboutappillustration} className="h-130 w-130"/>      
            <Image source={images.splash} className="m-auto -my-20 h-56 w-56"/>   
            <Text className="text-center text-lg font-p font-semibold pt-0 m-auto text-primary">Develop by Group 2 (2Man)</Text>
            <Text className="text-center text-lg font-p font-normal pt-60 m-auto text-primary">©Stockify 2024, All right reserved</Text>
        </View>
      </View>
    );
  }