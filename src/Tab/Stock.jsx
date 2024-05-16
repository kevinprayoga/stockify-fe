import React from "react";
import { Image, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { images } from "../../constants";


export default function Stock() {
  return (
    <View className="h-screen bg-[#F5F6F7] flex">
      <Text className="font-medium text-3xl text-left pl-8 pt-16 ">Item(43)</Text>
      <TouchableOpacity className="h-[45] w-[135] rounded-3xl bg-[#5A4DF3] flex ml-auto mr-6 -my-8 ">
        <Text className="font-medium text-white -m-12 -mr-7 py-3 text-xl text-right pr-12 font-poppins -my-0.5">Add Item</Text>
        <View className="-mt-8 mx-3 -my-9">
            <MaterialIcons name="add-circle" size={30} color="white"/>      
        </View>
      </TouchableOpacity>  
      

      <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] my-[45]">
          <Octicons name="search" size={20} color="#9CA3AF"/>
          <TextInput placeholder="Cari Produk" placeholderTextColor="#9CA3AF" className="font-normal text-base ml-2 -mt-1"></TextInput>
      </View>  

      <View className="-mt-8">
      <View className="items-center mx-[20]">
          {/* Row 1 */}
          <View className="w-full flex-row my-[10] justify-between ">
            {/* Col 1 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5]">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-xl font-bold ml12">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-bold ml-1">10</Text><Text> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                    <Text className="text-[21px] font-bold ml-1 mt-2">Rp125.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[40px] h-[40px] bg-[#5A4DF3] rounded-lg mx-auto"></TouchableOpacity>
                      <View className="-mt-9 ml-2 mr-2">
                        <Image source={images.stocklogo} className="h-7 w-7"/>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Col 2 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5]">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item2</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-xl font-bold">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-bold ml-1">5</Text><Text> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                  <Text className="text-[21px] font-bold ml-1 mt-2">Rp15.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[40px] h-[40px] bg-[#5A4DF3] rounded-lg mx-auto"></TouchableOpacity>
                      <View className="-mt-9 ml-2 mr-2">
                        <Image source={images.stocklogo} className="h-7 w-7"/>
                      </View>
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
              <View className="bg-white h-full rounded-2xl mx-[5]">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item1</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-xl font-bold">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-bold ml-1">10</Text><Text> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                  <Text className="text-[21px] font-bold ml-1 mt-2">Rp25.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[40px] h-[40px] bg-[#5A4DF3] rounded-lg mx-auto"></TouchableOpacity>
                      <View className="-mt-9 ml-2 mr-2">
                        <Image source={images.stocklogo} className="h-7 w-7"/>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Col 2 */}
            <View className="w-1/2 h-[240]">
              <View className="bg-white h-full rounded-2xl mx-[5]">
                <View className="items-center justify-center h-1/2 bg-gray-400 rounded-xl m-[10]">
                  <Text>Item2</Text>
                </View>
                <View className="mx-[10]">
                  <Text className="text-xl font-bold">(Nama Produk)</Text>
                  <View className="flex-row">
                    <Text className="font-bold ml-1">5</Text><Text> di stok</Text>
                  </View>
                  <View className="flex-row items-center justify-between mt-[10]">
                  <Text className="text-[21px] font-bold ml-1 mt-2">Rp152.000</Text>
                    <View className="justify-center">
                      <TouchableOpacity className="w-[40px] h-[40px] bg-[#5A4DF3] rounded-lg mx-auto"></TouchableOpacity>
                      <View className="-mt-9 ml-2 mr-2">
                        <Image source={images.stocklogo} className="h-7 w-7"/>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>      
    </View>

    
  );
}