import React, { useState, useCallback, useRef } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { API_URL, PORT } from '@env';
import { useSession } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import { images } from "../../constants"; // Pastikan ini adalah jalur yang benar ke gambar

export default function History({ navigation }) {
  const [transactionResult, setTransactionResult] = useState([]);
  const { session } = useSession();
  const { user } = useUser();
  const dataCache = useRef(null);

  const fetchData = useCallback(
    debounce(async () => {
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

        /** Melakukan GET All Transaction */
        const transactionResponse = await fetch(`${API_URL}:${PORT}/business/${businessId}/transaction`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!transactionResponse.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const transactionResult = await transactionResponse.json();
        setTransactionResult(transactionResult.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }, 300), // Debounce interval of 300 milliseconds
    [session, user.id] // Dependencies
  );

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const countTotalItem = (transaction) => {
    let totalItem = 0;
    transaction.transactionItems.forEach(item => {
      totalItem += item.count;
    });
    return totalItem;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    // Extract the date components
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    // Format the date as DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };

  const historyDetailPageHandler = (transaction) => {
    navigation.navigate('HistoryDetail', {
      transaction: transaction
    });
  };

  return (
    <View className="bg-[#F5F6F7] flex-1">
      <ScrollView className="mt-[50] bg-[#F5F6F7] flex-1">
        <View className="justify-center items-center mx-[27] h-[50]">
          <Text className="text-2xl font-s">Riwayat</Text>
          <Text className="text-xl font-s">Transaksi</Text>
        </View> 
        
        {transactionResult.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-80">
            <Image
              source={images.landing}
              className="w-32 h-10"
            />
            <Text className="text-gray-500 font-r mt-4">Mohon lakukan transaksi!</Text>
          </View>
        ) : (
          <View className="mt-[30] mb-[130px]">
            {transactionResult.map((transaction) => (
              <View key={transaction.transactionId} className="mb-[10] mx-[27] bg-white rounded-lg p-[15] shadow">
                {/* ID & Date */}
                <View className="flex-row justify-between items-center border-b border-gray-200 pb-[8]">
                  <Text className="text-[16px] font-b">ID: {transaction.transactionId}</Text>
                  <Text className="text-[13px] text-gray-400 font-r">{formatDate(transaction.createdAt)}</Text>
                </View>
                {/* Item & Total Harga */}
                <View className="flex-row justify-between items-center border-bottom pt-[8]">
                  <View className="flex-row">
                    <Text className="text-[17px] font-l text-gray-500">Jumlah Item: </Text><Text className="text-[17px] font-s">{countTotalItem(transaction)}</Text>
                  </View>
                  <View className="">
                    <View className="flex-row">
                      <Text className="text-[15px] font-l text-gray-500">Total: </Text><Text className="text-[15px] font-b">Rp{transaction.totalPayment.toLocaleString('id-ID')}</Text>
                    </View>
                    {/* Detail Button */}
                    <View className="flex-row justify-end items-center border-bottom mt-[10]">
                      <TouchableOpacity onPress={() => historyDetailPageHandler(transaction)} className="bg-[#5A4DF3] w-[80] py-[5] rounded-lg items-center">
                        <Text className="text-white text-[15px] font-s pt-[3]">Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
