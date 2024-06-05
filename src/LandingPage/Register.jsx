import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSignUp } from "@clerk/clerk-expo";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { images } from "../../constants";
import { useAuth } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setOrigin } = useAuth();
  const nav = useNavigation();

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPressGoogle = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        setOrigin('register');
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const backHandler = () => {
    nav.navigate("Landing2");
    setSubmitPressed(false);
    setErrorMessage('');
  };

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return null;
    }

    setSubmitPressed(true);
    setErrorMessage('');

    if (!firstName || !lastName || !emailAddress || !password) {
      setErrorMessage('Semua field harus diisi');
      return;
    }

    if (!emailAddress.endsWith('@gmail.com')) {
      setErrorMessage('Email harus menggunakan @gmail.com');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password harus memiliki setidaknya 8 karakter');
      return;
    }

    const signUpData = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    console.log("Attempting to sign up with data:", signUpData);

    try {
      await signUp.create(signUpData);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("Creating sign up");
      setPendingVerification(true);
      setSubmitPressed(false);
    } catch (err) {
      console.error("Error during sign up:", JSON.stringify(err, null, 2));
      setErrorMessage('Terjadi kesalahan saat mendaftar.');
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return null;
    }

    setSubmitPressed(true);
    setErrorMessage('');

    if (!code) {
      setErrorMessage('Kode verifikasi harus diisi.');
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      await setActive({ session: completeSignUp.createdSessionId });
      console.log("berhasil");
      setOrigin('register');
      setSubmitPressed(false);
    } catch (err) {
      console.error("Error during verification:", JSON.stringify(err, null, 2));
      setErrorMessage('Kode verifikasi salah.');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-bg h-screen">
          {!pendingVerification && (
            <View className="flex h-screen">
              <ScrollView className="flex mx-8 mt-20">
                <View className="flex-row">
                  <TouchableOpacity title="Back" onPress={backHandler} className="rounded-full p-1.5 bg-primary">
                    <Ionicons name="arrow-back" size={25} color="white" />
                  </TouchableOpacity>
                </View>
                <Text className="font-m text-black text-2xl font-medium mt-7">Pendaftaran Akun</Text>
                <Text className="font-r text-vSmallFont text-base mt-0.5">Lengkapi informasi profile Anda!</Text>
                {errorMessage ? (
                  <Text className="font-r text-red-500 mt-2">{errorMessage}</Text>
                ) : null}
                <View className="flex mt-7">
                  <Text className="font-m text-mediumFont font-medium text-lg">Detail Akun</Text>
                  <View className={getInputStyle(firstName)}>
                    <TextInput 
                      placeholder="Nama Pertama" 
                      placeholderTextColor="#9CA3AF"
                      value={firstName}
                      onChangeText={(firstName) => setFirstName(firstName)}
                      className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
                      autoFocus
                    />
                  </View>
                  <View className={getInputStyle(lastName)}>
                    <TextInput 
                      placeholder="Nama Terakhir" 
                      placeholderTextColor="#9CA3AF"
                      value={lastName}
                      onChangeText={(lastName) => setLastName(lastName)}
                      className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
                    />
                  </View>
                  <View className={getInputStyle(emailAddress)}>
                    <TextInput 
                      placeholder="Email"
                      placeholderTextColor="#9CA3AF" 
                      value={emailAddress}
                      onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                      className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
                      inputMode="email" 
                      autoCapitalize="none"
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
                </View>
                <TouchableOpacity onPress={onSignUpPress} className="bg-primary mx-4 mt-8 py-4 rounded-lg shadow shadow-[#3A8DEC]">
                  <Text className="font-s text-xl text-white font-semibold text-center">Daftar</Text>
                </TouchableOpacity>
                <Text className="font-m text-mediumFont font-medium text-base text-center mt-5">ATAU</Text>
                <TouchableOpacity onPress={onPressGoogle} className="shadow mt-5">
                  <Image 
                    source={images.google}
                    className='mx-auto'
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
          {pendingVerification && (
            <View className="flex h-screen">
              <ScrollView className="flex mx-8 mt-20">
                <Text className="font-m text-black text-2xl font-medium mt-7">Kode Verifikasi</Text>
                <Text className="font-r text-vSmallFont text-base mt-0.5">Masukkan kode verifikasi Anda!</Text>
                {errorMessage ? (
                    <Text className="font-r text-red-500 mt-2">{errorMessage}</Text>
                ) : null}
                <View className="flex mt-7">
                  <View className={getInputStyle(code)}>
                    <TextInput 
                      placeholder="Kode Verifikasi"
                      placeholderTextColor="#9CA3AF"
                      value={code}
                      onChangeText={(code) => setCode(code)}
                      className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
                      autoCapitalize="none"
                      autoFocus
                    />
                  </View>
                  <TouchableOpacity onPress={onPressVerify} className="bg-primary mx-4 mt-8 py-4 rounded-lg shadow shadow-[#3A8DEC]">
                    <Text className="font-s text-xl text-white font-semibold text-center">Verifikasi Email</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
