import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { Formik } from 'formik';
import { images } from "../../constants";
import { useSession } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-expo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

export default function EditProduct() {
    const route = useRoute();
    const { productId } = route.params;
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { session } = useSession();
    const [image, setImage] = useState(null);
    const nav = useNavigation();
    const { user } = useUser();
    const [product, setProduct] = useState({
        productName: '',
        cost: '',
        price: '',
        stock: '',
        image: ''
    });
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [formValues, setFormValues] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            fetchProductData();
        }, [])
    );

    useEffect(() => {
        if (product.productName) {
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

    const handleSave = async (value) => {
        setErrorMessage('');
        setIsLoading(true);
        try {
            value.cost = parseInt(value.cost);
            value.price = parseInt(value.price);
            value.stock = parseInt(value.stock);
            console.log('Value:', value);

            if (value.image !== product.image) {
                const respImage = await fetch(image);
                const blob = await respImage.blob();
                const storageRef = ref(storage, 'productStockify/' + Date.now() + '.jpg');

                await uploadBytes(storageRef, blob);
                const downloadUrl = await getDownloadURL(storageRef);
                value.image = downloadUrl;
            }
            
            if (!value.productName || !value.cost || !value.price || !value.stock || !value.image) {
                setErrorMessage('Semua field harus diisi');
                setIsLoading(false);
                return;
            }

            const token = await session.getToken();
            const businessResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!businessResponse.ok) {
                throw new Error("Failed to fetch business info");
            }

            const businessResult = await businessResponse.json();
            const businessId = businessResult.data[0].businessId;

            const payload = {
                businessId: businessId,
                productName: value.productName,
                cost: value.cost,
                price: value.price,
                stock: value.stock,
                image: value.image,
            };

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${businessId}/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                nav.goBack();
            } else {
                setErrorMessage('Gagal menyimpan data produk');
            }
        } catch (error) {
            setErrorMessage('Gagal menyimpan data produk');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const token = await session.getToken();

            const businessResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!businessResponse.ok) {
                throw new Error("Failed to fetch business info");
            }

            const businessResult = await businessResponse.json();
            const businessId = businessResult.data[0].businessId;

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${businessId}/product/${productId}`, {
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
            const businessResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!businessResponse.ok) {
                throw new Error("Failed to fetch business info");
            }
            const businessResult = await businessResponse.json();
            const businessId = businessResult.data[0].businessId;

            const productResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${businessId}/product/${productId}`, {
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
                <View className="absolute mt-[25]">
                    <TouchableOpacity onPress={stockPageHandler} className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                        <AntDesign name="arrowleft" size={15} color="white"/>
                    </TouchableOpacity>    
                </View>
                <ScrollView className="mx-[27] mt-[30]">
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            setFormValues(values);
                            setIsSaveModalVisible(true);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, error }) => (
                            <View>
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
                                <View className="mt-[10]">
                                    <Text className="text-[#5A4DF3] pl-2 font-s">Nama Produk</Text>
                                    <TextInput 
                                        onChangeText={handleChange('productName')}
                                        onBlur={handleBlur('productName')}
                                        value={values.productName}
                                        className="bg-white rounded-lg h-[45] w-full px-4 shadow font-l border border-[#5A4DF3]"
                                    />
                                </View>
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
                                        onPress={() => setIsDeleteModalVisible(true)}
                                        className="bg-[#F13131] h-[45] rounded-xl items-center justify-center"
                                    >
                                        <Text className="text-lg font-s text-white">Hapus Produk</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
                <Modal
                    visible={isSaveModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View className="flex-1 items-center justify-center">
                        <View className="bg-white bg-opacity-30 h-[300] w-[240] rounded-3xl items-center z-20 m-auto mt-64">
                            <Image source={images.save} className="mt-[30]" />
                            <Text className="font-b text-2xl text-[#5A4DF3] mt-[20]">Simpan Perubahan</Text>
                            <Text className="font-l mt-[10]">Apakah Anda ingin</Text>
                            <Text className="font-l">menyimpan perubahan?</Text>
                            <View className="flex-row mt-[15]">
                                <View className="pr-1">
                                    <TouchableOpacity
                                        className="w-[90] h-[30] rounded-lg border border-[#5A4DF3] items-center justify-center"
                                        onPress={() => setIsSaveModalVisible(false)}
                                    >
                                        <Text className="text-[#5A4DF3] font-s">Batal</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="pl-1">
                                    <TouchableOpacity
                                        className="w-[90] h-[30] rounded-lg bg-[#5A4DF3] items-center justify-center"
                                        onPress={() => {
                                            setIsSaveModalVisible(false);
                                            handleSave(formValues);
                                        }}
                                    >
                                        <Text className="text-white font-s">Ya</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View className="bg-black h-screen w-screen z-0 opacity-50" />
                    </View>
                </Modal>
                <Modal
                    visible={isDeleteModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View className="flex-1 items-center justify-center">
                        <View className="bg-white bg-opacity-30 h-[300] w-[240] rounded-3xl items-center z-20 m-auto mt-64">
                            <Image source={images.delete_icon} className="mt-[15]" />
                            <Text className="font-s text-2xl text-[#F13131] mt-[20]">Hapus Produk</Text>
                            <Text className="font-l mt-[10]">Apakah Anda ingin menghapus</Text>
                            <Text className="font-l">produk yang dimaksud?</Text>
                            <View className="flex-row mt-[15]">
                                <View className="pr-1">
                                    <TouchableOpacity
                                        className="w-[90] h-[30] rounded-lg border border-gray-600 items-center justify-center"
                                        onPress={() => setIsDeleteModalVisible(false)}
                                    >
                                        <Text className="text-gray-600 font-s">Batal</Text>
                                    </TouchableOpacity>
                                </View>
                                <View className="pl-1">
                                    <TouchableOpacity
                                        className="bg-[#F13131] w-[90] h-[30] rounded-lg items-center justify-center"
                                        onPress={() => {
                                            setIsDeleteModalVisible(false);
                                            handleDelete();
                                        }}
                                    >
                                        <Text className="text-white font-s">Hapus</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View className="bg-black h-screen w-screen z-0 opacity-50" />
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
