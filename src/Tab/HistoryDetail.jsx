import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';

export default function HistoryDetail() {

    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf')
    });

    return (
        <View className="bg-[#F5F6F7]">
        <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
            {/* Page Title */}
            <View className="items-center mt-[30]">
                <Text className="text-xl font-h">Detail Transaksi</Text>
            </View>

            {/* Back Button */}
            <View className="absolute mt-[25]">
                <TouchableOpacity className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                    <AntDesign name="arrowleft" size={15} color="white"/>
                </TouchableOpacity>    
            </View>

            {/* Card */}
            <View className="mx-[27] mt-[20] bg-white rounded-xl shadow">
                {/* ID Produk & Status */}
                <View className="border-b border-gray-200 flex-row justify-between items-center p-[15]">
                    <View>
                        <Text className="text-xl font-h">#0376</Text>
                        <Text className="text-[13px] text-gray-400 font-p">20/03/2024</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-[#27AE60] font-h pt-[3]">Selesai  </Text>
                        <AntDesign name="checkcircle" size={13} color="#27AE60"/>
                    </View>
                </View>
                {/* Daftar Item */}
                <View className="px-[15] py-[5]">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row p-[10]">
                            <Text className="w-[30] font-p">1</Text><Text className="font-p">Mie Goreng</Text>
                        </View>
                        <Text className="font-p">Rp125.000</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row p-[10]">
                            <Text className="w-[30] font-p">10</Text><Text className="font-p">Koko Krunch</Text>
                        </View>
                        <Text className="font-p">Rp200.000</Text>
                    </View>
                </View>
                {/* Total */}
                <View className="bg-[#5A4DF3] rounded-b-lg px-[15] py-[10] flex-row justify-between">
                    <Text className="text-lg text-white font-h">Total</Text>
                    <Text className="text-lg text-white font-h">Rp325.000</Text>
                </View>
            </View>

        </ScrollView>
        </View>
    );   
}