import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import ScreensBackground from "../components/screens-background/ScreensBackground";
import SideBar from "../components/sideBar/SideBar";
import OnlineSpending from "./onlineSpending/OnlineSpending";
import { ScrollView } from "react-native-gesture-handler";
import anIcon from "../components/icons/AboutTheApp.json";
import LottieView from "lottie-react-native";
import UploadSpending from "./uploadSpending/UploadSpending";


export default function UploadBill() {
  const [selectedStatistic, setSelectedStatistic] = useState("uploadOnlineSpending");
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    { id: "uploadOnlineSpending", label: "Incarca o cheltuiala manual", icon: anIcon },
    { id: "uploadBill", label: "Incarca un bon sau o factura", icon: anIcon },
  ];

  const selectedOption = options.find(option => option.id === selectedStatistic);

  const renderStatisticComponent = () => {
    switch (selectedStatistic) {
      case "uploadOnlineSpending":
        return <OnlineSpending />
      case "uploadBill":
        return <UploadSpending />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScreensBackground />
      <SideBar />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <LottieView source={selectedOption.icon} autoPlay loop style={styles.icon} />
          <Text style={styles.buttonText}>{selectedOption.label}</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() => {
                  setSelectedStatistic(item.id);
                  setModalVisible(false);
                }}>
                  <LottieView source={item.icon} autoPlay loop style={styles.icon} />
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <View>{renderStatisticComponent()}</View>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 40 },
  button: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#2563eb", borderRadius: 8, transform: [{ scale: 0.8 }] },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
  modalContainer: { flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" },
  optionItem: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  icon: { width: 40, height: 40 },
  optionText: { fontSize: 16, marginLeft: 10 }
});