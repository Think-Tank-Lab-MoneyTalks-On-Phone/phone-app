import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import DateInputCalendar from '../components/dateInputCalendar/DateInputCalendar'; // Presupun că ai acest component

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

const SpendingsEvolutionPerCategories = ({ userSpendings }) => {
  const [startMonth, setStartMonth] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [filteredSpendings, setFilteredSpendings] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    applyFilter();
  }, [startMonth, startYear, endMonth, endYear]);

  useEffect(() => {
    if (startMonth && startYear && endMonth && endYear) {
      calculateStatistics();
    }
  }, [filteredSpendings]);

  const applyFilter = () => {
    const filtered = userSpendings.filter(spending => {
      const spendingDate = new Date(spending.date);
      const spendingMonth = spendingDate.getMonth() + 1;
      const spendingYear = spendingDate.getFullYear();

      const isAfterStart = startYear && startMonth
        ? (spendingYear > startYear || (spendingYear === startYear && spendingMonth >= startMonth))
        : true;

      const isBeforeEnd = endYear && endMonth
        ? (spendingYear < endYear || (spendingYear === endYear && spendingMonth <= endMonth))
        : true;

      return isAfterStart && isBeforeEnd;
    });

    setFilteredSpendings(filtered);
  };

  const calculateStatistics = () => {
    if (!startMonth || !startYear || !endMonth || !endYear) {
      setStatistics(null);
      return;
    }

    const categoryData = {};

    filteredSpendings.forEach(spending => {
      const spendingDate = new Date(spending.date);
      const month = spendingDate.getMonth() + 1;
      const year = spendingDate.getFullYear();

      spending.products.forEach(product => {
        if (!categoryData[product.category]) {
          categoryData[product.category] = { startTotal: 0, endTotal: 0, entriesStart: 0, entriesEnd: 0 };
        }
        if (year === startYear && month === startMonth) {
          categoryData[product.category].startTotal += Number(product.totalPrice) || 0;
          categoryData[product.category].entriesStart += 1;
        }
        if (year === endYear && month === endMonth) {
          categoryData[product.category].endTotal += Number(product.totalPrice) || 0;
          categoryData[product.category].entriesEnd += 1;
        }
      });
    });

    const filteredCategories = Object.keys(categoryData).filter(category =>
      categoryData[category].entriesStart > 0 && categoryData[category].entriesEnd > 0
    );

    const data = filteredCategories.map(category => {
      const startTotal = categoryData[category].startTotal;
      const endTotal = categoryData[category].endTotal;
      const change = startTotal !== 0 ? ((endTotal - startTotal) / startTotal) * 100 : 100;

      return {
        category,
        startTotal,
        endTotal,
        change
      };
    });

    setStatistics({ categories: filteredCategories, data });
  };

  const handleCategoryClick = (index) => {
    const selected = statistics.data[index];
    setSelectedCategory(selected);
  };

  const renderChart = () => {
    const chartData = statistics.data.map(item => ({
      name: categoryMap[item.category],
      population: item.change,
      color: colors[statistics.data.indexOf(item) % colors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }));

    return (
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
          <Text style={styles.totalText}>{statistics.data.reduce((total, item) => total + item.change, 0).toFixed(2)}</Text>
          <Text style={styles.currencyText}>RON</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DateInputCalendar
        startMonth={startMonth} setStartMonth={setStartMonth}
        startYear={startYear} setStartYear={setStartYear}
        endMonth={endMonth} setEndMonth={setEndMonth}
        endYear={endYear} setEndYear={setEndYear}
      />
      <FlatList
        data={statistics ? statistics.data : []}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleCategoryClick(index)}>
            <View style={styles.categoryItem}>
              <View style={[styles.colorBullet, { backgroundColor: colors[index % colors.length] }]} />
              <Text style={styles.categoryText}>
                {categoryMap[item.category]}: {item.change.toFixed(2)}%
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.category}
        ListHeaderComponent={
          <Text style={styles.title}>Evoluția cheltuielilor pe categorii</Text>
        }
        ListFooterComponent={statistics && statistics.data.length > 0 && renderChart()}
      />
      {selectedCategory && (
        <View style={styles.categoryDetails}>
          <Text>Categoria: {categoryMap[selectedCategory.category]}</Text>
          <Text>Cheltuieli la început: {selectedCategory.startTotal.toFixed(2)} RON</Text>
          <Text>Cheltuieli la sfârșit: {selectedCategory.endTotal.toFixed(2)} RON</Text>
          <Text>Creștere/Scădere: {selectedCategory.change.toFixed(2)}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    marginVertical: 20,
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
  },
  categoryDetails: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
  },
});

export default SpendingsEvolutionPerCategories;
