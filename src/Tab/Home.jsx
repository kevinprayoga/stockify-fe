import React, { useState, useRef, useCallback, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { Feather, Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';
import CustomBarChart from "../../components/CustomBarChart";

import { Menu, Provider } from 'react-native-paper';
import debounce from 'lodash.debounce';
import useStore from "../context/store";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [emptyStockProd, setEmptyStockProd] = useState(0);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dataCache = useRef({});
  const [people, setPeople] = useState('');

  const userId = useStore(state => state.userId);

  const fetchData = useCallback(
    debounce(async (useCache = true) => {
      try {
        const cacheKey = `${userId}-${selectedYear}`;
        if (useCache && dataCache.current[cacheKey]) {
          const cachedData = dataCache.current[cacheKey];
          setData(cachedData.data);
          setTotalRevenue(cachedData.totalRevenue);
          setTotalProfit(cachedData.totalProfit);
          setTotalProduct(cachedData.totalProduct);
          setEmptyStockProd(cachedData.emptyStockProd);
          return;
        }

        const userResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/user/${userId}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user info");
        }
        const userResult = await userResponse.json();
        setPeople(userResult.data[0].username);

        /** Melakukan GET BusinessInfo */
        const businessResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${userId}`);
        if (!businessResponse.ok) {
          throw new Error("Failed to fetch business info");
        }
        const businessResult = await businessResponse.json();
        const businessId = businessResult.data[0].businessId;
        console.log('Business ID:', businessId);

        /** Melakukan GET All Transaction */
        const transactionResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${businessId}/transaction`);
        if (!transactionResponse.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const transactionResult = await transactionResponse.json();
        const filteredData = transactionResult.data.filter(item => new Date(item.createdAt).getFullYear() === selectedYear);
        const monthlyData = Array(12).fill(0);
        let yearlyTotalRevenue = 0;
        filteredData.forEach(item => {
          const month = new Date(item.createdAt).getMonth();
          monthlyData[month] += item.totalPayment;
          yearlyTotalRevenue += item.totalPayment;
        });
        setData(monthlyData.map((total, index) => ({ label: `${index + 1}`, value: total })));
        setTotalRevenue(yearlyTotalRevenue);

        /** Melakukan GET All Product */
        const productResponse = await fetch(`${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_PORT}/business/${businessId}/product`);
        if (!productResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productResult = await productResponse.json();
        const totalProductResp = productResult.data.length;
        setTotalProduct(totalProductResp);
        const emptyStockProduct = productResult.data.filter(item => item.stock === 0).length;
        setEmptyStockProd(emptyStockProduct);
        const totalCost = productResult.data
          .filter(item => new Date(item.createdAt).getFullYear() === selectedYear)
          .reduce((acc, item) => acc + (item.cost * item.stock), 0);
        setTotalProfit(yearlyTotalRevenue - totalCost);

        dataCache.current[cacheKey] = {
          data: monthlyData.map((total, index) => ({ label: `${index + 1}`, value: total })),
          totalRevenue: yearlyTotalRevenue,
          totalProfit: yearlyTotalRevenue - totalCost,
          totalProduct: totalProductResp,
          emptyStockProd: emptyStockProduct
        };
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }, 300), // Debounce interval of 300 milliseconds
    [selectedYear, userId] // Dependencies
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(false).finally(() => setRefreshing(false));
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).replace(/,00$/, '');
  };

  const getOverviewStyle = () => {
    return totalProfit >= 0
      ? "bg-green-200 p-4 rounded-2xl"
      : "bg-red-200 p-4 rounded-2xl";
  };

  const years = [2024, 2023, 2022, 2021];

  return (
    <Provider>
      <View className="bg-bg h-screen">
        <View className="flex">
          {/* Bagian yang tetap di tempat */}
          <View className="mx-6 mt-20">
            <Text className="font-m text-black text-2xl font-medium">Selamat datang, {people}!</Text>
            <Text className="font-r text-vSmallFont mt-0.5">Semangat Pagi!</Text>
            <View className="border-b border-slate-300 w-full my-4" />
          </View>

          {/* Bagian yang bisa digulir */}
          <ScrollView
            className="flex mx-6 mb-60"
            contentContainerStyle={{ paddingBottom: 60 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          >
            <View className="flex justify-between mx-2 space-y-5">
              <View className="flex-row justify-between">
                <View className="bg-indigo-300 p-3 rounded-2xl">
                  <View className="flex-row items-center mb-2">
                    <View className="mr-12">
                      <Text className="font-s font-medium text-sm">Product</Text>
                    </View>
                    <Feather name="archive" size={24} color="black" />
                  </View>
                  <Text className="font-s font-semibold text-4xl">{totalProduct}</Text>
                </View>
                <View className="bg-red-300 p-3 rounded-2xl">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="mr-5">
                      <Text className="font-s font-medium text-sm text-[#F51818]">Out of Stock</Text>
                    </View>
                    <Ionicons name="archive-outline" size={24} color="red" />
                  </View>
                  <Text className="font-s font-semibold text-4xl text-[#F51818]">{emptyStockProd}</Text>
                </View>
              </View>
              <View className="flex-row justify-between pt-2">
                <Menu
                  visible={isDropdownVisible}
                  onDismiss={() => setDropdownVisible(false)}
                  anchor={
                    <TouchableOpacity
                      className="flex-row items-center border border-gray-300 rounded-full px-4 py-2 mr-4"
                      onPress={() => setDropdownVisible(true)}
                    >
                      <Text className="text-black text-base font-medium font-r mr-2">
                        {selectedYear || 'Pilih Tahun'}
                      </Text>
                      <Entypo name="chevron-down" size={20} color="#5533FF" />
                    </TouchableOpacity>
                  }
                  style={{ marginTop: 50 }}
                >
                  {years.map((year, index) => (
                    <Menu.Item
                      key={index}
                      onPress={() => {
                        setSelectedYear(year);
                        setDropdownVisible(false);
                      }}
                      title={year.toString()}
                    />
                  ))}
                </Menu>
              </View>
              <View className={getOverviewStyle()}>
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="font-s font-medium text-lg">Overview</Text>
                  <FontAwesome5 name="money-bill-wave" size={24} color="black" />
                </View>
                <View className="flex-row justify-around">
                  <View className="flex">
                    <Text className="font-s font-semibold text-base">{formatCurrency(totalProfit)}</Text>
                    <Text className="text-center font-l text-vSmallFont text-xs mt-2">Total Profit</Text>
                  </View>
                  <View className="flex">
                    <Text className="font-s font-semibold text-base">{formatCurrency(totalRevenue)}</Text>
                    <Text className="text-center font-l text-vSmallFont text-xs mt-2">Revenue</Text>
                  </View>
                </View>
              </View>
              <View className="bg-white p-4 rounded-2xl">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="font-s font-medium text-lg">Sales Report</Text>
                </View>
                <View className="flex-row justify-start items-center space-x-2">
                  <View className="bg-orange-400 h-2 w-2 rounded-lg" />
                  <Text className="font-l text-vSmallFont text-sm">Revenue</Text>
                </View>
                <View>
                  <CustomBarChart data={data} />
                </View>
                <Text className="font-l text-vSmallFont text-sm text-center ml-4 mt-2">Bulan</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Provider>
  );
}
