import React, {useState, useEffect} from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, Modal } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { useSession } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import { API_URL, PORT } from '@env';

export default function Cart({navigation}) {
  const [productResult, setProductResult] = useState([]);
  const [cartResult, setCartResult] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [emptyStockProd, setEmptyStockProd] = useState(0);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('../../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Medium": require('../../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Light": require('../../assets/fonts/Poppins-Light.ttf'),
  });

  const nav = useNavigation();

  const { session } = useSession();
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchData();
    const fetchToken = async () => {
      if (session) {
        const token = await session.getToken();
        console.log('Clerk JWT:', token);
        setToken(token);
      }
    };
    fetchToken();
  }, [session]);

  const fetchData = async () => {
    try {
      const token = await session.getToken();

      /** Melakukan GET BusinessInfo */
      const businessResponse = await fetch(`${API_URL}:${PORT}/business`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!businessResponse.ok) {
        throw new Error("Failed to fetch business info");
      }
      const businessResult = await businessResponse.json();
      const businessId = businessResult.data[0].businessId;
      console.log('Business ID:', businessId);

      /** Melakukan GET All Product */
      const port=8080;
      const productResponse = await fetch(`${API_URL}:${port}/business/${businessId}/product`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!productResponse.ok) {
        throw new Error("Failed to fetch products");
      }
      const productResult = await productResponse.json();
      setProductResult(productResult.data);
      console.log(productResult)
      const totalProductResp = productResult.data.length;
      setTotalProduct(totalProductResp);
      const emptyStockProduct = productResult.data.filter(item => item.stock === 0).length;
      setEmptyStockProd(emptyStockProduct);

       /** Melakukan GET All Product */
      const cartResponse = await fetch(`${API_URL}:${port}/business/${businessId}/transactionItem`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!cartResponse.ok) {
        throw new Error("Failed to fetch products");
      }
      const cartResult = await cartResponse.json();
      setCartResult(cartResult.data);
      console.log(cartResult);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const countTotalItem = (cart) => {
    let totalItems = 0;
    cart.forEach((item) => {
      totalItems += item.count;
    });
    return totalItems;
  }

  const countTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.priceItem * item.count;
    });
    return totalPrice;
  }

  const orderPageHandler = (cart) => {
    navigation.navigate('Order', {
      cart: cart
    })
  }

  const addItemToCart = async (product) => {
    console.log("added product");
  }


  return (
    <View className="relative bg-[#F5F6F7]">
      <ScrollView className={`mt-[50] bg-[#F5F6F7]  ${countTotalItem(cartResult) > 0 ? '' : 'h-screen'}`}>
        <View className="justify-center items-center mx-[27] h-[50]">
          <Text className="text-2xl font-s">Keranjang</Text>
          <Text className="text-xl font-s">Check Out</Text>
        </View> 

        <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] mt-[30] mb-[10]">
          <Octicons name="search" size={20} color="#9CA3AF"/>
          <TextInput placeholder="Cari Produk" placeholderTextColor="#9CA3AF" className="ml-[10] font-l bg-white text-base rounded-lg h-[45] flex-1"></TextInput>
        </View> 
        <View className={`items-center mx-[20] ${countTotalItem(cartResult) > 0 ? 'mb-[70px]' : 'mb-[130px]'}`}>
          {/* Row 1 */}
          <View className="w-full flex-row flex-wrap justify-between ">
            {/* Col 1 */}
            {productResult.map((product) => (
              
              <View className="w-1/2 h-[240] mb-[10]">
                <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                  <View className="items-center justify-center h-1/2 rounded-xl m-[10]">
                    <Image source={{uri:product.image}} style={{width: 140, height: 105}} className="w-[140] h-[105] bg-white"></Image>
                  </View>
                  <View className="mx-[10]">
                    <Text className="text-[18px] font-b">{product.productName}</Text>
                    <View className="flex-row">
                      <Text className="font-s">{product.stock}</Text><Text className="font-r text-gray-500"> di stok</Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-[10]">
                      <Text className="text-[18px] font-s">Rp{product.price.toLocaleString('id-ID')}</Text>
                      <View className="justify-center">
                      <TouchableOpacity onPress={() => (addItemToCart(product))} className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg mx-auto items-center justify-center">
                        <AntDesign name="plus" size={23} color="white" className=""/>
                      </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              
            ))}          
          </View>
        </View> 
      </ScrollView>
      {countTotalItem(cartResult) > 0 ?
        <View className="absolute w-screen bottom-0 bg-gray-200 h-[60] rounded-t-xl flex-row justify-between items-center px-[30]">
          <View className="flex-row items-center">
            <View className="pr-2">
              <AntDesign name="shoppingcart" size={24} color="black" />
            </View>
            <View className="pl-2">
              <Text className="text-[15px] font-r">
                {countTotalItem(cartResult)} Item
              </Text>
              <Text className="font-b text-xl">
                Rp{countTotalPrice(cartResult).toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => (orderPageHandler(cartResult))} className="rounded-xl bg-[#5A4DF3] w-[100] h-[30] items-center justify-center">
              <Text className="text-white font-s">Check Out</Text>
            </TouchableOpacity>

          </View>
        </View>
        :  <View className=""></View>
      }
    </View>
  );
}


