import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function MonthYearInput({ 
  startMonth, setStartMonth, 
  startYear, setStartYear, 
  endMonth, setEndMonth, 
  endYear, setEndYear 
}) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const months = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
  ];

  const years = Array.from({ length: 20 }, (_, i) => currentYear - 1 + i);

  const handleStartYearChange = (newYear) => {
    setStartYear(newYear);
    setEndYear(null);
    setEndMonth(null);

    if (startMonth !== null) {
      const maxMonth = newYear === currentYear ? currentMonth - 1 : 12;
      if (startMonth > maxMonth) {
        setStartMonth(null);
      }
    }
  };

  const handleEndYearChange = (newYear) => {
    setEndYear(newYear);
    if (endMonth !== null) {
      const minMonth = startYear === newYear ? startMonth + 1 : 1;
      const maxMonth = newYear === currentYear ? currentMonth : 12;
      if (endMonth < minMonth || endMonth > maxMonth) {
        setEndMonth(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerGroup}>
        <Text style={styles.label}>De la data</Text>
        <Picker
          selectedValue={startMonth}
          onValueChange={(value) => setStartMonth(value)}
          enabled={!!startYear}
          style={styles.picker}
        >
          <Picker.Item label="Selectează luna" value={null} />
          {months.map((name, index) => {
            const monthValue = index + 1;
            const maxMonth = startYear === currentYear ? currentMonth - 1 : 12;
            return (
              <Picker.Item key={monthValue} label={name} value={monthValue} enabled={monthValue <= maxMonth} />
            );
          })}
        </Picker>

        <Picker
          selectedValue={startYear}
          onValueChange={handleStartYearChange}
          style={styles.picker}
        >
          <Picker.Item label="Selectează anul" value={null} />
          {years.map((yr) => (
            <Picker.Item key={yr} label={String(yr)} value={yr} enabled={yr <= currentYear} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerGroup}>
        <Text style={styles.label}>Până la data</Text>
        <Picker
          selectedValue={endMonth}
          onValueChange={(value) => setEndMonth(value)}
          enabled={!!endYear && !!startYear && !!startMonth}
          style={styles.picker}
        >
          <Picker.Item label="Selectează luna" value={null} />
          {months.map((name, index) => {
            const monthValue = index + 1;
            const minMonth = startYear === endYear ? startMonth + 1 : 1;
            const maxMonth = endYear === currentYear ? currentMonth : 12;
            return (
              <Picker.Item key={monthValue} label={name} value={monthValue} enabled={monthValue >= minMonth && monthValue <= maxMonth} />
            );
          })}
        </Picker>

        <Picker
          selectedValue={endYear}
          onValueChange={handleEndYearChange}
          enabled={!!startYear && !!startMonth}
          style={styles.picker}
        >
          <Picker.Item label="Selectează anul" value={null} />
          {years.map((yr) => (
            <Picker.Item key={yr} label={String(yr)} value={yr} enabled={yr >= startYear && yr <= currentYear} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  pickerGroup: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 5,
  },
  picker: {
    width: 180,
    height: 50,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
});
