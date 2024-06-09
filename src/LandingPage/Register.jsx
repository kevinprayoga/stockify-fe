import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { images } from "../../constants";

import { auth } from "../../config/firebaseConfig";
import useStore from '../context/store';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Register() {
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [submitPressed, setSubmitPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const setUserId = useStore(state => state.setUserId);

  const nav = useNavigation();

  const onPressGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserId(user?.uid);

      const payload = {
        userID: user.uid,
        username: user.displayName,
        email: user.email,
      };

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (response.ok) {
        setSubmitPressed(false);
        console.log("User registered and username saved!");
        const responseData = await response.json();
        console.log('Response data:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        setErrorMessage('Gagal membuat akun');
      }
    } catch (err) {
      console.error("OAuth error", err);
      setErrorMessage('Terjadi kesalahan saat mendaftar dengan Google.');
    }
  };

  const backHandler = () => {
    nav.navigate("Landing2");
    setSubmitPressed(false);
    setErrorMessage('');
  };

  const onSignUpPress = async () => {
    setSubmitPressed(true);
    setErrorMessage('');

    if (!username || !emailAddress || !password) {
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

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, emailAddress, password);
      const user = userCredential.user;
      setUserId(user?.uid);
      console.log("Creating sign up");

      const payload = {
        userID: user.uid,
        username: username,
        email: emailAddress,
      };
      console.log("Payload:", payload);

      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (response.ok) {
        setSubmitPressed(false);
        console.log("User registered and username saved!");
        const responseData = await response.json();
        console.log('Response data:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        setErrorMessage('Gagal membuat akun');
      }
      setSubmitPressed(false);
    } catch (error) {
      console.error("Error during sign up: ", error);
      setErrorMessage('Terjadi kesalahan saat mendaftar.');
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
                <View className={getInputStyle(username)}>
                  <TextInput 
                    placeholder="Username" 
                    placeholderTextColor="#9CA3AF"
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                    className="mx-3 font-p text-base text-smallFont rounded-lg h-14" 
                    autoFocus
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
