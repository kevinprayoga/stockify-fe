import React, { useState, useRef, useCallback, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, Image, Modal } from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-expo";
import debounce from 'lodash.debounce';
import { images } from '../../constants';

export default function Order() {
    const nav = useNavigation();
    const route = useRoute();
    const { items } = route.params;
    const [cart, setCart] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { session } = useSession();
    const { user } = useUser();
    const dataCache = useRef({});
    const [products, setProducts] = useState(items);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (redirect && cart.length === 0) {
            nav.navigate("Cart");
        }
    }, [redirect, cart, nav]);

    const cartPageHandler = () => {
        nav.navigate("Cart");
    };

    const getBusinessId = async () => {
        const token = await session.getToken();

        /** Melakukan GET BusinessInfo */
        const businessResponse = await fetch(`${process.env.API_URL}:${process.env.PORT}/business/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!businessResponse.ok) {
            throw new Error("Failed to fetch business info");
        }
        const businessResult = await businessResponse.json();
        const businessId = businessResult.data[0].businessId;
        return businessId;
    };

    const fetchData = useCallback(
        debounce(async () => {
            try {
                const cacheKey = `${user.id}-cart`;
                if (dataCache.current[cacheKey]) {
                    const cachedData = dataCache.current[cacheKey];
                    setCart(cachedData.cart);
                    return;
                }

                const token = await session.getToken();

                /** Melakukan GET BusinessInfo */
                const businessResponse = await fetch(`${process.env.API_URL}:${process.env.PORT}/business/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!businessResponse.ok) {
                    throw new Error("Failed to fetch business info");
                }
                const businessResult = await businessResponse.json();
                const businessId = businessResult.data[0].businessId;

                /** Melakukan GET Transaction Item Unorder */
                const cartResponse = await fetch(`${process.env.API_URL}:${process.env.PORT}/business/${businessId}/transactionItem`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!cartResponse.ok) {
                    throw new Error("Failed to fetch products");
                }
                const cartResult = await cartResponse.json();
                setCart(cartResult.data);

                dataCache.current[cacheKey] = {
                    cart: cartResult.data,
                };
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }, 300), // Debounce interval of 300 milliseconds
        [session, user.id]
    );

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const countTotalPrice = (cart) => {
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.priceItem * item.count;
        });
        return totalPrice;
    };

    const updateItem = async (payload, transactionItemId, nameItem) => {
        const token = await session.getToken();
        const businessId = await getBusinessId();

        try {
            /** Melakukan PUT TransactionItem */
            const transactionItemResponse = await fetch(`${process.env.API_URL}:${process.env.PORT}/business/${businessId}/transactionItem/${transactionItemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (transactionItemResponse.ok) {
                const responseData = await transactionItemResponse.json();
                console.log('Response data:', responseData);
                // Perbarui state cart dengan item yang diperbarui
                setCart(prevCart => {
                    const updatedCart = prevCart.map(item =>
                        item.transactionItemId === transactionItemId ? { ...item, ...payload } : item
                    ).filter(item => item.count > 0); // Hapus item dengan count 0

                    if (updatedCart.length === 0) {
                        setRedirect(true);
                    }
                    return updatedCart;
                });
                // Perbarui state products dengan item yang diperbarui
                setProducts(prevProducts => {
                    return prevProducts.map(product => 
                        product.productName === nameItem ? { ...product, stock: payload.count } : product
                    );
                });
            } else {
                const errorData = await transactionItemResponse.json();
                console.log('Error data:', errorData);
            }
        } catch (error) {
            console.error("Error update transaction item: ", error);
        }
    };

    const incrementItemCount = async (item) => {
        /** Melakukan PUT TransactionItem */
        const payload = {
            count: item.count + 1,
        };
        await updateItem(payload, item.transactionItemId, item.nameItem);
        console.log("Incrementing item count");
    };

    const decrementItemCount = async (item) => {
        /** Melakukan PUT TransactionItem */
        const payload = {
            count: item.count - 1,
        };
        await updateItem(payload, item.transactionItemId, item.nameItem);
        console.log("Decrementing item count");
    };

    const updateProducts = async (cart) => {
        const token = await session.getToken();
        const businessId = await getBusinessId();
        console.log('Products:', products);
        const updatePromises = products.map(product => {
            const realStock = cart.find(item => item.nameItem === product.productName).count;
            console.log('Real stock:', realStock);
            const payload = {
                businessId: businessId,
                productName: product.productName,
                cost: product.cost,
                price: product.price,
                stock: product.stock - realStock,
                image: product.image,
            };
            console.log('Payload:', payload);
            return fetch(`${process.env.API_URL}:${process.env.PORT}/business/${businessId}/product/${product.productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        });

        try {
            await Promise.all(updatePromises);
            console.log('All products updated successfully');
        } catch (error) {
            console.error('Error updating products:', error);
        }
    };

    const orderHandler = async (cart) => {
        try {
            const token = await session.getToken();
            const businessId = await getBusinessId();
            const totalPayment = countTotalPrice(cart);
            /** Melakukan POST TransactionItem */
            const payload = {
                businessId: businessId,
                totalPayment: totalPayment,
            };
            console.log('Payload:', payload);
            const transactionResponse = await fetch(`${process.env.API_URL}:${process.env.PORT}/business/transaction`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (transactionResponse.ok) {
                const responseData = await transactionResponse.json();
                console.log('Response data:', responseData);
                setIsModalVisible(true); // Show the modal on successful transaction
                await updateProducts(cart); // Update products after successful transaction
            } else {
                const errorData = await transactionResponse.json();
                console.log('Error data:', errorData);
            }
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }
        console.log("Ordering items");
    };

    return (
        <View>
            <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
                <View className="items-center mt-[30]">
                    <Text className="text-xl font-b">Check Out</Text>
                </View>
                {/* Back Button */}
                <View className="absolute mt-[25]">
                    <TouchableOpacity onPress={cartPageHandler} className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                        <AntDesign name="arrowleft" size={15} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Tabel */}
                <View className="mx-[27] mt-[30]">
                    {cart.map((item) => {
                        const isAddDisabled = item.count >= item.stock;
                        return (
                            <View key={item.transactionItemId} className="flex-row justify-between my-[10]">
                                <View className="flex-row">
                                    {/* Image */}
                                    <View className="items-center justify-center">
                                        <Image source={{ uri: item.image }} style={{ width: 60, height: 45 }} className="rounded-xl"></Image>
                                    </View>
                                    {/* Item Description */}
                                    <View className="justify-center ml-[15]">
                                        <Text className="font-b text-xl">{item.nameItem}</Text>
                                        <Text className="font-s text-base">Rp{item.priceItem.toLocaleString('ID-id')}</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center">
                                    {/* Minus */}
                                    <TouchableOpacity
                                        onPress={() => decrementItemCount(item)}
                                        className="mr-[10] w-[30px] h-[30px] bg-[#17D183] border-white rounded-full items-center justify-center"
                                    >
                                        <AntDesign name="minus" size={15} color="black" className="p-[5]" />
                                    </TouchableOpacity>
                                    {/* Amount */}
                                    <Text className="text-xl font-s">
                                        {item.count}
                                    </Text>
                                    {/* Plus */}
                                    <TouchableOpacity
                                        onPress={() => incrementItemCount(item)}
                                        className={`ml-[10] w-[30px] h-[30px] ${isAddDisabled ? 'bg-gray-400' : 'bg-[#17D183]'} border-white rounded-full items-center justify-center`}
                                        disabled={isAddDisabled}
                                    >
                                        <AntDesign name="plus" size={15} color="black" className="p-[5]" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
                {/* Payment Summary */}
                <View className="mx-[27]">
                    <Text className="mt-[15] text-[18px] font-b">Ringkasan Pembayaran</Text>
                    <View className="flex-row mt-[8] justify-between">
                        <View>
                            <Text className="text-base font-s">Total Harga</Text>
                        </View>
                        <View>
                            <Text className="text-base font-s">Rp{countTotalPrice(cart).toLocaleString('ID-id')}</Text>
                        </View>
                    </View>
                </View>
                {/* Order Button */}
                <View className="mx-[27] mt-[30]">
                    <TouchableOpacity onPress={() => (orderHandler(cart))} className="bg-[#5A4DF3] h-[50] rounded-xl items-center justify-center">
                        <Text className="text-xl font-b text-white">Pesan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}
            >
                <View className="h-screen bg-[#5A4DF3] items-center justify-center">
                    <View className="bg-white h-[300px] w-[240px] rounded-3xl items-center">
                        <Image source={images.order_completed} className="mt-[30px]" />
                        <Text className="font-h text-2xl text-[#5A4DF3] mt-[20px]">Pesanan Selesai</Text>
                        <Text className="font-p mt-[10px]">Transaksi telah masuk ke riwayat</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setIsModalVisible(false);
                                nav.pop();
                                nav.navigate("HistoryNavigation");
                            }}
                            className="w-[90px] h-[30px] rounded-lg bg-[#5A4DF3] items-center justify-center mt-[15px]"
                        >
                            <Text className="text-white font-h">Cek Riwayat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setIsModalVisible(false);
                                nav.navigate("Cart");
                            }}
                            className="w-[90px] h-[30px] rounded-lg border border-[#5A4DF3] items-center justify-center mt-[10px]"
                        >
                            <Text className="text-[#5A4DF3] font-h">Kembali</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
