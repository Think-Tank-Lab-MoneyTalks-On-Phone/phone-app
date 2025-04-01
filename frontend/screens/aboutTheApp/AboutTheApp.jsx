import React from "react";
import ScreensBackground from "../components/screens-background/ScreensBackground.jsx";
import LoginRegisterMenu from "../components/login-register-menu/LoginRegisterMenu.jsx";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import { BenefitsOfUsingTheApp, HowDoesTheAppWork, OtherInformation, WhatIsThisApp } from "./Layers.jsx";
import { ScrollView } from "react-native-gesture-handler";
import SmartphoneIcon from "../components/icons/Smartphone.json";
import WrenchIcon from "../components/icons/Wrench.json";
import BenefitsIcon from "../components/icons/Benefits.json";
import InfoIcon from "../components/icons/Info.json";

export default function AboutTheApp() {
  const [infoType, setInfoType] = useState("whatIsThisApp");
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    { id: "whatIsThisApp", label: "Ce este aceasta aplicatie?", icon: SmartphoneIcon },
    { id: "howDoesTheAppWork", label: "Cum functioneaza aplicatia?", icon: WrenchIcon },
    { id: "benefitsOfUsingTheApp", label: "Ce beneficii ofera aplicatia?", icon: BenefitsIcon },
    { id: "otherInformation", label: "Alte informatii", icon: InfoIcon },
  ];

  const selectedOption = options.find(option => option.id === infoType);

  const renderComponent = () => {
    switch (infoType) {
      case "whatIsThisApp":
        return <WhatIsThisApp />
      case "howDoesTheAppWork":
        return <HowDoesTheAppWork />
      case "benefitsOfUsingTheApp":
        return <BenefitsOfUsingTheApp />
      case "otherInformation":
        return <OtherInformation />
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LoginRegisterMenu />
      <ScreensBackground />
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
                  setInfoType(item.id);
                  setModalVisible(false);
                }}>
                  <LottieView source={item.icon} autoPlay loop style={styles.icon} />
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <ScrollView>
          <View>{renderComponent()}</View>
        </ScrollView>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 10 },
  button: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#2563eb", borderRadius: 8, transform: [{ scale: 0.8 }] },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
  modalContainer: { flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" },
  optionItem: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  icon: { width: 40, height: 40 },
  optionText: { fontSize: 16, marginLeft: 10 }
});