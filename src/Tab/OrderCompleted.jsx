import React from "react";
import { ScrollView, Text, TextInput, Touchable, TouchableOpacity, View, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { images } from "../../constants";

export default function OrderCompleted() {
  return (
    <View className="h-screen bg-[#5A4DF3] items-center justify-center">
        <View className="bg-white h-[300] w-[240] rounded-3xl items-center">
            <Image source={images.order_completed} className="mt-[30]"/>
            <Text className="text-2xl font-bold text-[#5A4DF3] mt-[20]">Pesanan Selesai</Text>
            <Text className="text-base mt-[10]">Transaksi telah masuk ke riwayat</Text>
            <TouchableOpacity className="w-[80] h-[30] rounded-lg bg-[#5A4DF3] items-center justify-center mt-[15]">
                <Text className="text-white font-bold">Cek Riwayat</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[80] h-[30] rounded-lg border border-[#5A4DF3] items-center justify-center mt-[10]">
                <Text className="text-[#5A4DF3] font-bold">Kembali</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}