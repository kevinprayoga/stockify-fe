import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

export default function Cart() {
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
          <Text className="text-2xl font-s">Keranjang</Text>
          <Text className="text-xl font-s">Check Out</Text>
        </View> 

        <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] mt-[30] mb-[5]">
          <Octicons name="search" size={20} color="#9CA3AF"/>
          <TextInput placeholder="Cari Produk" placeholderTextColor="#9CA3AF" className="ml-[10] font-l bg-white text-base rounded-lg h-[45] flex-1"></TextInput>
        </View> 
        <View className="items-center mx-[20] mb-[130px]">
          {/* Row 1 */}
          <View className="w-full flex-row my-[10] justify-between ">
            {/* Col 1 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-[18px] font-b">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-s">10</Text><Text className="font-r text-gray-500"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[18px] font-s">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg mx-auto items-center justify-center">
                        <AntDesign name="plus" size={23} color="white" className=""/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Col 2 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-[18px] font-b">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-s">10</Text><Text className="font-r text-gray-500"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[18px] font-s">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg mx-auto items-center justify-center">
                        <AntDesign name="plus" size={23} color="white" className=""/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Row 2 */}
          <View className="w-full flex-row my-[10] justify-between ">
            {/* Col 1 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-[18px] font-b">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-s">10</Text><Text className="font-r text-gray-500"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[18px] font-s">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={23} color="white" className=""/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Col 2 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-[18px] font-b">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-s">10</Text><Text className="font-r text-gray-500"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[18px] font-s">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={23} color="white" className=""/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* Row 3 */}
          <View className="w-full flex-row my-[10] justify-between ">
            {/* Col 1 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-[18px] font-b">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-s">10</Text><Text className="font-r text-gray-500"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[18px] font-s">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={23} color="white" className=""/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Col 2 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-[18px] font-b">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-s">10</Text><Text className="font-r text-gray-500"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[18px] font-s">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={23} color="white" className=""/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>  
      </ScrollView>
    </View>
  );
}


