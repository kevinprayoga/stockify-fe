import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { useSession } from "@clerk/clerk-react";
import { API_URL, PORT } from '@env';

export default function MyAccount() {
  const [nameBisnis, setNameBisnis] = useState('');
  const [alamat, setAlamat] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [pos, setPos] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { session } = useSession();
  const { user } = useUser();
  const nav = useNavigation();

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const token = await session.getToken();
      const response = await fetch(`${API_URL}:${PORT}/business/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch business info");
      }

      const businessResult = await response.json();
      const businessData = businessResult.data[0];

      setNameBisnis(businessData.businessName);
      setAlamat(businessData.businessAddress);
      setProvinsi(businessData.province);
      setKota(businessData.city);
      setKecamatan(businessData.kecamatan);
      setPos(businessData.posCode);
    } catch (error) {
      console.error("Error fetching business data:", error);
      setErrorMessage('Gagal mengambil data bisnis');
    }
  };

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
      posCode: pos
    };

    try {
      const token = await session.getToken();

      const businessResponse = await fetch(`${API_URL}:${PORT}/business/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!businessResponse.ok) {
        throw new Error("Failed to fetch business info");
      }

      const businessResult = await businessResponse.json();
      const businessId = businessResult.data[0].businessId;

      const response = await fetch(`${API_URL}:${PORT}/business/${businessId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsEditing(false);
        fetchBusinessData();
        nav.navigate('Profile');
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        setErrorMessage('Gagal memperbarui data bisnis');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Gagal memperbarui data bisnis');
    }
  };

  const getInputStyle = (inputValue) => {
    const baseStyle = "bg-white rounded-lg px-2 h-14 mx-4 mt-3";
    const errorStyle = !inputValue && submitPressed ? "border-2 border-red-500" : "";
    const editStyle = isEditing ? "border-2 border-[#5A4DF3]" : "";

    return `${baseStyle} ${errorStyle} ${editStyle}`;
  };

  const backHandler = () => {
    nav.navigate("Profile");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="bg-bg h-screen">
        <View className="flex h-screen">
          <ScrollView className="flex mx-8 mt-20 mb-20" contentContainerStyle={{ paddingBottom: 40 }}>
            <View className="flex-row relative">
              <TouchableOpacity title="Back" onPress={backHandler} className="rounded-full p-1.5 mb-6 bg-primary">
                <Ionicons name="arrow-back" size={25} color="white" />
              </TouchableOpacity>
              <Text className="font-m text-black text-2xl font-medium ml-6 mt-1">Informasi Bisnis</Text>
              <TouchableOpacity className="absolute right-3 mt-2" onPress={() => setIsEditing(!isEditing)}>
                <MaterialIcons name="edit" size={28} color="#5A4DF3" />
              </TouchableOpacity>
            </View>
            {errorMessage ? (
              <Text className="font-r text-red-500 mt-2">{errorMessage}</Text>
            ) : null}
            <View className="flex mt-7">
              <Text className="font-r text-vSmallFont text-base mx-4">Nama Bisnis</Text>
              <View className={getInputStyle(nameBisnis)}>
                <TextInput
                  placeholder="Nama Bisnis"
                  placeholderTextColor="#9CA3AF"
                  value={nameBisnis}
                  onChangeText={(nameBisnis) => setNameBisnis(nameBisnis)}
                  className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  editable={isEditing}
                />
              </View>
              <Text className="font-r text-vSmallFont text-base mx-4 mt-4">Alamat</Text>
              <View className={getInputStyle(alamat)}>
                <TextInput
                  placeholder="Alamat Bisnis"
                  placeholderTextColor="#9CA3AF"
                  value={alamat}
                  onChangeText={(alamat) => setAlamat(alamat)}
                  className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  editable={isEditing}
                />
              </View>
              <Text className="font-r text-vSmallFont text-base mx-4 mt-4">Provinsi</Text>
              <View className={getInputStyle(provinsi)}>
                <TextInput
                  placeholder="Provinsi"
                  placeholderTextColor="#9CA3AF"
                  value={provinsi}
                  onChangeText={(provinsi) => setProvinsi(provinsi)}
                  className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  editable={isEditing}
                />
              </View>
              <Text className="font-r text-vSmallFont text-base mx-4 mt-4">Kota/Kabupaten</Text>
              <View className={getInputStyle(kota)}>
                <TextInput
                  placeholder="Kota/Kabupaten"
                  placeholderTextColor="#9CA3AF"
                  value={kota}
                  onChangeText={(kota) => setKota(kota)}
                  className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  editable={isEditing}
                />
              </View>
              <Text className="font-r text-vSmallFont text-base mx-4 mt-4">Kecamatan</Text>
              <View className={getInputStyle(kecamatan)}>
                <TextInput
                  placeholder="Kecamatan"
                  placeholderTextColor="#9CA3AF"
                  value={kecamatan}
                  onChangeText={(kecamatan) => setKecamatan(kecamatan)}
                  className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  editable={isEditing}
                />
              </View>
              <Text className="font-r text-vSmallFont text-base mx-4 mt-4">Kode Pos</Text>
              <View className={getInputStyle(pos)}>
                <TextInput
                  placeholder="Kode Pos"
                  placeholderTextColor="#9CA3AF"
                  value={pos}
                  onChangeText={(pos) => setPos(pos)}
                  className="mx-3 font-p text-base text-smallFont rounded-lg h-14"
                  editable={isEditing}
                />
              </View>
              {isEditing && (
                <TouchableOpacity onPress={handleSubmit} className="bg-primary mx-4 mt-8 py-4 rounded-lg shadow shadow-[#3A8DEC]">
                  <Text className="font-s text-xl text-white font-semibold text-center">Simpan</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
