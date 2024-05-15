import React, {useState} from "react";
import { ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';

export default function HistoryDetail() {
  return (
    <View className="bg-[#F5F6F7]">
      <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
        <View className="items-center mt-[30]">
            <Text className="text-xl font-bold">Detail Transaksi</Text>
        </View>
        <View className="absolute mt-[30]">
            <TouchableOpacity className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                <AntDesign name="arrowleft" size={15} color="white"/>
            </TouchableOpacity>    
        </View>

        <View className="mx-[27] mt-[20] bg-white rounded-xl shadow">
            <View className="border-b border-gray-200 flex-row justify-between items-center p-[15]">
                <View>
                    <Text className="text-xl font-bold">#0376</Text>
                    <Text className="text-[13px] text-gray-400">20/03/2024</Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-[#27AE60] font-bold">Selesai </Text>
                    <AntDesign name="checkcircle" size={13} color="#27AE60" />
                </View>
            </View>
            {/* Daftar Item */}
            <View className="px-[15] py-[5]">
                <View className="flex-row justify-between items-center">
                    <View className="flex-row p-[10]">
                        <Text className="w-[30]">1</Text><Text className="">Mie Goreng</Text>
                    </View>
                    <Text>Rp125.000</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <View className="flex-row p-[10]">
                        <Text className="w-[30]">10</Text><Text className="">Koko Krunch</Text>
                    </View>
                    <Text>Rp200.000</Text>
                </View>
            </View>
            {/* Total */}
            <View className="bg-[#5A4DF3] rounded-b-lg px-[15] py-[10] flex-row justify-between">
                <Text className="text-lg text-white font-bold">Total</Text>
                <Text className="text-lg text-white font-bold">Rp325.000</Text>
            </View>
        </View>

      </ScrollView>
    </View>
  );
}