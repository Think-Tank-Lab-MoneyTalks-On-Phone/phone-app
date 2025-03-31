import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import DateInputCalendar from '../components/dateInputCalendar/DateInputCalendar';

const categoryMap = {
  "ABONAMENTE": "Abonamente",
  "ASIGURARI": "Asigurări",
  "BAUTURI": "Băuturi",
  "BUNURI_DE_LUX": "Bunuri de lux",
  "COSMETICE": "Cosmetice",
  "DIVERTISMENT": "Divertisment",
  "EDUCATIE": "Educație",
  "HOBBY_URI": "Hobby-uri",
  "INVESTITII": "Investiții",
  "LOCUINTA": "Locuință",
  "MANCARE": "Mâncare",
  "SANATATE": "Sănătate",
  "TAXE": "Taxe",
  "TEHNOLOGIE": "Tehnologie",
  "TRANSPORT": "Transport",
  "UZ_CASNIC": "Uz casnic",
  "IMBRACAMINTE": "Îmbrăcăminte"
};

const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#E74C3C', '#1ABC9C',
  '#8E44AD', '#2ECC71', '#D35400', '#C0392B', '#2980B9', '#F39C12', '#16A085',
  '#7F8C8D', '#27AE60'
];

const SpendingsPerCategories = ({ userSpendings, startDate, setStartDate, endDate, setEndDate }) => {
  const filteredSpendings = userSpendings.filter(spending => {
    const spendingDate = new Date(spending.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) return spendingDate >= start && spendingDate <= end;
    if (start) return spendingDate >= start;
    if (end) return spendingDate <= end;
    return true;
  });

  const categorySpendings = filteredSpendings.reduce((categories, spending) => {
    if (spending.products) {
      spending.products.forEach(product => {
        categories[product.category] = (categories[product.category] || 0) + product.totalPrice;
      });
    }
    return categories;
  }, {});

  const catSpend = Object.fromEntries(
    Object.entries(categorySpendings)
      .map(([category, total]) => [category, parseFloat(total.toFixed(2))])
      .sort((a, b) => b[1] - a[1])
  );

  const chartData = Object.keys(catSpend).map((category, index) => ({
    name: categoryMap[category],
    population: catSpend[category],
    color: colors[index % colors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const getTotalSpendings = () => {
    return Object.values(catSpend).reduce((total, amount) => total + amount, 0).toFixed(2);
  };

  const renderCategoryItem = ({ item, index }) => {
    const amount = item[1];
    const formattedAmount = amount && !isNaN(amount) ? amount.toFixed(2) : "0.00";

    return (
      <View style={styles.categoryItem}>
        <View style={[styles.colorBullet, { backgroundColor: colors[index % colors.length] }]} />
        <Text style={styles.categoryText}>
          {categoryMap[item[0]]}: {formattedAmount} RON
        </Text>
      </View>
    );
  };

  const renderChart = () => (
    <View style={styles.chartContainer}>
      <PieChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        hasLegend={false}
        center={[10, 0]}
        doughnut
      />
      <View style={styles.totalContainer}>
      <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>{getTotalSpendings()}</Text>
        <Text style={styles.currencyText}>RON</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={[...Object.entries(catSpend), { chart: true }]}
      renderItem={({ item, index }) => {
        if (item.chart) return renderChart();
        return renderCategoryItem({ item, index });
      }}
      keyExtractor={(item, index) => (item.chart ? 'chart' : item[0])}
      ListHeaderComponent={
        <>
          <Text style={styles.spendingPerCategoriesText}>Cheltuieli pe categorii</Text>
          <DateInputCalendar
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </>
      }
      contentContainerStyle={styles.container}
      style={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  colorBullet: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    color: '#34495e',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
    left: "0%",
  },
  totalContainer: {
    position: 'absolute',
    top: '30%',
    alignItems: 'center',
    left: '65%',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  currencyText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
    fontSize: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  spendingPerCategoriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#2c3e50',
  }
});

export default SpendingsPerCategories;