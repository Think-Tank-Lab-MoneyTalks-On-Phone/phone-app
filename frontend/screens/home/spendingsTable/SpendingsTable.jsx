import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function SpendingsTable({ data = [] }) {
    return (
        <>
            <Text style={styles.text}>Ultimele 5 bonuri încărcate</Text>
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerCell}>Numele companiei</Text>
                    <Text style={styles.headerCell}>Numar produse achizitionate</Text>
                    <Text style={styles.headerCell}>Pret total</Text>
                    <Text style={styles.headerCell}>Data</Text>
                </View>
                <ScrollView>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.cell}>{item.companyName}</Text>
                                <Text style={styles.cell}>{item.numberOfProducts}</Text>
                                <Text style={styles.cell}>{item.totalPrice.toFixed(2)} RON</Text>
                                <Text style={styles.cell}>{new Date(item.date).toLocaleString('ro-RO', { hour12: false }).replace(',', '').slice(0, -3)}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noData}>
                            Nu există date despre cheltuielile tale. Începe să încarci bonuri, facturi și cheltuieli online pentru a le putea analiza!
                        </Text>
                    )}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 25,
        elevation: 3,
        height: 384,
        width: 400,
        marginTop: 100,
        right: 4,
        transform: [{ scale: 0.8 }]
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#f4f4f4",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerCell: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    cell: {
        flex: 1,
        textAlign: "center",
        fontSize: 14,
        color: "#000",
    },
    noData: {
        textAlign: "center",
        fontStyle: "italic",
        color: "#777",
        marginTop: 20,
    },
    text: {
        top:125,
        fontSize: 20,
        left: 77,
    },
});
