import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import { API_URL, PORT } from '@env';
import { useSession } from "@clerk/clerk-react";
import { Menu, Provider } from 'react-native-paper';
import { useUser } from "@clerk/clerk-expo";

export default function History({navigation}) {
  const [transactionResult, setTrasactionResult] = useState([]);
  const [isSelesaiActive, setIsSelesaiActive] = useState(true);
  const { session } = useSession();
  const [token, setToken] = useState(null);

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require('../../assets/fonts/Poppins-Bold.ttf'),
    "Poppins-SemiBold": require('../../assets/fonts/Poppins-SemiBold.ttf'),
    "Poppins-Medium": require('../../assets/fonts/Poppins-Medium.ttf'),
    "Poppins-Regular": require('../../assets/fonts/Poppins-Regular.ttf'),
    "Poppins-Light": require('../../assets/fonts/Poppins-Light.ttf'),
  });

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

//   transactionResult = [
//     {
//         "transactionId": "2M0z0s_MjI-zBP_OcriC",
//         "businessId": "8E-MJkejVenVWJj4",
//         "transactionItems": [
//             {
//                 "count": 1,
//                 "transactionItemId": "6Brcm-cB6e2MnD-HzGsp",
//                 "priceItem": 75000,
//                 "nameItem": "Khong Guan"
//             },
//             {
//                 "count": 2,
//                 "transactionItemId": "Zz9mldsA86KZMKF9yB93",
//                 "priceItem": 10000,
//                 "nameItem": "Sprite"
//             },
//             {
//                 "count": 3,
//                 "transactionItemId": "nFoweT2DvMiVfsCvoqlI",
//                 "priceItem": 12000,
//                 "nameItem": "Taro"
//             },
//             {
//                 "count": 1,
//                 "transactionItemId": "uSebAKAl8P02hL-mdWQc",
//                 "priceItem": 55000,
//                 "nameItem": "Rinso"
//             }
//         ],
//         "totalPayment": 152000,
//         "createdAt": "2024-05-30T12:59:16.454Z"
//     },
//     {
//         "transactionId": "XCpjeh6Qae7pOWB85QpY",
//         "businessId": "8E-MJkejVenVWJj4",
//         "transactionItems": [
//             {
//                 "count": 3,
//                 "transactionItemId": "-rJmHmTmzxPfaRV5bj7w",
//                 "priceItem": 225000,
//                 "nameItem": "Khong Guan"
//             },
//             {
//                 "count": 1,
//                 "transactionItemId": "6vG0NyKeI9nPHVZdyZp1",
//                 "priceItem": 55000,
//                 "nameItem": "Rinso"
//             }
//         ],
//         "totalPayment": 280000,
//         "createdAt": "2024-05-30T12:47:43.014Z"
//     },
//     {
//         "transactionId": "YCv9_nAV5jN2LqFPPNNC",
//         "businessId": "8E-MJkejVenVWJj4",
//         "transactionItems": [
//             {
//                 "count": 1,
//                 "priceItem": 55000,
//                 "transactionItemId": "iJei4aEebU9w5AukI1CZ",
//                 "nameItem": "Rinso"
//             },
//             {
//                 "count": 3,
//                 "transactionItemId": "yisSlCy5_auqChzD0kB9",
//                 "priceItem": 15000,
//                 "nameItem": "Ultra Milk"
//             }
//         ],
//         "totalPayment": 70000,
//         "createdAt": "2024-05-30T12:39:35.284Z"
//     }
// ]
  const fetchData = async () => {
    try {
      const token = await session.getToken();

      console.log(API_URL, PORT);
      console.log(token);
      const port = 8080;
      /** Melakukan GET BusinessInfo */
      const businessResponse = await fetch(`${API_URL}:${PORT}/business`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!businessResponse.ok) {
        console.log(businessResponse);
        throw new Error("Failed to fetch business info");
      }
      const businessResult = await businessResponse.json();
      const businessId = businessResult.data[0].businessId;
      console.log('Business ID:', businessId);

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
      console.log(transactionResult);
      setTrasactionResult(transactionResult.data);
      
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
    <View className="bg-[#F5F6F7]">
      <ScrollView className="mt-[50] h-screen bg-[#F5F6F7]">
        <View className="justify-center items-center mx-[27] h-[50]">
          <Text className="text-2xl font-s">Riwayat</Text>
          <Text className="text-xl font-s">Transaksi</Text>
        </View> 
        
        <View className="mt-[30] mb-[130px]">
          {transactionResult.map((transaction) =>(
            <View className="mb-[10] mx-[27] bg-white rounded-lg p-[15] shadow">
              {/* ID & Date*/}
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
      </ScrollView>
    </View>
  );
}