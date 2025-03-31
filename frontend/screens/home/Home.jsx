import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreensBackground from "../components/screens-background/ScreensBackground";
import TheRatingUploadSpentCards from "./theRatingUploadSpentCards/TheRatingUploadSpentCards";
import SideBar from "../components/sideBar/SideBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
import SpendingsTable from "./spendingsTable/SpendingsTable";
import SpendingsStatistic from "./spendingsStatistic/SpendingsStatistic";

export default function Home() {
  const [lastFiveSpendings, setLastFiveSpendings] = useState([]);
  const [lastTwelveMonthsSpendings, setLastTwelveMonthsSpendings] = useState([]);
  const [lastThirtyDaysSpendingsSum, setLastThirtyDaysSpendingsSum] = useState("");
  const [uploadedBillsOnThePastThirtyDays, setUploadedBillsOnThePastThirtyDays] = useState("");

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

        setLastFiveSpendings(
          userData.spendings
            ?.sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((spending) => ({
              ...spending,
              numberOfProducts: spending.products?.length || 0,
            }))
        );

        setLastTwelveMonthsSpendings(() => {
          const monthlySpendings = new Map();
          userData.spendings?.forEach((spending) => {
            const spendingDate = new Date(spending.date);
            const key = `${spendingDate.getFullYear()}-${spendingDate.getMonth() + 1}`;

            if (!monthlySpendings.has(key)) {
              monthlySpendings.set(key, {
                luna: spendingDate.toLocaleString("ro-RO", { month: "long", year: "numeric" }),
                suma: 0,
              });
            }
            monthlySpendings.get(key).suma += spending.totalPrice;
          });

          return Array.from(monthlySpendings.values()).sort(
            (a, b) => new Date(a.luna) - new Date(b.luna)
          );
        });

        setLastThirtyDaysSpendingsSum(() => {
          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          const totalCurrentMonthSpendings = userData.spendings
            ?.filter((spending) => {
              const spendingDate = new Date(spending.date);
              return spendingDate.getMonth() === currentMonth && spendingDate.getFullYear() === currentYear;
            })
            .reduce((sum, spending) => sum + spending.totalPrice, 0);

          return totalCurrentMonthSpendings.toFixed(2);
        });

        setUploadedBillsOnThePastThirtyDays(() => {
          const now = new Date();
          const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

          return userData.spendings?.filter((spending) => {
            const spendingDate = new Date(spending.date);
            return spendingDate >= thirtyDaysAgo;
          }).length || 0;
        });
      } catch (error) {
        console.error("Eroare la preluarea userului:", error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <View style={styles.container}>
      <ScreensBackground />
      <SideBar />
      <ScrollView>
      <TheRatingUploadSpentCards
                lastThirtyDaysSpendingsSum={lastThirtyDaysSpendingsSum}
                uploadedBillsOnThePastThirtyDays={uploadedBillsOnThePastThirtyDays}
            />
      <SpendingsTable data={lastFiveSpendings} />
      <SpendingsStatistic data={lastTwelveMonthsSpendings} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 34,
    color: 'black',
  },
});