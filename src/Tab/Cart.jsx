import React from "react";
import { ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function Cart() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf')
  });

  return (
    <View className="bg-[#F5F6F7]">
      <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
        <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] mt-[30] mb-[5]">
          <Octicons name="search" size={20} color="#9CA3AF"/>
          <TextInput placeholder="Cari Produk" placeholderTextColor="#9CA3AF" className="ml-[10] font-p bg-white text-base rounded-lg shadow h-[45] flex-1">
          </TextInput>
        </View> 
        <View className="items-center mx-[20]">
          {/* Row 1 */}
          <View className="w-full flex-row my-[10] justify-between ">
            {/* Col 1 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-[18px] font-h">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-h">10</Text><Text className="font-p"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[17px] font-h">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[30px] h-[30px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={15} color="white" className="p-[5]"/>
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
                  <Text className="text-[18px] font-h">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-h">10</Text><Text className="font-p"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[17px] font-h">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[30px] h-[30px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={15} color="white" className="p-[5]"/>
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
                  <Text className="text-[18px] font-h">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-h">10</Text><Text className="font-p"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[17px] font-h">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[30px] h-[30px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={15} color="white" className="p-[5]"/>
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
                  <Text className="text-[18px] font-h">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-h">10</Text><Text className="font-p"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[17px] font-h">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[30px] h-[30px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={15} color="white" className="p-[5]"/>
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
                  <Text className="text-[18px] font-h">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-h">10</Text><Text className="font-p"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[17px] font-h">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[30px] h-[30px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={15} color="white" className="p-[5]"/>
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
                  <Text className="text-[18px] font-h">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-h">10</Text><Text className="font-p"> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[17px] font-h">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[30px] h-[30px] bg-[#5A4DF3] rounded-lg items-center justify-center">
                        <AntDesign name="plus" size={15} color="white" className="p-[5]"/>
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


