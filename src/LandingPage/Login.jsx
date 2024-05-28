import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
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
  const [submitPressed, setSubmitPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setOrigin } = useAuth();
  const nav = useNavigation();

  const backHandler = () => {
    nav.navigate("Landing2");
    setSubmitPressed(false);
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return null;
    }

    setSubmitPressed(true);
    setErrorMessage('');

    try {
      if (!session) {
        const completeSignIn = await signIn.create({
          identifier: emailAddress,
          password,
        });
        await setActive({ session: completeSignIn.createdSessionId });
        console.log("User is signed in");
        setOrigin('login');
        setSubmitPressed(false);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('Email atau password salah');
    }
  };

  const getInputStyle = (inputValue) => {
    return inputValue || !submitPressed
      ? "bg-white rounded-lg px-2 h-14 mx-4 mt-6"
      : "bg-white rounded-lg px-2 h-14 mx-4 mt-6 border-2 border-red-500";
  };

  const getInputPWStyle = (inputValue) => {
    return inputValue || !submitPressed
      ? "bg-white rounded-lg px-2 h-14 mx-4 mt-6 flex-row items-center"
      : "bg-white rounded-lg px-2 h-14 mx-4 mt-6 flex-row items-center border-2 border-red-500";
  };

  return (
    <View className="bg-bg h-screen">
      <View className="flex items-center justify-center h-screen">
        <ScrollView className="flex mx-8 mt-20">
          <TouchableOpacity title="Back" onPress={backHandler} className="rounded-full mr-72 p-1.5 bg-primary">
            <Ionicons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <Text className="font-m text-black text-2xl font-medium mt-7">Masuk Akun</Text>
          <Text className="font-r text-vSmallFont text-base mt-0.5">Masuk sesuai akun Anda!</Text>
          {errorMessage ? (
              <Text className="font-r text-red-500 mt-2">{errorMessage}</Text>
          ) : null}
          <View className="flex mt-7">
            <View className={getInputStyle(emailAddress)}>
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
            <View className={getInputPWStyle(password)}>
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
              <Text className="font-s text-xl text-white font-semibold text-center">Masuk</Text>
            </TouchableOpacity>
          </View>
          <Text className="font-s text-vSmallFont text-small mt-3 text-center font-semibold">Belum punya akun?
            <Text onPress={() => (nav.navigate("Register"))} className="text-primary font-semibold"> Daftar akun</Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};
