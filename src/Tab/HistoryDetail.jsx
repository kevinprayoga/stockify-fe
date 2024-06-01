import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";

export default function HistoryDetail({route}) {
    const { transaction } = route.params;

    const nav = useNavigation();

    const historyPageHandler = () => {
        nav.navigate("History");
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
      
        // Extract the date components
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
      
        // Format the date as DD/MM/YYYY
        return `${day}/${month}/${year}`;
    };


    return (
        <View className="bg-[#F5F6F7]">
        <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
            {/* Page Title */}
            <View className="items-center mt-[30]">
                <Text className="text-xl font-b">Detail Transaksi</Text>
            </View>

            {/* Back Button */}
            <View className="absolute mt-[25]">
                <TouchableOpacity onPress={historyPageHandler} className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                    <AntDesign name="arrowleft" size={15} color="white"/>
                </TouchableOpacity>    
            </View>

            {/* Card */}
            <ScrollView className="mx-[27] mt-[20] bg-white rounded-xl shadow">
                {/* ID Produk & Status */}
                <View className="border-b border-gray-200 flex-row justify-between items-center p-[15]">
                    <View>
                        <View className="flex-row items-center">
                            <Text className="text-[17px] font-s">ID: </Text>
                            <Text className="text-[17px] font-s text-sm">{transaction.transactionId}</Text>
                        </View>
                        <Text className="text-[13px] text-gray-400 font-p">{formatDate(transaction.createdAt)}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-[#27AE60] font-s pt-[3]">Selesai  </Text>
                        <AntDesign name="checkcircle" size={13} color="#27AE60"/>
                    </View>
                </View>
                {/* Daftar Item */}
                <View className="px-[15] py-[5]">
                    {transaction.transactionItems.map((item) => (
                        <View key={item.transactionItemId} className="flex-row justify-between items-center">
                            <View className="flex-row p-[10]">
                                <Text className="w-[30] font-s">{item.count}</Text><Text className="font-s">{item.nameItem}</Text>
                            </View>
                            <Text className="font-s">Rp{item.priceItem.toLocaleString('id-ID')}</Text>
                        </View>
                    ))}
                    
                </View>
                {/* Total */}
                <View className="bg-[#5A4DF3] rounded-b-lg px-[15] py-[10] flex-row justify-between">
                    <Text className="text-lg text-white font-b">Total</Text>
                    <Text className="text-lg text-white font-b">Rp{transaction.totalPayment.toLocaleString('id-ID')}</Text>
                </View>
            </ScrollView>

        </ScrollView>
        </View>
    );   
}