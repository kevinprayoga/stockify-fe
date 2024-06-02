import React, { useState, useRef, useCallback, useEffect } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, RefreshControl } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { useSession } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { API_URL, PORT } from '@env';
import debounce from 'lodash.debounce';
import { images } from "../../constants"; // Pastikan ini adalah jalur yang benar ke gambar

export default function Cart() {
  const [productResult, setProductResult] = useState([]);
  const [cartResult, setCartResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]); // State baru untuk menyimpan item transaksi
  const nav = useNavigation();
  const { session } = useSession();
  const { user } = useUser();
  const dataCache = useRef({});

  useEffect(() => {
    console.log('Items:', items);
  }, [items]);

  useEffect(() => {
    if (cartResult.length > 0) {
      setItems(cartResult.map(cartItem => {
        const product = productResult.find(product => product.productName === cartItem.nameItem);
        return product ? {
          productId: product.productId,
          productName: product.productName,
          cost: product.cost,
          price: product.price,
          stock: product.stock,
          image: product.image
        } : null;
      }).filter(item => item !== null));
    } else {
      setItems([]);
    }
  }, [cartResult, productResult]);

  const fetchData = useCallback(
    debounce(async (query = '', useCache = true) => {
      try {
        const cacheKey = `${user.id}-${query}`;
        if (useCache && dataCache.current[cacheKey]) {
          const cachedData = dataCache.current[cacheKey];
          setProductResult(cachedData.productResult);
          setCartResult(cachedData.cartResult);
          setTotalItems(countTotalItem(cachedData.cartResult));
          setTotalPrice(countTotalPrice(cachedData.cartResult));
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

        /** Melakukan GET All Product */
        const productResponse = await fetch(`${API_URL}:${PORT}/business/${businessId}/product?queryName=${query}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!productResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productResult = await productResponse.json();
        setProductResult(productResult.data);

        /** Melakukan GET Transaction Item Unorder */
        const cartResponse = await fetch(`${API_URL}:${PORT}/business/${businessId}/transactionItem`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!cartResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const cartResult = await cartResponse.json();
        setCartResult(cartResult.data);
        setTotalItems(countTotalItem(cartResult.data));
        setTotalPrice(countTotalPrice(cartResult.data));

        dataCache.current[cacheKey] = {
          productResult: productResult.data,
          cartResult: cartResult.data,
        };
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }, 300), // Debounce interval of 300 milliseconds
    [session, user.id]
  );

  useFocusEffect(
    useCallback(() => {
      fetchData(searchQuery);
    }, [searchQuery])
  );

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

  const orderPageHandler = () => {
    nav.push('Order', { items }) // Kirim nilai items ke halaman Order
  }

  const addItemToCart = async (item) => {
    try {
      const token = await session.getToken();

      if (cartResult.some((cartItem) => cartItem.nameItem === item.productName)) {
        /** Melakukan PUT TransactionItem */
        const transactionItem = cartResult.filter((cartItem) => cartItem.nameItem === item.productName)[0];
        const payload = {
          count: transactionItem.count + 1,
        };
        const transactionItemResponse = await fetch(`${API_URL}:${PORT}/business/${item.businessId}/transactionItem/${transactionItem.transactionItemId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        if (transactionItemResponse.ok) {
          const responseData = await transactionItemResponse.json();
          console.log('Response data:', responseData);
          // Update cartResult state to reflect the new count
          setCartResult(prevCart => {
            const updatedCart = prevCart.map(cartItem =>
              cartItem.transactionItemId === transactionItem.transactionItemId
                ? { ...cartItem, count: payload.count }
                : cartItem
            );
            setTotalItems(countTotalItem(updatedCart));
            setTotalPrice(countTotalPrice(updatedCart));
            return updatedCart;
          });
        } else {
          const errorData = await transactionItemResponse.json();
          console.log('Error data:', errorData);
        }
      } else {
        /** Melakukan POST TransactionItem */
        const payload = {
          businessId: item.businessId,
          nameItem: item.productName,
          priceItem: item.price,
          count: 1,
          image: item.image,
        };
        console.log('Payload:', payload);
        const transactionItemResponse = await fetch(`${API_URL}:${PORT}/business/transactionItem`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        if (transactionItemResponse.ok) {
          const responseData = await transactionItemResponse.json();
          console.log('Response data:', responseData);
          // Add new item to cartResult state
          setCartResult(prevCart => {
            const updatedCart = [...prevCart, { ...payload, transactionItemId: responseData.transactionItemId }];
            setTotalItems(countTotalItem(updatedCart));
            setTotalPrice(countTotalPrice(updatedCart));
            return updatedCart;
          });
        } else {
          const errorData = await transactionItemResponse.json();
          console.log('Error data:', errorData);
        }
      }
    } catch (error) {
      console.error('Error submitting transaction item:', error);
    }
  }

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(searchQuery, false).finally(() => setRefreshing(false));
  }, [searchQuery, fetchData]);

  return (
    <View className="relative bg-[#F5F6F7] flex-1">
      <ScrollView 
        className={`mt-[50] bg-[#F5F6F7]  ${totalItems > 0 ? '' : 'h-screen'}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View className="justify-center items-center mx-[27] h-[50]">
          <Text className="text-2xl font-s">Keranjang</Text>
          <Text className="text-xl font-s">Check Out</Text>
        </View>

        <View className="flex-row items-center bg-white rounded-lg px-4 shadow h-[45] mx-[27] mt-[30] mb-[10]">
          <Octicons name="search" size={20} color="#9CA3AF"/>
          <TextInput
            placeholder="Cari Produk"
            placeholderTextColor="#9CA3AF"
            className="ml-[10] font-l bg-white text-base rounded-lg h-[45] flex-1"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {productResult.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-64">
            <Image
              source={images.landing}
              className="w-32 h-10"
            />
            <Text className="text-gray-500 font-r mt-4">Mohon tambahkan produk!</Text>
          </View>
        ) : (
          <View className={`items-center mx-[20] ${totalItems > 0 ? 'mb-[70px]' : 'mb-[130px]'}`}>
            {/* Row 1 */}
            <View className="w-full flex-row flex-wrap justify-between">
              {/* Col 1 */}
              {productResult.map((product) => {
                const cartItem = cartResult.find(item => item.nameItem === product.productName);
                const isAddDisabled = cartItem && cartItem.count >= product.stock;
                return (
                  <View key={product.productId} className="w-1/2 h-[240] mb-[10]">
                    <View className="bg-white h-full rounded-2xl mx-[5] shadow">
                      <View className="items-center justify-center h-1/2 rounded-xl m-[10]">
                        <Image source={{ uri: product.image }} style={{ width: 140, height: 105 }} className="w-[140] h-[105] bg-white" />
                      </View>
                      <View className="mx-[10]">
                        <Text className="text-[18px] font-b">{product.productName}</Text>
                        <View className="flex-row">
                          <Text className="font-s">{product.stock}</Text><Text className="font-r text-gray-500"> di stok</Text>
                        </View>
                        <View className="flex-row items-center justify-between mt-[10]">
                          <Text className="text-[18px] font-s">Rp{product.price.toLocaleString('id-ID')}</Text>
                          <View className="justify-center">
                          <TouchableOpacity
                            onPress={() => addItemToCart(product)}
                            className={`w-[35px] h-[35px] ${isAddDisabled ? 'bg-gray-400' : 'bg-[#5A4DF3]'} rounded-lg mx-auto items-center justify-center`}
                            disabled={isAddDisabled}
                          >
                            <AntDesign name="plus" size={23} color="white" className=""/>
                          </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>
        )}
      </ScrollView>
      {totalItems > 0 ?
        <View className="absolute w-screen bottom-0 bg-gray-200 h-[60] rounded-t-xl flex-row justify-between items-center px-[30]">
          <View className="flex-row items-center">
            <View className="pr-2">
              <AntDesign name="shoppingcart" size={24} color="black" />
            </View>
            <View className="pl-2">
              <Text className="text-[15px] font-r">
                {totalItems} Item
              </Text>
              <Text className="font-b text-xl">
                Rp{totalPrice.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={orderPageHandler} className="rounded-xl bg-[#5A4DF3] w-[100px] h-[30px] items-center justify-center">
              <Text className="text-white font-s">Check Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        :  <View className="" />
      }
    </View>
  );
};
