import React from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

export default function Stock() {
  return (
    <View className="h-screen bg-[#F5F6F7] flex">
      <Text className="font-medium text-3xl text-left pl-8 pt-16 ">Item(43)</Text>
      <TouchableOpacity className="h-[45] w-[135] rounded-3xl bg-[#5A4DF3] flex ml-auto mr-6 -my-8 ">
        <Text className="font-medium text-white -m-12 -mr-7 py-3 text-xl text-right pr-12 font-poppins -my-0.5">Add Item</Text>
        <View className="-mt-8 mx-3 -my-9">
            <MaterialIcons name="add-circle" size={30} color="white"/>      
        </View>
      </TouchableOpacity>  
      

      <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] my-[45]">
          <Octicons name="search" size={20} color="#9CA3AF"/>
          <TextInput placeholder="Cari Produk" placeholderTextColor="#9CA3AF" className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>  

      <View>
        
      </View>      
    </View>

    
  );
}