import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';

export default function Order() {
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf')
    });

    return (
        <View>
            <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
                <View className="items-center mt-[30]">
                    <Text className="text-xl font-h">Check Out</Text>
                </View>
                {/* Back Button */}
                <View className="absolute mt-[25]">
                    <TouchableOpacity className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                        <AntDesign name="arrowleft" size={15} color="white"/>
                    </TouchableOpacity>    
                </View>

                {/* Tabel */}
                <View className="mx-[27] mt-[30]">
                    {/* Row 1 */}
                    <View className="flex-row justify-between my-[10]">
                        <View className="flex-row">
                            {/* Image */}
                            <View className="items-center h-[50] w-[60] justify-center bg-gray-400 rounded-xl">
                                <Text>Item1</Text>
                            </View>
                            {/* Item Description */}
                            <View className="justify-center ml-[15]">
                                <Text className="font-h text-xl">Mie Goreng</Text>
                                <Text className="font-p text-base">Rp125.000</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            {/* Minus */}
                            <TouchableOpacity className="mr-[10] w-[30px] h-[30px] bg-white border-[0.5px] border-gray-300 rounded-full items-center justify-center">
                                <AntDesign name="minus" size={15} color="black" className="p-[5]"/>
                            </TouchableOpacity>
                            {/* Amount */}
                            <Text className="text-xl font-h">
                                1
                            </Text>
                            {/* Plus */}
                            <TouchableOpacity className="ml-[10] w-[30px] h-[30px] bg-white border-[0.5px] border-gray-300 rounded-full items-center justify-center">
                                <AntDesign name="plus" size={15} color="black" className="p-[5]"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Row 2 */}
                    <View className="flex-row justify-between my-[10]">
                        <View className="flex-row">
                            {/* Image */}
                            <View className="items-center h-[50] w-[60] justify-center bg-gray-400 rounded-xl">
                                <Text>Item1</Text>
                            </View>
                            {/* Item Description */}
                            <View className="justify-center ml-[15]">
                                <Text className="font-h text-xl">Mie Goreng</Text>
                                <Text className="font-p text-base">Rp125.000</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            {/* Minus */}
                            <TouchableOpacity className="mr-[10] w-[30px] h-[30px] bg-white border-[0.5px] border-gray-300 rounded-full items-center justify-center">
                                <AntDesign name="minus" size={15} color="black" className="p-[5]"/>
                            </TouchableOpacity>
                            {/* Amount */}
                            <Text className="text-xl font-h">
                                1
                            </Text>
                            {/* Plus */}
                            <TouchableOpacity className="ml-[10] w-[30px] h-[30px] bg-white border-[0.5px] border-gray-300 rounded-full items-center justify-center">
                                <AntDesign name="plus" size={15} color="black" className="p-[5]"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* Payment Summary */}
                <View className="mx-[27]">
                    <Text className="mt-[15] text-[18px] font-h">Ringkasan Pembayaran</Text>
                    <View className="flex-row mt-[8] justify-between">
                        <View>
                            <Text className="text-base font-p">Total Harga</Text>
                        </View>
                        <View>
                            <Text className="text-base font-h">Rp250.000</Text>
                        </View>
                    </View>
                </View>
                {/* Order Button */}
                <View className="mx-[27] mt-[30]">
                    <TouchableOpacity className="bg-[#5A4DF3] h-[50] rounded-xl items-center justify-center">
                        <Text className="text-xl font-h text-white">Pesan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}