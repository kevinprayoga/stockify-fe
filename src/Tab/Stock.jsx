import React, {useState, useEffect} from "react";
import { Image, TouchableOpacity, Text, View, TextInput, ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import { useSession } from "@clerk/clerk-expo";
import { API_URL, PORT } from '@env';

export default function Stock() {
  const [productResult, setProductResult] = useState([]);
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
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const addProductPageHandler = () => {
    nav.push("AddProduct")
  };

  const editProductPageHandler = () => {
    nav.push("EditProduct", {prod: product})
  };

  return (
    <View className="bg-[#F5F6F7]">
      <ScrollView className="h-screen bg-[#F5F6F7] mt-[50]">
        <View className="flex-row justify-between items-center mx-[27]">
          <View>
            <Text className="text-[20px] font-s">Item ({totalProduct})</Text>
          </View>
          <View>
            <TouchableOpacity onPress={addProductPageHandler} className="h-[50] w-[130] rounded-3xl bg-[#5A4DF3] flex-row items-center justify-between px-[15]">
              <View>
                <Text className="text-white text-sm font-s">Tambah</Text>
                <Text className="text-white text-sm font-s">Produk</Text>
              </View>
              <View>
                <MaterialIcons name="add-circle" size={30} color="white"/>      
              </View>
            </TouchableOpacity> 
          </View>
        </View> 
        
        <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] mt-[30] mb-[10]">
          <Octicons name="search" size={20} color="#9CA3AF"/>
          <TextInput placeholder="Cari Produk" placeholderTextColor="#9CA3AF" className="ml-[10] font-l bg-white text-base rounded-lg h-[45] flex-1"></TextInput>
        </View> 


        <View className="items-center mx-[20] mb-[130px]">
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
                        <TouchableOpacity onPress={editProductPageHandler} className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg mx-auto items-center justify-center">
                          <Image source={images.stocklogo} className="h-6 w-6"/> 
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
    </View>

    
  );
}