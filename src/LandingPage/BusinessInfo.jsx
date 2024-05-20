import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BusinessInfo() {
  const [nameBisnis, setNameBisnis] = useState('');
  const [alamat, setAlamat] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [pos, setPos] = useState('');

  const nav = useNavigation();

  const handleSubmit = async() => {
    nav.push("TabHome");
  };

  return (
    <View className="bg-bg h-screen">
      <View className="flex items-center justify-center h-screen"></View>
        <ScrollView className="flex mx-8 mt-20">
          <Text className="font-m text-black text-2xl font-medium mt-10">Informasi Bisnis</Text>
          <Text className="font-r text-vSmallFont text-base mt-0.5">Masukkan informasi bisnis Anda!</Text>
          <View className="flex mt-5">
            <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
              <TextInput 
                placeholder="Nama Bisnis" 
                placeholderTextColor="#9CA3AF"
                value={nameBisnis}
                onChangeText={(nameBisnis) => setNameBisnis(nameBisnis)}
                className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              />
            </View>
            <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
              <TextInput 
                placeholder="Alamat Bisnis" 
                placeholderTextColor="#9CA3AF"
                value={alamat}
                onChangeText={(alamat) => setAlamat(alamat)}
                className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
              />
            </View>
            <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
              <TextInput 
                placeholder="Provinsi"
                placeholderTextColor="#9CA3AF" 
                value={provinsi}
                onChangeText={(provinsi) => setProvinsi(provinsi)}
                className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              />
            </View>
            <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
              <TextInput 
                placeholder="Kota/Kabupaten" 
                placeholderTextColor="#9CA3AF" 
                value={kota}
                onChangeText={(kota) => setKota(kota)}
                className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              />
            </View>
            <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
              <TextInput 
                placeholder="Kecamatan" 
                placeholderTextColor="#9CA3AF"
                value={kecamatan}
                onChangeText={(kecamatan) => setKecamatan(kecamatan)}
                className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              />
            </View>
            <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
              <TextInput 
                placeholder="Kode Pos" 
                placeholderTextColor="#9CA3AF"
                value={pos}
                onChangeText={(pos) => setPos(pos)}
                className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              />
            </View>
            <TouchableOpacity onPress={handleSubmit} className="bg-primary mx-4 mt-8 py-4 rounded-lg shadow shadow-[#3A8DEC]">
              <Text className="font-s text-xl text-white font-semibold text-center">Simpan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      <View className="flex items-center justify-center h-screen"></View>
    </View>
  );
};
