import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import axios from "axios";
import SpendingsPerCategories from "./statisticsLayers/spendingsPerCategories/SpendingsPerCategories";
import SpendingsEvolutionPerCategories from "./statisticsLayers/spendingsEvolutionPerCategories/SpendingsEvolutionPerCategories";
import SpendingsAverageInAPeriod from "./statisticsLayers/spendingsAverageInAPeriod/SpendingsAverageInAPeriod";
import TopSpendingsInAPeriod from "./statisticsLayers/topSpendingsInAPeriod/TopSpendingsInAPeriod";
import TopItemsBoughtInAPeriod from "./statisticsLayers/topItemsBoughtInAPeriod/TopItemsBoughtInAPeriod";
import TopShopsAttended from "./statisticsLayers/topShopsAttended/TopShopsAttended";
import SideBar from "../components/sideBar/SideBar";
import ScreensBackground from "../components/screens-background/ScreensBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowSpendings from "../components/icons/ShowSpendings.json";
import SpendingsEvolution from "../components/icons/SpendingsEvolution.json";
import SpendingsAverage from "../components/icons/SpendingsAverage.json";
import TopSpendings from "../components/icons/TopSpendings.json";
import ShoppingCart from "../components/icons/ShoppingCart.json";
import Shop from "../components/icons/Shop.json"


const MoreStatistics = () => {
  const [selectedStatistic, setSelectedStatistic] = useState("cheltuieliPeCategorii");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [userSpendingsData, setUserSpendingsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("auth");
        if (!storedData) return;

        const { email, password } = JSON.parse(storedData);
        const response = await axios.get(`http://10.0.2.2:8080/users/byEmail/${email}`, {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: email,
            password: password,
          },
        });

        const userData = response.data;

        setUserSpendingsData(userData.spendings);

      } catch (error) {
        console.error("Eroare la preluarea userului:", error);
      }
    };

    fetchUserData();
  }, []);

  const options = [
    { id: "cheltuieliPeCategorii", label: "Afisarea cheltuielilor", icon: ShowSpendings },
    { id: "evolutieCheltuieli", label: "Evoluția cheltuielilor", icon: SpendingsEvolution },
    { id: "medieCheltuieli", label: "Media cheltuielilor", icon: SpendingsAverage },
    { id: "topCheltuieli", label: "Top cheltuieli", icon: TopSpendings },
    { id: "topProduseCumparate", label: "Produse achizitionate", icon: ShoppingCart },
    { id: "topMagazineFrecventate", label: "Magazine frecventate", icon: Shop },
  ];

  const selectedOption = options.find(option => option.id === selectedStatistic);

  const renderStatisticComponent = () => {
    switch (selectedStatistic) {
      case "cheltuieliPeCategorii":
        return <SpendingsPerCategories userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "evolutieCheltuieli":
        return <SpendingsEvolutionPerCategories userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "medieCheltuieli":
        return <SpendingsAverageInAPeriod userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "topCheltuieli":
        return <TopSpendingsInAPeriod userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "topProduseCumparate":
        return <TopItemsBoughtInAPeriod userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "topMagazineFrecventate":
        return <TopShopsAttended userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SideBar />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 55 },
  button: { flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#2563eb", borderRadius: 8, transform: [{scale: 0.8}] },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 10 },
  modalContainer: { flex: 1, backgroundColor: "white", padding: 20, justifyContent: "center" },
  optionItem: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  icon: { width: 40, height: 40 },
  optionText: { fontSize: 16, marginLeft: 10 }
});

export default MoreStatistics;
