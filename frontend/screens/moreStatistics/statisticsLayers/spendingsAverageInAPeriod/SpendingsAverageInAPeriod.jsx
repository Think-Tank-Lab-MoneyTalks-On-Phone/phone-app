import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit'; // Vom folosi PieChart pentru a crea un grafic similar
import DateInputCalendar from '../components/dateInputCalendar/DateInputCalendar'; // Componenta pentru selectarea datei

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

const SpendingsAverageInAPeriod = ({ userSpendings, startDate, setStartDate, endDate, setEndDate }) => {

  const formatDate = (date) => {
    if (!date) return '';
    const months = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Verificăm dacă perioada este selectată
  if (!startDate || !endDate) {
    return (
      <View style={styles.container}>
        <Text style={styles.spendingPerCategoriesText}>
          Selectați o perioadă pentru a vedea media cheltuielilor
        </Text>
        <DateInputCalendar
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </View>
    );
  }

  // Filtrăm cheltuielile pentru perioada selectată
  const filteredSpendings = userSpendings.filter(spending => {
    const spendingDate = new Date(spending.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return spendingDate >= start && spendingDate <= end;
  });

  // Calculăm numărul de zile din perioada selectată
  const daysCount = Math.max(1, (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1);

  // Calculăm cheltuielile pe categorii
  const categorySpendings = filteredSpendings.reduce((categories, spending) => {
    if (spending.products) {
      spending.products.forEach(product => {
        if (!categories[product.category]) {
          categories[product.category] = 0;
        }
        categories[product.category] += product.totalPrice;
      });
    }
    return categories;
  }, {});

  // Calculăm media cheltuielilor pe zi pentru fiecare categorie
  const chartData = Object.entries(categorySpendings).map(([category, total]) => ({
    category: categoryMap[category] || category,
    avgPerDay: (parseFloat(total / daysCount)).toFixed(2) // Media pe zi
  }));

  // Sortăm datele pentru chart
  const sortedChartData = chartData.sort((a, b) => b.avgPerDay - a.avgPerDay); // Sortare descrescătoare după media pe zi

  const chartDataForPie = sortedChartData.map((data, index) => ({
    name: data.category,
    population: parseFloat(data.avgPerDay), // Media cheltuielilor pe zi
    color: colors[index % colors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <FlatList
      data={[...Object.entries(categorySpendings), { chart: true }]}
      renderItem={({ item, index }) => {
        if (item.chart) {
          return (
            <View style={styles.chartContainer}>
              <PieChart
                data={chartDataForPie}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={chartOptions.chartConfig}
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
                <Text style={styles.totalText}>
                  {(
                    Object.entries(categorySpendings).reduce((total, [category, amount]) => {
                      return total + (amount / daysCount);
                    }, 0)
                  ).toFixed(2)}
                </Text>
                <Text style={styles.currencyText}>RON</Text>
              </View>
            </View>
          );
        }
        return (
          <View style={styles.categoryItem}>
            <View style={[styles.colorBullet, { backgroundColor: colors[index % colors.length] }]} />
            <Text style={styles.categoryText}>
              {categoryMap[item[0]]}: {(item[1] / daysCount).toFixed(2)} RON
            </Text>
          </View>
        );
      }}
      keyExtractor={(item, index) => (item.chart ? 'chart' : item[0])}
      ListHeaderComponent={
        <>
          <Text style={styles.spendingPerCategoriesText}>
            {startDate && endDate ? `Media cheltuielilor pe zi din perioada ${formatDate(startDate)} până în ${formatDate(endDate)}` : "Selectați o perioadă pentru a vedea media cheltuielilor"}
          </Text>
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

const chartOptions = {
  chartConfig: {
    backgroundColor: 'transparent',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  },
  height: 220,
  width: Dimensions.get('window').width - 40,
  chartType: 'pie',
  accessor: 'population',
  absolute: true,
  center: [10, 0],
};



export default SpendingsAverageInAPeriod;
