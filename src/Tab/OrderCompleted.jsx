import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { images } from "../../constants";
import { useFonts } from 'expo-font';

export default function OrderCompleted() {
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf')
    });

    return (
        <View className="h-screen bg-[#5A4DF3] items-center justify-center">
            <View className="bg-white h-[300] w-[240] rounded-3xl items-center">
                <Image source={images.order_completed} className="mt-[30]"/>
                <Text className="font-h text-2xl text-[#5A4DF3] mt-[20]">Pesanan Selesai</Text>
                <Text className="font-p mt-[10]">Transaksi telah masuk ke riwayat</Text>
                <TouchableOpacity className="w-[90] h-[30] rounded-lg bg-[#5A4DF3] items-center justify-center mt-[15]">
                    <Text className="text-white font-h">Cek Riwayat</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-[90] h-[30] rounded-lg border border-[#5A4DF3] items-center justify-center mt-[10]">
                    <Text className="text-[#5A4DF3] font-h">Kembali</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}