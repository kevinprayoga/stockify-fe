import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";

export default function Landing2() {
  const nav = useNavigation();

  const registerPageHandler = () => {
    nav.push("Register")
  };

  const loginPageHandler = () => {
    nav.push("Login")
  };

  return (
    <View className="bg-bg h-screen">
      <View className="flex items-center justify-center h-screen">
        <View className="flex justify-center items-center">
          <Image
            source={images.chill}
            className="w-80 h-80"
          />
          <Text className="font-b text-primary text-3xl font-bold pt-4">Selamat datang</Text>
          <Text className="font-b text-primary text-3xl font-bold pt-2">di Stockify!</Text>
          <Text className="font-l text-black text-lg font-light pt-4">Ayo catat transaksi kamu dengan mudah</Text>
          <Text className="font-l text-black text-lg font-light pt-0.25">dengan aplikasi manajemen stok kami!</Text>
          <Text className="font-l text-vSmallFont text-base font-light pt-8">Daftar akun atau masuk untuk memulai</Text>
          <View className="flex-row mt-4 gap-x-9">
            <TouchableOpacity onPress={registerPageHandler} className="bg-white px-10 py-3 rounded-lg shadow-black border">
              <Text className="font-s text-xl text-black font-semibold">Daftar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loginPageHandler} className="bg-primary px-10 py-3 rounded-lg shadow shadow-[#3A8DEC]">
              <Text className="font-s text-xl text-white font-semibold">Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}