import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Button, Image, StyleSheet, TextInput, ToastAndroid, Modal } from "react-native";
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import { images } from "../../constants";

export default function EditProduct() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        // console.log(result);

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

    const onSubmitMethod=(value)=>{
        value.image = image;
        if (!value.productName || !value.cost || !value.price || !value.stock || !value.image) {
            console.log('Data belum lengkap');
            ToastAndroid.show("Data belum lengkap!", ToastAndroid.SHORT)
        } else {
            console.log(value);
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
                <View className="mx-[27] mt-[30]">
                    {/* Form */}
                    <Formik
                        initialValues={{productName:'',cost:0,price:0,stock:0,image:''}}
                        onSubmit={value =>onSubmitMethod(value)}
                    >
                        {({handleChange,handleBlur,handleSubmit,values,setFieldValue,error})=> (
                            <View>
                                {/* Picture */}
                                <View className="items-center">
                                    <View className="relative w-[240] h-[180] justify-end">
                                        { image? 
                                            <Image source={{uri:image}} className="w-full h-full border border-[#5A4DF3] rounded-xl"/>
                                            : <View className="w-full h-full border border-[#5A4DF3] rounded-xl items-center justify-center">
                                                <Text className="font-b">Edit</Text>
                                            </View>
                                        }
                                        <View className="absolute w-full items-end p-[10]">
                                            <TouchableOpacity
                                                onPress={pickImage}
                                                className="rounded-full bg-[#5A4DF3] w-[40px] h-[40px] items-center justify-center"
                                            >
                                                <AntDesign name="camera" size={24} color="white" />   
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {/* Nama Produk */}
                                <View className="mt-[10]">
                                    <Text className="text-[#5A4DF3] pl-2 font-s">Nama Produk</Text>
                                    <TextInput 
                                        placeholder="Nama Produk"
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
                                            placeholder="Harga Pokok"
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
                                            placeholder="Harga Jual"
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
                                <View className="mt-[10] flex-row">
                                    <View className="w-1/2 pr-1">
                                        <TouchableOpacity 
                                            onPress={stockPageHandler}
                                            className="border border-[#5A4DF3] h-[45] rounded-xl items-center justify-center"
                                        >
                                            <Text className="text-lg font-s text-[#5A4DF3]">Batal</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className="w-1/2 pl-1">
                                        <TouchableOpacity 
                                            onPress={handleSubmit}
                                            className="bg-[#5A4DF3] h-[45] rounded-xl items-center justify-center"
                                        >
                                            <Text className="text-lg font-s text-white">Simpan</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className="mt-[10]">
                                    <TouchableOpacity 
                                        onPress={stockPageHandler}
                                        className="bg-[#F13131] h-[45] rounded-xl items-center justify-center"
                                    >
                                        <Text className="text-lg font-s text-white">Hapus Produk</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
            <Modal visible={false}>
                <View className="h-screen bg-gray-400 items-center justify-center">
                    <View className="bg-white bg-opacity-30 h-[300] w-[240] rounded-3xl items-center">
                        <Image source={images.save} className="mt-[30]"/>
                        <Text className="font-b text-2xl text-[#5A4DF3] mt-[20]">Simpan Perubahan</Text>
                        <Text className="font-l mt-[10]">Apakah Anda ingin</Text>
                        <Text className="font-l">menyimpan perubahan?</Text>
                        <View className="flex-row mt-[15]">
                            <View className="pr-1">
                                <TouchableOpacity className="w-[90] h-[30] rounded-lg border border-[#5A4DF3] items-center justify-center">
                                    <Text className="text-[#5A4DF3] font-s">Batal</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="pl-1">
                                <TouchableOpacity className="w-[90] h-[30] rounded-lg bg-[#5A4DF3] items-center justify-center">
                                    <Text className="text-white font-s">Ya</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal visible={false}>
                <View className="h-screen bg-gray-400 items-center justify-center">
                    <View className="bg-white bg-opacity-30 h-[300] w-[240] rounded-3xl items-center">
                        <Image source={images.delete_icon} className="mt-[15]"/>
                        <Text className="font-s text-2xl text-[#F13131] mt-[20]">Hapus Produk</Text>
                        <Text className="font-l mt-[10]">Apakah Anda ingi menghapus</Text>
                        <Text className="font-l">produk yang dimaksud?</Text>
                        <View className="flex-row mt-[15]">
                            <View className="pr-1">
                                <TouchableOpacity className="w-[90] h-[30] rounded-lg border border-gray-600 items-center justify-center">
                                    <Text className="text-gray-600 font-s">Batal</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="pl-1">
                                <TouchableOpacity className="bg-[#F13131] w-[90] h-[30] rounded-lg items-center justify-center">
                                    <Text className="text-white font-s">Hapus</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
