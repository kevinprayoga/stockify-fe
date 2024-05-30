import React from "react";
import { ScrollView, Text, TouchableOpacity, View,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';

export default function Order({route, navigation}) {
    const { cart } = route.params;
    console.log(cart);
    const [fontsLoaded] = useFonts({
        "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf')
    });

    const nav = useNavigation();

    const cartPageHandler = () => {
        nav.navigate("Cart");
    }

    const countTotalPrice = (cart) => {
        let totalPrice = 0;
        cart.forEach(item => {
          totalPrice += item.priceItem * item.count;
        });
        return totalPrice;
      }

    const incrementItemCount = (item) => {
        console.log("Incrementing item count")
    }

    const decrementItemCount = (item) => {
        console.log("Decrementing item count")
    }

    const orderHandler = (cart) => {
        console.log("Ordering items")
    }

    return (
        <View>
            <ScrollView className="mt-[30] h-screen bg-[#F5F6F7]">
                <View className="items-center mt-[30]">
                    <Text className="text-xl font-b">Check Out</Text>
                </View>
                {/* Back Button */}
                <View className="absolute mt-[25]">
                    <TouchableOpacity onPress={cartPageHandler} className="ml-[27] w-[30px] h-[30px] bg-[#5A4DF3] rounded-full items-center justify-center">
                        <AntDesign name="arrowleft" size={15} color="white"/>
                    </TouchableOpacity>    
                </View>

                {/* Tabel */}
                <View className="mx-[27] mt-[30]">
                    {cart.map((item) => (
                        <View className="flex-row justify-between my-[10]">
                            <View className="flex-row">
                                {/* Image */}
                                <View className="items-center justify-center">
                                    <Image source={{uri:item.image}} style={{width: 60, height: 45}} className="rounded-xl"></Image>
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
                                    <AntDesign name="minus" size={15} color="black" className="p-[5]"/>
                                </TouchableOpacity>
                                {/* Amount */}
                                <Text className="text-xl font-s">
                                    {item.count}
                                </Text>
                                {/* Plus */}
                                <TouchableOpacity 
                                    onPress={() => incrementItemCount(item)}
                                    className="ml-[10] w-[30px] h-[30px] bg-[#17D183] border-white rounded-full items-center justify-center"
                                >
                                    <AntDesign name="plus" size={15} color="black" className="p-[5]"/>
                                </TouchableOpacity>
                            </View>
                        </View>

                    ))}
                    
                    {/* Row 2 */}
                    
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
        </View>
    );
}