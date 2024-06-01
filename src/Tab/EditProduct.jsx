import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { Formik } from 'formik';
import { useSession } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-expo";
import { API_URL, PORT } from '@env';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

export default function EditProduct() {
    const route = useRoute();
    const { productId } = route.params;
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { session } = useSession();
    const { user } = useUser();
    const [image, setImage] = useState(null);
    const nav = useNavigation();
    const [product, setProduct] = useState({
        productName: '',
        cost: '',
        price: '',
        stock: '',
        image: ''
    });

    useFocusEffect(
        React.useCallback(() => {
            fetchProductData();
        }, [])
    );

    useEffect(() => {
        if (product.productName) {
            // When product data is fetched, set the initial values for Formik
            setInitialValues({
                productName: product.productName,
                cost: product.cost.toString(),
                price: product.price.toString(),
                stock: product.stock.toString(),
                image: product.image
            });
        }
    }, [product]);

    const [initialValues, setInitialValues] = useState({
        productName: '',
        cost: '',
        price: '',
        stock: '',
        image: ''
    });

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const stockPageHandler = () => {
        nav.navigate("Stock")
    };

    const incrementStock = (values, setFieldValue) => {
        const currentStock = parseInt(values.stock) || 0;
        setFieldValue('stock', (currentStock + 1).toString());
    };
    
    const decrementStock = (values, setFieldValue) => {
        const currentStock = parseInt(values.stock) || 0;
        if (currentStock > 0) {
            setFieldValue('stock', (currentStock - 1).toString());
        }
    };

    const saveChangeHandler = async(value) => {
        setErrorMessage('');
        setIsLoading(true);
        try {
            value.cost = parseInt(value.cost);
            value.price = parseInt(value.price);
            value.stock = parseInt(value.stock);

            if (!value.image) {
                value.image = product.image;
            } else {
                value.image = image;

                /**Convert URI to Blob File */
                const respImage = await fetch(image);
                const blob = await respImage.blob();
                const storageRef = ref(storage, 'productStockify/' + Date.now() + '.jpg');

                // 'file' comes from the Blob or File API
                await uploadBytes(storageRef, blob);
                const downloadUrl = await getDownloadURL(storageRef);
                value.image = downloadUrl;
            }
            if (!value.productName || !value.cost || !value.price || !value.stock || !value.image) {
                setErrorMessage('Semua field harus diisi');
                setIsLoading(false);
                value.stock = 0;
                return;
            }

            const token = await session.getToken();
            /** Melakukan GET BusinessInfo */
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

            // Lakukan operasi penyimpanan data produk ke database
            const payload = {
                businessId: businessId,
                productName: value.productName,
                cost: value.cost,
                price: value.price,
                stock: value.stock,
                image: value.image,
            };

            const response = await fetch(`${API_URL}:${PORT}/business/${businessId}/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Product updated:', responseData);
                stockPageHandler();
            } else {
                const errorData = await response.json();
                console.error('Error data:', errorData);
                setErrorMessage('Gagal menyimpan data produk');
            }
        } catch (error) {
            setErrorMessage('Gagal menyimpan data produk');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProductHandler = async () => {
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
    
          const response = await fetch(`${API_URL}:${PORT}/business/${businessId}/product/${productId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            stockPageHandler();
          } else {
            const errorData = await response.json();
            console.error('Error data:', errorData);
          }
        } catch (error) {
          console.error('Error delete product:', error);
        }
    };

    const fetchProductData = async () => {
        try {
            const token = await session.getToken();
            /** Melakukan GET BusinessInfo */
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

            /** Melakukan GET id Produk */
            const productResponse = await fetch(`${API_URL}:${PORT}/business/${businessId}/product/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!productResponse.ok) {
                throw new Error("Failed to fetch product info");
            }

            const productResult = await productResponse.json();
            const productData = productResult.data;
            setProduct(productData);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                <ScrollView className="mx-[27] mt-[30]">
                    {/* Form */}
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={value => saveChangeHandler(value)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, error }) => (
                            <View>
                                {/* Picture */}
                                <View className="items-center">
                                    <View className="relative w-[240] h-[180] justify-end">
                                        { image ? (
                                            <Image source={{ uri: image }} className="w-full h-full border border-[#5A4DF3] rounded-xl" />
                                        ) : (
                                            product.image ? (
                                                <Image source={{ uri: product.image }} className="w-full h-full border border-[#5A4DF3] rounded-xl" />
                                            ) : null
                                        )}
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
                                {errorMessage ? (
                                    <Text className="font-r text-red-500 mt-2">{errorMessage}</Text>
                                ) : null}
                                {/* Nama Produk */}
                                <View className="mt-[10]">
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
                                                onPress={() => decrementStock(values, setFieldValue)}
                                                className={`mr-[10] w-[30px] h-[30px] bg-white border-[0.5px] border-gray-300 rounded-full items-center justify-center ${parseInt(values.stock) > 1 ? 'bg-[#17D183] border-white' : ''}`}
                                                disabled={parseInt(values.stock) <= 1}
                                            >
                                                <AntDesign name="minus" size={15} color="black" className="p-[5]" />
                                            </TouchableOpacity>
                                            <TextInput 
                                                keyboardType="numeric"
                                                onChangeText={handleChange('stock')}
                                                onBlur={handleBlur('stock')}
                                                value={values.stock}
                                                className="bg-white h-[45] w-[40] shadow font-l border-b border-gray-300 text-center text-lg"
                                            />
                                            <TouchableOpacity 
                                                onPress={() => incrementStock(values, setFieldValue)}
                                                className="ml-[10] w-[30px] h-[30px] bg-[#17D183] border-white rounded-full items-center justify-center"
                                            >
                                                <AntDesign name="plus" size={15} color="black" className="p-[5]" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {isLoading ? (
                                    <ActivityIndicator size="large" color="#5A4DF3" />
                                ) : (
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
                                )}
                                <View className="mt-[10]">
                                    <TouchableOpacity 
                                        onPress={deleteProductHandler}
                                        className="bg-[#F13131] h-[45] rounded-xl items-center justify-center"
                                    >
                                        <Text className="text-lg font-s text-white">Hapus Produk</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
