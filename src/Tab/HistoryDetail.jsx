import React, {useState} from "react";
import { ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';

export default function HistoryDetail() {
  const [isSelesaiActive, setIsSelesaiActive] = useState(true);

  const handleBatalPress = () => {
    setIsSelesaiActive(false);
  };

  const handleSelesaiPress = () => {
    setIsSelesaiActive(true);
  };

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

        <View className="mx-[27] mt-[20] bg-white rounded-xl p-[15]">
            <View className="border-b border-gray-200 flex-row justify-between items-center ">
                <View className="pb-[8]">
                    <Text className="text-xl font-bold">#0376</Text>
                    <Text className="text-[13px] text-gray-400">20/03/2024</Text>
                </View>
                <View className="flex-row items-center">
                    <Text className="text-[#27AE60] font-bold">Selesai </Text>
                    <AntDesign name="checkcircle" size={13} color="#27AE60" />
                </View>
            </View>
            {/* Daftar Item */}
            <View>
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
                    <Text>Rp125.000</Text>
                </View>
            </View>
            {/* Total */}
            <View>
                
            </View>
        </View>



        <View>
            {/* Box Selesai */}
            <View className="mx-[27] bg-white mt-[15] rounded-lg p-[15] shadow">
                <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
                <Text className="text-lg font-bold">#0376</Text>
                <Text className="text-[13px] text-gray-400">20/03/2024</Text>
                </View>
                <View className="flex-row justify-between items-center border-bottom pt-[8]">
                <View className="flex-row">
                    <Text className="text-lg font-bold text-gray-500">Item: </Text><Text className="text-lg font-bold">5</Text>
                </View>
                <View className="flex-row">
                    <Text className="text-lg font-bold text-gray-500">Total: </Text><Text className="text-lg font-bold">Rp200.000</Text>
                </View>
                </View>
                <View className="flex-row justify-between items-center border-bottom pt-[25]">
                <View className="flex-row">
                    <Text className="text-[#27AE60] font-bold">Pembayaran Sukses</Text>
                </View>
                <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                    <Text className="text-white text-lg font-bold">Detail</Text>
                </TouchableOpacity>
                </View>
            </View>

            {/* Box Batal */}
            <View className="mx-[27] bg-white mt-[15] rounded-lg p-[15] shadow">
                <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
                <Text className="text-lg font-bold">#0376</Text>
                <Text className="text-[13px] text-gray-400">20/03/2024</Text>
                </View>
                <View className="flex-row justify-between items-center border-bottom pt-[8]">
                <View className="flex-row">
                    <Text className="text-lg font-bold text-gray-500">Item: </Text><Text className="text-lg font-bold">5</Text>
                </View>
                <View className="flex-row">
                    <Text className="text-lg font-bold text-gray-500">Total: </Text><Text className="text-lg font-bold">Rp200.000</Text>
                </View>
                </View>
                <View className="flex-row justify-between items-center border-bottom pt-[25]">
                <View className="flex-row">
                    <Text className="text-[#F13131] font-bold">Pembayaran Batal</Text>
                </View>
                <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                    <Text className="text-white text-lg font-bold">Detail</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}