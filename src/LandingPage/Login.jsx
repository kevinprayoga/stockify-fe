import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSignIn, useSession } from "@clerk/clerk-expo";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { session } = useSession();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk visibilitas password

  const { setOrigin } = useAuth();
  const nav = useNavigation();

  const backHandler = () => {
    nav.navigate("Landing2");
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return null;
    }
    console.log('test');

    try {
      if (!session) {
        const completeSignIn = await signIn.create({
          identifier: emailAddress,
          password,
        });
        await setActive({ session: completeSignIn.createdSessionId });
        console.log("User is signed in");
        setOrigin('login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="bg-bg h-screen">
      <View className="flex mx-8 mt-20">
        <TouchableOpacity title="Back" onPress={backHandler} className="rounded-full mr-80 p-1.5 bg-primary">
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="font-h text-black text-2xl font-medium mt-10">Masuk Akun</Text>
        <Text className="font-p text-vSmallFont text-base mt-0.5">Masuk sesuai akun Anda!</Text>
        <View className="flex mt-5">
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6">
            <TextInput 
              placeholder="Email"
              placeholderTextColor="#9CA3AF" 
              value={emailAddress}
              onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
              inputMode="email" 
              autoCapitalize="none"
              autoFocus
            />
          </View>
          <View className="bg-white rounded-lg px-2 h-14 mx-4 mt-6 flex-row items-center">
            <TextInput 
              placeholder="Password" 
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={(password) => setPassword(password)}
              className="mx-3 font-p text-base text-smallFont rounded-lg h-14 flex-1" 
              autoCapitalize="none" 
              secureTextEntry={!passwordVisible} // Control visibilitas password
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} className="mr-1">
              <Feather name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onSignInPress} className="bg-primary mx-4 mt-8 py-4 rounded-lg shadow shadow-[#3A8DEC]">
            <Text className="font-p text-xl text-white font-semibold text-center">Masuk</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-p text-vSmallFont text-small mt-3 text-center font-semibold">Belum punya akun?
          <Text onPress={() => (nav.navigate("Register"))} className="text-primary font-semibold"> Daftar akun</Text>
        </Text>
      </View>
    </View>
  );
};
