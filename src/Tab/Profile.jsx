import React from "react";
import { Image, TouchableOpacity, Text, View, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";

export default function Profile() {
  const nav = useNavigation();
  const { signOut, isLoaded } = useAuth();

  const signOutHandler = async() => {
    if (!isLoaded) {
      return null;
    }
    await signOut();
  }

  const aboutPageHandler = () => {
    nav.push("AboutApp")
  }

  const helpPageHandler = () => {
    nav.push("HelpSupport")
  }

  const myAccountPageHandler = () => {
    nav.push("MyAccount")
  }
  return (
    <View>
      <View>
        <Text className="font-medium text-center text-3xl mt-8 pt-16">Profile</Text>
      </View>
    
    <TouchableOpacity>
      <View className="flex-row items-center bg-[#5A4DF3] rounded-xl px-4 shadow-xl h-[88] mx-[27] my-[30]">
        <View className= "bg-white rounded-full h-[60] w-[60]"></View>
        <View className="-mx-[57]">
          <Image source={images.profpic} className="h-[54] w-[54]"/>
        </View>
        <Text className="font-semibold text-2xl ml-[70] text-white mb-6">Vania Salsabila</Text>
        <Text className="font-semibold text-md text-white text-left mt-8 -ml-[135] mb-2">Retail-Grosir</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={myAccountPageHandler}>
      <View className="flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]"></View>
        <View className="-mx-[44]">
          <Image source={images.user} className="h-7 w-7"/>
        </View>
        <Text className="font-semibold text-lg ml-[72] text-black mb-6">My Account</Text>
        <Text className="font-normal font-p text-md text-[#ABABAB] text-left mt-6 -ml-[85] mb-2">Make changes to your account</Text>
        <TouchableOpacity className="px-12">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={signOutHandler}>
      <View className="flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]"></View>
        <View className="-mx-[41]">
          <Image source={images.logout} className="h-7 w-7"/>
        </View>
        <Text className="font-semibold text-lg ml-[68] text-[#F13131] mb-6">Logout</Text>
        <Text className="font-p font-normal text-[#ABABAB] text-left mt-6 -ml-[50] mb-2">Further secure your account for safety</Text>
        <TouchableOpacity className="-px-[4]">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

      <View>
        <Text className="text-left ml-10 font-p font-medium text-lg mt-3" >More</Text>
      </View>
    
    <TouchableOpacity onPress={helpPageHandler}>
      <View className="flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]"></View>
        <View className="-mx-[43]">
          <Image source={images.helpsupport} className="h-7 w-7"/>
        </View>
        <Text className="font-semibold text-lg ml-[75] text-black mb-6 mt-6">Help & Support</Text>
        <TouchableOpacity className="px-[103]">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={aboutPageHandler}>
      <View className="flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]"></View>
        <View className="-mx-[44]">
          <Image source={images.aboutapp} className="h-7 w-7"/>
        </View>
        <Text className="font-semibold text-lg ml-[78] text-black mb-6 mt-6">About App</Text>
        <TouchableOpacity className="px-[133]">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

    </View>
  );
}