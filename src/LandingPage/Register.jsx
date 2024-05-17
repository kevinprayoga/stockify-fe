import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const nav = useNavigation();

  const backHandler = () => {
    nav.navigate("Landing2");
  };

  const registerHandler = () => {

  };

  return (
    <View className="bg-bg h-screen">
      <ScrollView className="flex mx-8 mt-20">
        <TouchableOpacity title="Back" onPress={backHandler} className="rounded-full mr-80 p-1.5 bg-primary">
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="font-h text-black text-2xl font-medium mt-10">Pendaftaran Akun</Text>
        <Text className="font-p text-vSmallFont text-base mt-0.5">Lengkapi informasi profile Anda!</Text>
        <View className="flex mt-10">
          <Text className="font-p text-mediumFont font-medium text-lg">Detail Akun</Text>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Nama" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              autoFocus
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Nomor HP" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Email"
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              inputMode="email" 
              autoCapitalize="none"
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
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Confirm Password" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              autoCapitalize="none" 
              secureTextEntry
            />
          </View>
        </View>
        <View className="flex mt-10">
          <Text className="font-p text-mediumFont font-medium text-lg">Informasi Bisnis</Text>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Nama Bisnis" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Alamat Bisnis" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Provinsi"
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Kota/Kabupaten" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Kecamatan" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Kode Pos" 
              placeholderTextColor="#9CA3AF" 
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
            />
          </View>
        </View>
        <TouchableOpacity className="bg-primary mx-4 mt-8 mb-16 py-4 rounded-lg shadow shadow-[#3A8DEC]">
            <Text className="font-p text-xl text-white font-semibold text-center">Daftar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}