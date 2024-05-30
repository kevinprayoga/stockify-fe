import React from "react";
import { Image, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { images } from "../../constants";

export default function PopupDelete() {
  return (
    <View>
      <View className="m-auto bg-white rounded-3xl ml-12 h-[400] w-[300] my-40 justify-between items-center">
        <View className="-mx-[57]">
          <Image source={images.logout2} className="h-[150] w-[150] ml-12 mt-8"/>
            <Text className="text-3xl font-p font-semibold text-[#F13131] text-center">Logout</Text>
            <Text className="text-[16px] font-p font-normal text-black text-center mt-6">Are you sure you want to logout {'\n'} your accoount?</Text>
        </View>

        <TouchableOpacity className="flex-auto">
          <View className= "bg-white border-black border-2 rounded-lg h-[45] w-[120] m-auto my-[15px] mr-32 mt-12">
            <Text className="text-lg font-p font-semibold text-black text-center mt-1">Cancel</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className= "bg-[#F13131] rounded-lg h-[45] w-[120] m-auto my-[40px] ml-32 mt-12">
            <Text className="text-lg font-p font-semibold text-white text-center mt-2">Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}