import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreensBackground from "../components/screens-background/ScreensBackground";
import SideBar from "../components/sideBar/SideBar";
import ViewAllSpendingsTable from "./viewSpendingsTable/ViewSpendingsTable";
import ViewSpendingsImage from "./viewSpendingsImage/ViewSpendingsImage";

export default function ViewSpendings() {
  const [allSpendings, setAllSpendings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("auth");
        if (!storedData) return;

        const { email, password } = JSON.parse(storedData);
        
        const userResponse = await axios.get(
          `http://10.0.2.2:8080/users/byEmail/${email}`,
          {
            headers: { "Content-Type": "application/json" },
            auth: { username: email, password: password },
          }
        );

        setAllSpendings(userResponse.data.spendings);
      } catch (error) {
        console.error("Eroare la preluarea userului:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateSpendings = async () => {
    try {
      const storedData = await AsyncStorage.getItem("auth");
      if (!storedData) return;

      const { email, password } = JSON.parse(storedData);
      
      const userResponse = await axios.get(
        `http://10.0.2.2:8080/users/byEmail/${email}`,
        {
          headers: { "Content-Type": "application/json" },
          auth: { username: email, password: password },
        }
      );

      setAllSpendings(userResponse.data.spendings);
    } catch (error) {
      console.error("Eroare la actualizarea cheltuielilor:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScreensBackground/>
      <SideBar/>
      <ViewAllSpendingsTable spendings={allSpendings} onSpendingDeleted={updateSpendings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
