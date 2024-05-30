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
    "Poppins-SemiBold": require('../../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Medium": require('../../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Light": require('../../assets/fonts/Poppins-Light.ttf'),
  });

  return (
    <View className="bg-[#F5F6F7]">
      <ScrollView className="mt-[50] h-screen bg-[#F5F6F7]">
        <View className="justify-center items-center mx-[27] h-[50]">
          <Text className="text-2xl font-s">Riwayat</Text>
          <Text className="text-xl font-s">Transaksi</Text>
        </View> 
        
        <View className="mt-[30] mb-[130px]">
          {/* Box Selesai */}
          <View className="mb-[10] mx-[27] bg-white rounded-lg p-[15] shadow">
            {/* ID & Date*/}
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
              <Text className="text-lg font-b">#0376</Text>
              <Text className="text-[13px] text-gray-400 font-r">20/03/2024</Text>
            </View>
            {/* Item & Total Harga */}
            <View className="flex-row justify-between items-center border-bottom pt-[8]">
              <View className="flex-row">
                <Text className="text-[17px] font-l text-gray-500">Jumlah Item: </Text><Text className="text-[17px] font-s">5</Text>
              </View>
              <View className="">
                <View className="flex-row">
                  <Text className="text-[15px] font-l text-gray-500">Total: </Text><Text className="text-[15px] font-b">Rp200.000</Text>
                </View>
                {/* Detail Button */}
                <View className="flex-row justify-end items-center border-bottom mt-[10]">
                  <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                    <Text className="text-white text-[15px] font-s pt-[3]">Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-[10] mx-[27] bg-white rounded-lg p-[15] shadow">
            {/* ID & Date*/}
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
              <Text className="text-lg font-b">#0376</Text>
              <Text className="text-[13px] text-gray-400 font-r">20/03/2024</Text>
            </View>
            {/* Item & Total Harga */}
            <View className="flex-row justify-between items-center border-bottom pt-[8]">
              <View className="flex-row">
                <Text className="text-[17px] font-l text-gray-500">Jumlah Item: </Text><Text className="text-[17px] font-s">5</Text>
              </View>
              <View className="">
                <View className="flex-row">
                  <Text className="text-[15px] font-l text-gray-500">Total: </Text><Text className="text-[15px] font-b">Rp200.000</Text>
                </View>
                {/* Detail Button */}
                <View className="flex-row justify-end items-center border-bottom mt-[10]">
                  <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                    <Text className="text-white text-[15px] font-s pt-[3]">Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-[10] mx-[27] bg-white rounded-lg p-[15] shadow">
            {/* ID & Date*/}
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
              <Text className="text-lg font-b">#0376</Text>
              <Text className="text-[13px] text-gray-400 font-r">20/03/2024</Text>
            </View>
            {/* Item & Total Harga */}
            <View className="flex-row justify-between items-center border-bottom pt-[8]">
              <View className="flex-row">
                <Text className="text-[17px] font-l text-gray-500">Jumlah Item: </Text><Text className="text-[17px] font-s">5</Text>
              </View>
              <View className="">
                <View className="flex-row">
                  <Text className="text-[15px] font-l text-gray-500">Total: </Text><Text className="text-[15px] font-b">Rp200.000</Text>
                </View>
                {/* Detail Button */}
                <View className="flex-row justify-end items-center border-bottom mt-[10]">
                  <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                    <Text className="text-white text-[15px] font-s pt-[3]">Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-[10] mx-[27] bg-white rounded-lg p-[15] shadow">
            {/* ID & Date*/}
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
              <Text className="text-lg font-b">#0376</Text>
              <Text className="text-[13px] text-gray-400 font-r">20/03/2024</Text>
            </View>
            {/* Item & Total Harga */}
            <View className="flex-row justify-between items-center border-bottom pt-[8]">
              <View className="flex-row">
                <Text className="text-[17px] font-l text-gray-500">Jumlah Item: </Text><Text className="text-[17px] font-s">5</Text>
              </View>
              <View className="">
                <View className="flex-row">
                  <Text className="text-[15px] font-l text-gray-500">Total: </Text><Text className="text-[15px] font-b">Rp200.000</Text>
                </View>
                {/* Detail Button */}
                <View className="flex-row justify-end items-center border-bottom mt-[10]">
                  <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                    <Text className="text-white text-[15px] font-s pt-[3]">Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-[10] mx-[27] bg-white rounded-lg p-[15] shadow">
            {/* ID & Date*/}
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
              <Text className="text-lg font-b">#0376</Text>
              <Text className="text-[13px] text-gray-400 font-r">20/03/2024</Text>
            </View>
            {/* Item & Total Harga */}
            <View className="flex-row justify-between items-center border-bottom pt-[8]">
              <View className="flex-row">
                <Text className="text-[17px] font-l text-gray-500">Jumlah Item: </Text><Text className="text-[17px] font-s">5</Text>
              </View>
              <View className="">
                <View className="flex-row">
                  <Text className="text-[15px] font-l text-gray-500">Total: </Text><Text className="text-[15px] font-b">Rp200.000</Text>
                </View>
                {/* Detail Button */}
                <View className="flex-row justify-end items-center border-bottom mt-[10]">
                  <TouchableOpacity className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                    <Text className="text-white text-[15px] font-s pt-[3]">Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          
        </View>
      </ScrollView>
    </View>
  );
}