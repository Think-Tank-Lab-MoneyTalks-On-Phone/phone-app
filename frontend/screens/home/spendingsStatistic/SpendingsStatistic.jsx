import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const SpendingsStatistic = ({ data, containerTop, containerRight }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ data: [] }],
        legend: ["Cheltuieli lunare"],
    });

    const screenWidth = Dimensions.get("window").width;

    useEffect(() => {
        if (data && data.length > 0) {
            const lastFour = data.slice(-4).reverse();
            const labels = lastFour.map((item) => item.luna);
            const values = lastFour.map((item) => item.suma);

            setChartData({
                labels,
                datasets: [
                    {
                        data: values,
                        color: () => "#FFF200",
                        strokeWidth: 2,
                    },
                ],
                legend: ["Cheltuieli lunare"],
            });
        }
    }, [data]);

    const containerWidth = Math.min(screenWidth * 0.8, 900);

    return (
        <>
            <Text style={styles.text}>Cheltuielile tale pe ultimele 4 luni</Text>
            <View
                style={[
                    styles.chartContainer,
                    {
                        top: containerTop,
                        right: containerRight,
                        width: containerWidth,
                    },
                ]}
            >
                <LineChart
                    data={chartData}
                    width={containerWidth + 150}
                    height={250}
                    chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 0,
                        color: () => "rgba(0, 0, 0, 1)",
                        labelColor: () => "rgba(0, 0, 0, 1)",
                        propsForDots: {
                            r: "5",
                            fill: "#000000",
                            stroke: "#000000",
                            strokeWidth: "2",
                        },
                    }}
                    bezier
                    withDots={true}
                    withShadow={false}
                    withVerticalLines={false}
                    withHorizontalLines={false}
                    withVerticalLabels={true}
                    withHorizontalLabels={true}
                    withLegend={true}
                    style={{
                        borderRadius: 8,
                    }}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        position: "relative",
        left: 40,
        padding: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ scale: 0.75 }],
    },
    text: {
        top: 0,
        fontSize: 20,
        left: 47,
    },
});

export default SpendingsStatistic;
