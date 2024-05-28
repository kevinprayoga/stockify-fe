import React from "react";
import { Image, TouchableOpacity, Text, View, TextInput, ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";

export default function Stock() {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('../../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Medium": require('../../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Light": require('../../assets/fonts/Poppins-Light.ttf'),
  });

  const nav = useNavigation();

  const addProductPageHandler = () => {
    nav.push("AddProduct")
  };

  return (
    <View className="bg-[#F5F6F7]">
      <ScrollView className="h-screen bg-[#F5F6F7] mt-[50]">
        <View className="flex-row justify-between items-center mx-[27]">
          <View>
            <Text className="text-[20px] font-s">Item (43)</Text>
          </View>
          <View>
            <TouchableOpacity onPress={addProductPageHandler} className="h-[50] w-[130] rounded-3xl bg-[#5A4DF3] flex-row items-center justify-between px-[15]">
              <View>
                <Text className="text-white text-sm font-s">Tambah</Text>
                <Text className="text-white text-sm font-s">Produk</Text>
              </View>
              <View>
                <MaterialIcons name="add-circle" size={30} color="white"/>      
              </View>
            </TouchableOpacity> 
          </View>
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
                        <Image source={images.stocklogo} className="h-6 w-6"/> 
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
                        <Image source={images.stocklogo} className="h-6 w-6"/> 
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
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg mx-auto items-center justify-center">
                        <Image source={images.stocklogo} className="h-6 w-6"/> 
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
                        <Image source={images.stocklogo} className="h-6 w-6"/> 
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
                      <TouchableOpacity className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg mx-auto items-center justify-center">
                        <Image source={images.stocklogo} className="h-6 w-6"/> 
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
                        <Image source={images.stocklogo} className="h-6 w-6"/> 
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