// <Modal
// visible={isSaveModalVisible}
// transparent={true}
// animationType="slide"
// >
// <View className="flex-1 items-center justify-center">
//     <View className="bg-white bg-opacity-30 h-[300] w-[240] rounded-3xl items-center z-20 m-auto mt-64">
//         <Image source={images.save} className="mt-[30]" />
//         <Text className="font-b text-2xl text-[#5A4DF3] mt-[20]">Simpan Perubahan</Text>
//         <Text className="font-l mt-[10]">Apakah Anda ingin</Text>
//         <Text className="font-l">menyimpan perubahan?</Text>
//         <View className="flex-row mt-[15]">
//             <View className="pr-1">
//                 <TouchableOpacity
//                     className="w-[90] h-[30] rounded-lg border border-[#5A4DF3] items-center justify-center"
//                     onPress={() => setIsSaveModalVisible(false)}
//                 >
//                     <Text className="text-[#5A4DF3] font-s">Batal</Text>
//                 </TouchableOpacity>
//             </View>
//             <View className="pl-1">
//                 <TouchableOpacity
//                     className="w-[90] h-[30] rounded-lg bg-[#5A4DF3] items-center justify-center"
//                     onPress={() => {
//                         setIsSaveModalVisible(false);
//                         handleSave(formValues);
//                     }}
//                 >
//                     <Text className="text-white font-s">Ya</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     </View>
//     <View className="bg-black h-screen w-screen z-0 opacity-50" />
// </View>
// </Modal>