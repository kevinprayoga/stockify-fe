import React, { useState, useCallback } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, BackHandler, ActivityIndicator, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useStore from '../context/store';

// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { signOut } from "firebase/auth";
// import { auth } from "../../config/firebaseConfig";

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

  const userId = useStore(state => state.userId);
  const setBusinessId = useStore(state => state.setBusinessId);

  // const clearUserId = useStore(state => state.clearUserId);
  // const clearUserGoogleId = useStore(state => state.clearUserGoogleId);
  // const userGoogleId = useStore(state => state.userGoogleId);

  const handleSubmit = async () => {
    // await GoogleSignin.revokeAccess();
    // await GoogleSignin.signOut();
    // clearUserGoogleId();
    // await signOut(auth);
    // clearUserId();
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
      userID: userId,
    };
    console.log('Payload:', payload);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      console.log('Response:', response);
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response data:', responseData);
        setBusinessId(responseData.data.businessId);
        setSubmitPressed(false);
      } else {
        const errorData = await response.json();
        console.log('Error data:', errorData);
        setErrorMessage('Gagal menyimpan data bisnis');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Gagal menyimpan data bisnis');
    } finally {
      setIsSubmitting(false); // Set isSubmitting to false after the submit is complete
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
                  {isSubmitting ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="#0000ff" />
                      <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                  ) : (
                    <Text className="font-s text-xl text-white font-semibold text-center">Simpan</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
  },
});