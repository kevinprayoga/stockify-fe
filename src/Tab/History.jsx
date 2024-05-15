import React, {useState} from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from 'expo-font';

export default function History() {
  const [isSelesaiActive, setIsSelesaiActive] = useState(true);

  const handleBatalPress = () => {
    setIsSelesaiActive(false);
  };

  const handleSelesaiPress = () => {
    setIsSelesaiActive(true);
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf')
  });

  return (
    <View className="bg-[#F5F6F7]">
      <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
        <View className="items-center mt-[30]">
          <Text className="text-xl font-h">Riwayat Transaksi</Text>
        </View>
        <View className="h-[40] mx-[27] mt-[20] flex-row bg-white rounded-xl">
          <View className="w-1/2 items-center justify-center">
            <TouchableOpacity 
              onPress={handleSelesaiPress}
              className={`items-center justify-center w-11/12 h-4/5 rounded-lg ${isSelesaiActive ? 'bg-[#5A4DF3]' : 'border border-gray-200'}`}>
              <Text className={`text-[17px] font-h pt-[3] ${isSelesaiActive ? 'text-white' : 'text-black'}`}>Selesai</Text>
            </TouchableOpacity>
          </View>  
          <View className="w-1/2 items-center justify-center">
            <TouchableOpacity 
              onPress={handleBatalPress} 
              className={`items-center justify-center w-11/12 h-4/5 rounded-lg ${!isSelesaiActive ? 'bg-[#5A4DF3]' : 'border border-gray-200'}`}>
              <Text className={`text-[17px] font-h pt-[3] ${!isSelesaiActive ? 'text-white' : 'text-black'}`}>Batal</Text>
            </TouchableOpacity>
          </View> 
        </View>
        <View>
          {/* Box Selesai */}
          <View className="mx-[27] bg-white mt-[15] rounded-lg p-[15] shadow">
            {/* ID & Date*/}
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
              <Text className="text-lg font-h">#0376</Text>
              <Text className="text-[13px] text-gray-400 font-p">20/03/2024</Text>
            </View>
            {/* Item & Total Harga */}
            <View className="flex-row justify-between items-center border-bottom pt-[8]">
              <View className="flex-row">
                <Text className="text-[17px] font-h text-gray-500">Item: </Text><Text className="text-[17px] font-h">5</Text>
              </View>
              <View className="flex-row">
                <Text className="text-[17px] font-h text-gray-500">Total: </Text><Text className="text-[17px] font-h">Rp200.000</Text>
              </View>
            </View>
            {/* Status Pembyaran & Detail Button */}
            <View className="flex-row justify-between items-center border-bottom pt-[25]">
              <View className="flex-row">
                <Text className="text-[#27AE60] font-h">Pembayaran Sukses</Text>
              </View>
              <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                <Text className="text-white text-[15px] font-h pt-[3]">Detail</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Box Batal */}
          <View className="mx-[27] bg-white mt-[15] rounded-lg p-[15] shadow">
            {/* ID & Date*/}
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
              <Text className="text-lg font-h">#0376</Text>
              <Text className="text-[13px] text-gray-400 font-p">20/03/2024</Text>
            </View>
            {/* Item & Total Harga */}
            <View className="flex-row justify-between items-center border-bottom pt-[8]">
              <View className="flex-row">
                <Text className="text-[17px] font-h text-gray-500">Item: </Text><Text className="text-[17px] font-h">5</Text>
              </View>
              <View className="flex-row">
                <Text className="text-[17px] font-h text-gray-500">Total: </Text><Text className="text-[17px] font-h">Rp200.000</Text>
              </View>
            </View>
            {/* Status Pembyaran & Detail Button */}
            <View className="flex-row justify-between items-center border-bottom pt-[25]">
              <View className="flex-row">
                <Text className="text-[#F13131] font-h">Pembayaran Batal</Text>
              </View>
              <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                <Text className="text-white text-[15px] font-h pt-[3]">Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}