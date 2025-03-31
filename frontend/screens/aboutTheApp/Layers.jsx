import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EXAMPLES } from "./data";

const textStyler = (text) => {
  return text.split('\n').map((line, index) => (
    <Text key={index} style={styles.text}>
      {line.trim()}
    </Text>
  ));
};

export const WhatIsThisApp = () => {
  const data = EXAMPLES.ceEsteAplicatia;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {textStyler(data.code)}
    </View>
  );
};

export const HowDoesTheAppWork = () => {
  const data = EXAMPLES.cumFunctioneaza;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {textStyler(data.code)}
    </View>
  );
};

export const BenefitsOfUsingTheApp = () => {
  const data = EXAMPLES.beneficiiAplicatie;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {textStyler(data.code)}
    </View>
  );
};

export const OtherInformation = () => {
  const data = EXAMPLES.alteInformatii;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {textStyler(data.code)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: "#334155",
  },
});