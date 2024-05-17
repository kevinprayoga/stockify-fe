import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';
import { images } from "../../constants";

export default function Login() {
  const nav = useNavigation();

  const backHandler = () => {
    nav.navigate("Landing2");
  };

  const loginHandler = () => {

  };

  return (
    <View className="bg-bg h-screen">
      <View className="flex mx-8 mt-20">
        <TouchableOpacity title="Back" onPress={backHandler} className="rounded-full mr-80 p-1.5 bg-primary">
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="font-h text-black text-2xl font-medium mt-10">Masuk Akun</Text>
        <Text className="font-p text-vSmallFont text-base mt-0.5">Masuk sesuai akun Anda!</Text>
        <View className="flex mt-5">
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Email"
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              inputMode="email" 
              autoCapitalize="none"
              autoFocus
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Password" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              autoCapitalize="none" 
              secureTextEntry
            />
          </View>
          <TouchableOpacity className="bg-primary mx-4 mt-8 py-4 rounded-lg shadow shadow-[#3A8DEC]">
            <Text className="font-p text-xl text-white font-semibold text-center">Masuk</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-p text-mediumFont font-medium text-base text-center mt-5">ATAU</Text>
        <TouchableOpacity className="shadow">
          <Image 
            source={images.google}
            className='mt-5 mx-auto'
          />
        </TouchableOpacity>
        <Text className="font-p text-vSmallFont text-small mt-3 text-center font-semibold">Belum punya akun?
          <Text onPress={() => (nav.navigate("Register"))} className="text-primary font-semibold"> Daftar akun</Text>
        </Text>
      </View>
    </View>
  );
}