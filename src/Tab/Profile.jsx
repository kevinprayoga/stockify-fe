import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, Text, View, Modal, ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { API_URL, PORT } from '@env';
import { useSession } from "@clerk/clerk-react";

export default function Profile() {
  const nav = useNavigation();
  const { signOut, isLoaded } = useAuth();
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const { session } = useSession();

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      const token = await session.getToken();
  
      /** Melakukan GET BusinessInfo */
      const businessResponse = await fetch(`${API_URL}:${PORT}/business/${user.id}`);
      if (!businessResponse.ok) {
        throw new Error("Failed to fetch business info");
      }
      const businessResult = await businessResponse.json();
      setBusinessName(businessResult.data[0].businessName);
      console.log('Business Name:', businessName);
    } catch {
      console.error("Error fetching business info");
    }
  };

  const signOutHandler = () => {
    if (!isLoaded) {
      return null;
    }
    setModalVisible(true);
  };

  const confirmSignOutHandler = async () => {
    await signOut();
    setModalVisible(false);
  };

  const cancelSignOutHandler = () => {
    setModalVisible(false);
  };

  const aboutPageHandler = () => {
    nav.push("AboutApp");
  };

  const helpPageHandler = () => {
    nav.push("HelpSupport");
  };

  const myAccountPageHandler = () => {
    nav.push("MyAccount");
  };

  return (
    <ScrollView className="bg-bg h-screen" contentContainerStyle={{ paddingBottom: 40 }}>
      <View>
        <Text className="font-medium text-center text-3xl mt-8 pt-16">Akun</Text>
      </View>
    
      <View className="flex-row items-center bg-[#5A4DF3] rounded-xl px-4 shadow-xl h-[88] mx-[27] my-[30]">
        <View className= "bg-white rounded-full h-[60] w-[60]" />
        <View>
          <View className="-mx-[57]">
            <Image source={images.profpic} className="h-[54] w-[54]"/>
          </View>
        </View>
        <View className="flex ml-3">
          <Text className="font-semibold text-2xl text-white">{user.fullName}</Text>
          <Text className="font-semibold text-md text-white text-left">{businessName}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={myAccountPageHandler} className="relative flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]" />
        <View>
          <View className="-mx-[44]">
            <Image source={images.user} className="h-7 w-7"/>
          </View>
        </View>
        <View className="flex ml-3">
          <Text className="font-semibold text-lg text-black">Akun Bisnis</Text>
          <Text className="font-normal font-p text-md text-[#ABABAB] text-left">Merubah informasi bisnis Anda</Text>
        </View>
        <View className="absolute right-0">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={signOutHandler} className="relative flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]" />
        <View>
          <View className="-mx-[41]">
            <Image source={images.logout} className="h-7 w-7"/>
          </View>
        </View>
        <View className="flex mx-3">
          <Text className="font-semibold text-lg text-[#F13131]">Keluar</Text>
          <Text className="font-p font-normal text-[#ABABAB] text-left">Keluar dari akun Anda</Text>
        </View>
        <View className="absolute right-0">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </View>
      </TouchableOpacity>

      <View>
        <Text className="text-left ml-8 font-p font-medium text-lg mt-3" >More</Text>
      </View>
      
      <TouchableOpacity onPress={helpPageHandler} className="relative flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]" />
        <View>
          <View className="-mx-[43]">
            <Image source={images.helpsupport} className="h-7 w-7"/>
          </View>
        </View>
        <View className="flex mx-3">
          <Text className="font-semibold text-lg text-black">Bantuan</Text>
        </View>
        <View className="absolute right-0">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={aboutPageHandler} className="relative flex-row items-center bg-white rounded-xl px-4 shadow h-[88] mx-[27] my-[10]">
        <View className= "bg-[#555555] opacity-5 rounded-full h-[60] w-[60]" />
        <View>
          <View className="-mx-[44]">
            <Image source={images.aboutapp} className="h-7 w-7"/>
          </View>
        </View>
        <View className="flex mx-3">
          <Text className="font-semibold text-lg text-black">Tentang Aplikasi</Text>
        </View>
        <View className="absolute right-0">
          <MaterialIcons name="keyboard-arrow-right" size={36} color="black" />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="m-auto bg-white rounded-3xl h-[400] w-[300] justify-between items-center p-4 z-20 mt-52">
            <Image source={images.logout2} className="h-[150] w-[150] mt-8"/>
            <Text className="text-3xl font-p font-semibold text-[#F13131] text-center">Keluar</Text>
            <Text className="text-[16px] font-p font-normal text-black text-center mt-6">Apakah yakin ingin keluar {'\n'} akun Anda?</Text>

            <View className="flex-row mt-6 mb-6">
              <TouchableOpacity onPress={cancelSignOutHandler} className="bg-white border-black border-2 rounded-lg h-[45] w-[120] m-2">
                <Text className="text-lg font-p font-semibold text-black text-center mt-1">Kembali</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmSignOutHandler} className="bg-[#F13131] rounded-lg h-[45] w-[120] m-2">
                <Text className="text-lg font-p font-semibold text-white text-center mt-2">Keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-black h-screen w-screen z-0 opacity-50" />
        </View>
      </Modal>
    </ScrollView>
  );
}
