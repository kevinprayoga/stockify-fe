import React from "react";
import { Image, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { images } from "../../constants";

export default function MyAccount() {
  return (
    <View>
      <View className= "bg-primary rounded-full h-[40] w-[40] m-auto place-items-start my-[85px] ml-6">
          <View className="mt-7 ml-3 m-auto">
              <Ionicons name="arrow-back-outline" size={28} color="white" />
          </View>
      </View>
      <Text className="text-center text-2xl font-p font-semibold -my-[190px] pt-[72px]">My Account</Text>
      <TouchableOpacity>
        <View className= "bg-primary rounded-full h-[40] w-[40] m-auto place-items-start my-[152px] mr-6">
          <View className="mt-7 ml-24 m-auto">
          <AntDesign name="edit" size={24} color="#FFFFFF" />
          </View>
        </View>
      </TouchableOpacity>
      
      
      <View className="flex -my-[120px] ml-8">
        <Text className="text-md font-p font-semibold text-left mb-[670px]">Personal Detail</Text>
      </View>
      
    
      <View className="absolute top-48 left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="Vania Salsabila" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>

      <View className="absolute top-[254px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="08122658765" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View> 

      <View className="absolute top-[315px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="vaniaasabila@gmail.com" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>
      
      <View className="flex -my-[340px] ml-8">
        <Text className="text-md font-p font-semibold text-left mb-[670px]">Business Info</Text>
      </View>

      <View className="absolute my-[420px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="Grosir Permata Cimahi" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>

      <View className="absolute my-[483px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="Jl. Mutiara XII, Blok G1 No.5" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>

      <View className="absolute my-[547px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="Jawa Barat" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>

      <View className="absolute my-[613px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="Kota Cimahi" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>

      <View className="absolute my-[678px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="Cimahi Tengah" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>

      <View className="absolute my-[743px] left-8 flex justify-center bg-white rounded-lg px-4 shadow h-[45] w-[330px]">
        <TextInput placeholder="40552" placeholderTextColor="#9CA3AF" editable={false} selectTextOnFocus={false} className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>

    </View>
  );
}