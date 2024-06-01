import React, { useState, useCallback } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, BackHandler } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useSession } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-expo";
import { API_URL, PORT } from '@env';

export default function BusinessInfo() {
  const [nameBisnis, setNameBisnis] = useState('');
  const [alamat, setAlamat] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [pos, setPos] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk mengatur submit status
  const { setOrigin } = useAuth();
  const { session } = useSession();
  const { user } = useUser();
  const nav = useNavigation();

  const handleSubmit = async () => {
    setSubmitPressed(true);
    setErrorMessage('');

    if (!nameBisnis || !alamat || !provinsi || !kota || !kecamatan || !pos) {
      setErrorMessage('Semua field harus diisi');
      return;
    }

    const payload = {
      businessName: nameBisnis,
      businessAddress: alamat,
      province: provinsi,
      city: kota,
      kecamatan: kecamatan,
      posCode: pos,
      userID: user.id,
    };

    try {
      const token = await session.getToken();
      /** Ganti Ip sesuai ip address network kalian di laptop masing2 */
      const response = await fetch(`${API_URL}:${PORT}/business`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      console.log('Payload:');
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        setIsSubmitting(true);
        nav.push('TabHome');
        setSubmitPressed(false);
        setOrigin(null);
      } else {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        setErrorMessage('Gagal menyimpan data bisnis');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Gagal menyimpan data bisnis');
    }
  };

  const getInputStyle = (inputValue) => {
    return inputValue || !submitPressed 
      ? "bg-white rounded-lg px-2 h-14 mx-4 mt-6"
      : "bg-white rounded-lg px-2 h-14 mx-4 mt-6 border-2 border-red-500";
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (!isSubmitting) {
          setErrorMessage('Lengkapi data bisnis anda!');
          return true;
        }
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isSubmitting])
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View className="bg-bg h-screen">
          <View className="flex h-screen">
            <ScrollView className="flex mx-8 mt-20">
              <Text className="font-m text-black text-2xl font-medium mt-7">Informasi Bisnis</Text>
              <Text className="font-r text-vSmallFont text-base mt-0.5">Masukkan informasi bisnis Anda!</Text>
              {errorMessage ? (
                <Text className="font-r text-red-500 mt-2">{errorMessage}</Text>
              ) : null}
              <View className="flex mt-7">
                <View className={getInputStyle(nameBisnis)}>
                  <TextInput
                    placeholder="Nama Bisnis"
                    placeholderTextColor="#9CA3AF"
                    value={nameBisnis}
                    onChangeText={(nameBisnis) => setNameBisnis(nameBisnis)}
                    className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  />
                </View>
                <View className={getInputStyle(alamat)}>
                  <TextInput
                    placeholder="Alamat Bisnis"
                    placeholderTextColor="#9CA3AF"
                    value={alamat}
                    onChangeText={(alamat) => setAlamat(alamat)}
                    className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  />
                </View>
                <View className={getInputStyle(provinsi)}>
                  <TextInput
                    placeholder="Provinsi"
                    placeholderTextColor="#9CA3AF"
                    value={provinsi}
                    onChangeText={(provinsi) => setProvinsi(provinsi)}
                    className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  />
                </View>
                <View className={getInputStyle(kota)}>
                  <TextInput
                    placeholder="Kota/Kabupaten"
                    placeholderTextColor="#9CA3AF"
                    value={kota}
                    onChangeText={(kota) => setKota(kota)}
                    className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  />
                </View>
                <View className={getInputStyle(kecamatan)}>
                  <TextInput
                    placeholder="Kecamatan"
                    placeholderTextColor="#9CA3AF"
                    value={kecamatan}
                    onChangeText={(kecamatan) => setKecamatan(kecamatan)}
                    className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  />
                </View>
                <View className={getInputStyle(pos)}>
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
