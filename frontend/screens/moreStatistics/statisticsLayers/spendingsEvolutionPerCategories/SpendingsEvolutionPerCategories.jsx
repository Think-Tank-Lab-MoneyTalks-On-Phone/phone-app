import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MonthYearInput from '../components/monthYearInput/MonthYearInput';

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

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#E74C3C', '#1ABC9C'];

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

  const applyFilter = () => {
    if (!startMonth || !startYear || !endMonth || !endYear) {
      setFilteredSpendings([]);
      return;
    }

    const filtered = userSpendings.filter(spending => {
      const spendingDate = new Date(spending.date);
      const spendingMonth = spendingDate.getMonth() + 1;
      const spendingYear = spendingDate.getFullYear();

      return (
        (spendingYear === startYear && spendingMonth === startMonth) ||
        (spendingYear === endYear && spendingMonth === endMonth)
      );
    });

    setFilteredSpendings(filtered);
  };

  useEffect(() => {
    if (startMonth && startYear && endMonth && endYear) {
      calculateStatistics();
    }
  }, [filteredSpendings]);

  const calculateStatistics = () => {
    const categoryData = {};

    filteredSpendings.forEach(spending => {
      spending.products.forEach(product => {
        if (!categoryData[product.category]) {
          categoryData[product.category] = { startTotal: 0, endTotal: 0 };
        }

        const spendingDate = new Date(spending.date);
        const month = spendingDate.getMonth() + 1;
        const year = spendingDate.getFullYear();

        if (year === startYear && month === startMonth) {
          categoryData[product.category].startTotal += Number(product.totalPrice) || 0;
        }

        if (year === endYear && month === endMonth) {
          categoryData[product.category].endTotal += Number(product.totalPrice) || 0;
        }
      });
    });

    const filteredCategories = Object.keys(categoryData).filter(
      category => categoryData[category].startTotal > 0 && categoryData[category].endTotal > 0
    );

    const data = filteredCategories.map(category => {
      const startTotal = categoryData[category].startTotal;
      const endTotal = categoryData[category].endTotal;
      const change = ((endTotal - startTotal) / startTotal) * 100;

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

  return (
    <View style={styles.container}>
      <MonthYearInput
        startMonth={startMonth}
        setStartMonth={setStartMonth}
        startYear={startYear}
        setStartYear={setStartYear}
        endMonth={endMonth}
        setEndMonth={setEndMonth}
        endYear={endYear}
        setEndYear={setEndYear}
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
        keyExtractor={(item) => item.category}
        ListHeaderComponent={
          <Text style={styles.title}>Evoluția cheltuielilor pe categorii</Text>
        }
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
  categoryDetails: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default SpendingsEvolutionPerCategories;