import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Button, Image, StyleSheet, TextInput } from "react-native";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';

export default function AddProduct() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-SemiBold": require('../../assets/fonts/Poppins-SemiBold.ttf'),
        "Poppins-Medium": require('../../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf'),
        "Poppins-Light": require('../../assets/fonts/Poppins-Light.ttf'),
    });
    const nav = useNavigation();

    const stockPageHandler = () => {
        nav.navigate("Stock")
    };

    // Increment function
    const incrementStock = (values, setFieldValue) => {
        const currentStock = parseInt(values.stock) || 0;
        setFieldValue('stock', (currentStock + 1).toString());
    };
    
    // Decrement function
    const decrementStock = (values, setFieldValue) => {
        const currentStock = parseInt(values.stock) || 0;
        if (currentStock > 1) {
        setFieldValue('stock', (currentStock - 1).toString());
        }
    };
    return (
        <View>
            <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
                <View className="items-center mt-[30]">
                    <Text className="text-xl font-h"></Text>
                </View>
                {/* Back Button */}
                <View className="absolute mt-[25]">
                    <TouchableOpacity onPress={stockPageHandler} className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                        <AntDesign name="arrowleft" size={15} color="white"/>
                    </TouchableOpacity>    
                </View>

                {/* Tabel */}
                <View className="mx-[27] mt-[30]">
                    {/* Picture */}
                    <TouchableOpacity>
                        <Image className="">

                        </Image>
                    </TouchableOpacity>
                    {/* Form */}
                    <Formik
                        initialValues={{productName:'',cost:0,price:0,stock:0,image:''}}
                        onSubmit={value =>console.log(value)}
                    >
                        {({handleChange,handleBlur,handleSubmit,values, setFieldValue})=> (
                            <View>
                                {/* Nama Produk */}
                                <View className="">
                                    <Text className="text-[#5A4DF3] pl-2 font-s">Nama Produk</Text>
                                    <TextInput 
                                        
                                        onChangeText={handleChange('productName')}
                                        onBlur={handleBlur('productName')}
                                        value={values.productName}
                                        className="bg-white rounded-lg h-[45] w-full px-4 shadow font-l border border-[#5A4DF3]"
                                    />
                                </View>
                                {/* Harga Pokok dan Harga Jual */}
                                <View className="flex-row justify-between mt-[10]">
                                    <View className="w-1/2 pr-1">
                                        <Text className="text-[#5A4DF3] pl-2 font-s">Harga Pokok</Text>
                                        <TextInput 
                                            
                                            keyboardType="numeric"
                                            onChangeText={handleChange('cost')}
                                            onBlur={handleBlur('cost')}
                                            value={values.cost}
                                            className="bg-white rounded-lg h-[45] px-4 shadow font-l border border-[#5A4DF3]"
                                        />
                                    </View>
                                    <View className="w-1/2 pl-1">
                                        <Text className="text-[#5A4DF3] pl-2 font-s">Harga Jual</Text>
                                        <TextInput 
                                            keyboardType="numeric"
                                            onChangeText={handleChange('price')}
                                            onBlur={handleBlur('price')}
                                            value={values.price}
                                            className="bg-white rounded-lg h-[45] px-4 shadow font-l border border-[#5A4DF3]"
                                        />
                                    </View>
                                </View>
                                {/* Jumlah Stok */}
                                <View className="mt-[20]">
                                    <View className="bg-white rounded-lg h-[60] w-full shadow font-l border border-[#5A4DF3] flex-row justify-between items-center">
                                        <Text className="text-[#5A4DF3] pl-4 font-s">Jumlah Stok</Text>
                                        <View className="w-1/2 flex-row items-center justify-end mr-4">
                                            <TouchableOpacity 
                                                onPress={() => decrementStock(values,setFieldValue)}
                                                className={`mr-[10] w-[30px] h-[30px] bg-white border-[0.5px] border-gray-300 rounded-full items-center justify-center ${parseInt(values.stock) > 1 ? 'bg-[#17D183] border-white' : ''}`}
                                                disabled={parseInt(values.stock) <= 1}
                                            >
                                                <AntDesign name="minus" size={15} color="black" className="p-[5]"/>
                                            </TouchableOpacity>
                                            <TextInput 
                                                keyboardType="numeric"
                                                onChangeText={handleChange('stock')}
                                                onBlur={handleBlur('stock')}
                                                defaultValue="1"
                                                value={values.stock}
                                                className="bg-white h-[45] w-[40] shadow font-l border-b border-gray-300 text-center text-lg"
                                            />
                                            <TouchableOpacity 
                                                onPress={() => incrementStock(values,setFieldValue)}
                                                className="ml-[10] w-[30px] h-[30px] bg-[#17D183] border-white rounded-full items-center justify-center"
                                            >
                                                <AntDesign name="plus" size={15} color="black" className="p-[5]"/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View className="mt-[10]">
                                    <TouchableOpacity 
                                        onPress={handleSubmit}
                                        className="bg-[#5A4DF3] h-[45] rounded-xl items-center justify-center"
                                    >
                                        <Text className="text-lg font-s text-white">Tambahkan Produk</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="mt-[10]">
                                    <TouchableOpacity 
                                        onPress={stockPageHandler}
                                        className="border border-[#5A4DF3] h-[45] rounded-xl items-center justify-center"
                                    >
                                        <Text className="text-lg font-s text-[#5A4DF3]">Batal</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
                
            </ScrollView>
        </View>
    );
}