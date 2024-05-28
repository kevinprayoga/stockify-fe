import React from "react";
import { Text, View, ScrollView } from "react-native";

import { Feather, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';

export default function Home() {
  return (
    <View className="bg-bg h-screen">
      <View className="flex h-screen">
        <ScrollView className="flex mx-6 mt-20">
          <View>
            <Text className="font-m text-black text-2xl font-medium">Selamat datang, Vania!</Text>
            <Text className="font-r text-vSmallFont mt-0.5">Semangat Pagi!</Text>
            <View className="border-b border-slate-300 w-full my-4" />
          </View>
          <View className="flex justify-between mx-2 space-y-5">
            <View className="flex-row justify-between">
              <View className="bg-indigo-300 p-4 rounded-2xl">
                <View className="flex-row items-center mb-2">
                  <View className="mr-12">
                    <Text className="font-s font-medium text-sm">Product</Text>
                  </View>
                  <Feather name="archive" size={24} color="black" />
                </View>
                <Text className="font-s font-semibold text-4xl">48</Text>
              </View>
              <View className="bg-red-300 p-4 rounded-2xl">
                <View className="flex-row items-center justify-between mb-2">
                  <View className="mr-5">
                    <Text className="font-s font-medium text-sm text-[#F51818]">Out of Stock</Text>
                  </View>
                  <Ionicons name="archive-outline" size={24} color="red" />
                </View>
                <Text className="font-s font-semibold text-4xl text-[#F51818]">6</Text>
              </View>
            </View>
            <View className="flex-row justify-between pt-4">
              <View className="flex-row items-center border border-slate-300 rounded-md p-2 px-3 space-x-3">
                <View>
                  <Text className="text-[#5533FF]">2024</Text>
                </View>
                <View>
                  <Entypo name="chevron-thin-down" size={15} color="grey" />
                </View>
              </View>
            </View>
            <View className="bg-green-200 p-4 rounded-2xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="font-s font-medium text-lg">Overview</Text>
                <FontAwesome5 name="money-bill-wave" size={24} color="black" />
              </View>
              <View className="flex-row justify-around">
                <View className="flex">
                  <Text className="font-s font-semibold text-base">Rp 1.000.000</Text>
                  <Text className="text-center font-l text-vSmallFont text-xs mt-2">Total Profit</Text>
                </View>
                <View className="flex">
                  <Text className="font-s font-semibold text-base">Rp 3.000.000</Text>
                  <Text className="text-center font-l text-vSmallFont text-xs mt-2">Revenue</Text>
                </View>
              </View>
            </View>
            <View className="bg-white p-4 rounded-2xl">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="font-s font-medium text-lg">Sales Report</Text>
              </View>
              <View className="flex-row justify-start items-center space-x-2">
                <View className="bg-orange-400 h-2 w-2 rounded-lg" />
                <Text className="font-l text-vSmallFont text-sm">Revenue</Text>
              </View>
              <View>
                {/* Chart */}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}