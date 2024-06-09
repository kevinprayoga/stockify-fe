import React, { useState, useRef, useCallback, useEffect } from "react";
import { Image, TouchableOpacity, Text, View, TextInput, ScrollView, RefreshControl } from "react-native";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { images } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import useStore from "../context/store";
import debounce from 'lodash.debounce';

export default function Stock() {
  const [productResult, setProductResult] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const nav = useNavigation();
  const dataCache = useRef({});
  const userId = useStore(state => state.userId);

  const fetchData = async (query = "", useCache = true) => {
    try {
      const cacheKey = `${userId}-${query}`;
      if (useCache && dataCache.current[cacheKey]) {
        const cachedData = dataCache.current[cacheKey];
        setProductResult(cachedData.productResult);
        setTotalProduct(cachedData.totalProduct);
        return;
      }

      /** Melakukan GET BusinessInfo */
      const businessResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${userId}`);
      if (!businessResponse.ok) {
        throw new Error("Gagal mengambil informasi bisnis");
      }
      const businessResult = await businessResponse.json();
      const businessId = businessResult.data[0].businessId;

      /** Melakukan GET Semua Produk dengan query pencarian */
      const productResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${businessId}/product?queryName=${query}`);
      if (!productResponse.ok) {
        throw new Error("Gagal mengambil produk");
      }
      const productResult = await productResponse.json();
      setProductResult(productResult.data);
      const totalProductResp = productResult.data.length;
      setTotalProduct(totalProductResp);

      dataCache.current[cacheKey] = {
        productResult: productResult.data,
        totalProduct: totalProductResp,
      };
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const debouncedFetchData = useCallback(
    debounce((query) => fetchData(query), 300),
    [userId]
  );

  useEffect(() => {
    debouncedFetchData(searchQuery);
  }, [searchQuery, debouncedFetchData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(searchQuery, false).finally(() => setRefreshing(false));
  }, [fetchData, searchQuery]);

  const addProductPageHandler = () => {
    nav.push("AddProduct");
  };

  const editProductPageHandler = (productId) => {
    nav.push("EditProduct", { productId });
  };

  return (
    <View className="bg-[#F5F6F7] flex-1">
      <View className="flex-row justify-between items-center mx-[27] mt-16">
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
              <MaterialIcons name="add-circle" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] mt-[30] mb-10">
        <Octicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Cari Produk"
          placeholderTextColor="#9CA3AF"
          className="ml-[10] font-l bg-white text-base rounded-lg h-[45] flex-1"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <ScrollView
        className="bg-[#F5F6F7]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {productResult.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-48">
            <Image
              source={images.landing}
              className="w-32 h-10"
            />
            <Text className="text-gray-500 font-r mt-4">Mohon tambahkan produk!</Text>
          </View>
        ) : (
          <View className="items-center mx-[20] mb-10">
            <View className="w-full flex-row flex-wrap justify-between">
              {productResult.map((product) => (
                <View key={product.productId} className="w-1/2 h-[240] mb-[10]">
                  <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                    <View className="items-center justify-center h-1/2 rounded-xl m-[10]">
                      <Image source={{ uri: product.image }} style={{ width: 140, height: 105 }} className="w-[140] h-[105] bg-white" />
                    </View>
                    <View className="mx-[10]">
                      <Text className="text-[18px] font-b">{product.productName}</Text>
                      <View className="flex-row">
                        <Text className={`font-s ${product.stock < 10 ? "text-red-500" : ""}`}>{product.stock}</Text><Text className="font-r text-gray-500"> di stok</Text>
                      </View>
                      <View className="flex-row items-center justify-between mt-[10]">
                        <Text className="text-[18px] font-s">Rp{product.price.toLocaleString('id-ID')}</Text>
                        <View className="justify-center">
                          <TouchableOpacity onPress={() => editProductPageHandler(product.productId)} className="w-[35px] h-[35px] bg-[#5A4DF3] rounded-lg mx-auto items-center justify-center">
                            <Image source={images.stocklogo} className="h-6 w-6" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
