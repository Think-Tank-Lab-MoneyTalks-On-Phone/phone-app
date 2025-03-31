import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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

const TopItemsBoughtInAPeriod = ({ userSpendings, startDate, setStartDate, endDate, setEndDate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredSpendings = useMemo(() => 
    userSpendings.filter(spending => {
      const spendingDate = new Date(spending.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    }),
    [userSpendings, startDate, endDate]
  );

  const productFrequency = useMemo(() => {
    const frequency = {};
    filteredSpendings.forEach(spending => {
      spending.products.forEach(product => {
        const productKey = `${product.itemName} - ${product.category}`;
        if (frequency[productKey]) {
          frequency[productKey].count += product.units;
          frequency[productKey].totalPrice += product.pricePerUnit * product.units;
        } else {
          frequency[productKey] = {
            count: product.units,
            totalPrice: product.pricePerUnit * product.units,
          };
        }
      });
    });

    return Object.keys(frequency)
      .map(key => ({
        name: key,
        count: frequency[key].count,
        totalPrice: frequency[key].totalPrice,
      }))
      .sort((a, b) => b.totalPrice - a.totalPrice);
  }, [filteredSpendings]);

  const totalPages = Math.ceil(productFrequency.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = productFrequency.slice(indexOfFirstProduct, indexOfLastProduct);

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <ScrollView style={styles.container}>
      <DateInputCalendar
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {(!startDate || !endDate) ? (
        <Text style={styles.message}>
          Selectează un interval de date pentru a vedea topul produselor cumpărate.
        </Text>
      ) : filteredSpendings.length === 0 ? (
        <Text style={styles.message}>
          Nu există cheltuieli în această perioadă.
        </Text>
      ) : (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Produs</Text>
            <Text style={styles.headerText}>Categorie</Text>
            <Text style={styles.headerText}>Cantitate</Text>
            <Text style={styles.headerText}>Preț Total</Text>
          </View>

          {currentProducts.map((product, index) => (
            <View key={index} style={styles.productRow}>
              <Text style={styles.cell}>{product.name.split(" - ")[0]}</Text>
              <Text style={styles.cell}>{categoryMap[product.name.split(" - ")[1]]}</Text>
              <Text style={styles.cell}>{product.count}</Text>
              <Text style={styles.cell}>{product.totalPrice.toFixed(2)}</Text>
            </View>
          ))}

          {filteredSpendings.length > 0 && (
            <View style={styles.pagination}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                onPress={goToPreviousPage}
                disabled={currentPage === 1}
              >
                <Text style={styles.paginationText}>⬅ Pagina anterioară</Text>
              </TouchableOpacity>

              <Text style={styles.paginationInfo}>
                Pagina {currentPage} din {totalPages}
              </Text>

              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
                onPress={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <Text style={styles.paginationText}>Pagina următoare ➡</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginVertical: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff200',
    padding: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingBottom: 100,
  },
  paginationButton: {
    backgroundColor: '#fff200',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#f7f2a3',
  },
  paginationText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  paginationInfo: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default TopItemsBoughtInAPeriod;