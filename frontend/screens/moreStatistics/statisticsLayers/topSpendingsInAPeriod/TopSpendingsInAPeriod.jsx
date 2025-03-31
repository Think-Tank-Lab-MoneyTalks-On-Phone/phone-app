import React, { useState } from 'react';
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

const TopSpendingsInAPeriod = ({ userSpendings, startDate, setStartDate, endDate, setEndDate }) => {
  const [selectedSpendingId, setSelectedSpendingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("ro-RO", { month: "long" })} ${date.getFullYear()}`;
  };

  const parseEuropeanDate = (dateString) => new Date(dateString);

  const filteredSpendings = userSpendings
    .filter(spending => {
      const spendingDate = parseEuropeanDate(spending.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);

      return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    })
    .sort((a, b) => b.totalPrice - a.totalPrice);

  const totalPages = Math.ceil(filteredSpendings.length / itemsPerPage);
  const indexOfLastSpending = currentPage * itemsPerPage;
  const indexOfFirstSpending = indexOfLastSpending - itemsPerPage;
  const currentSpendings = filteredSpendings.slice(indexOfFirstSpending, indexOfLastSpending);

  const handleToggleDetails = (spendingId) => {
    setSelectedSpendingId(prev => prev === spendingId ? null : spendingId);
  };

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
          Selectează un interval de date pentru a vedea topul cheltuielilor.
        </Text>
      ) : currentSpendings.length === 0 ? (
        <Text style={styles.message}>
          Nu există cheltuieli în această perioadă.
        </Text>
      ) : (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nume Companie</Text>
            <Text style={styles.headerText}>Număr Produse</Text>
            <Text style={styles.headerText}>Preț Total</Text>
            <Text style={styles.headerText}>Dată</Text>
            <Text style={styles.headerText}>Acțiuni</Text>
          </View>

          {currentSpendings.map(spending => (
            <View key={spending.spendingId} style={styles.spendingRow}>
              <View style={styles.row}>
                <Text style={styles.cell}>{spending.companyName}</Text>
                <Text style={styles.cell}>{spending.products.length}</Text>
                <Text style={styles.cell}>{spending.totalPrice.toFixed(2)}</Text>
                <Text style={styles.cell}>
                  {parseEuropeanDate(spending.date).toLocaleDateString("ro-RO", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleToggleDetails(spending.spendingId)}
                >
                  <Text style={styles.buttonText}>
                    {selectedSpendingId === spending.spendingId ? 'Ascunde' : 'Vezi detalii'}
                  </Text>
                </TouchableOpacity>
              </View>

              {selectedSpendingId === spending.spendingId && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailText}>
                    Data completă: {formatDate(spending.date)}
                  </Text>
                  {spending.description && (
                    <Text style={styles.detailText}>
                      Descriere: {spending.description}
                    </Text>
                  )}
                  
                  <View style={styles.productsHeader}>
                    <Text style={styles.productHeaderText}>Nume Produs</Text>
                    <Text style={styles.productHeaderText}>Categorie</Text>
                    <Text style={styles.productHeaderText}>Cantitate</Text>
                    <Text style={styles.productHeaderText}>Preț Total</Text>
                  </View>

                  {spending.products.map((product, index) => (
                    <View key={index} style={styles.productRow}>
                      <Text style={styles.productCell}>{product.itemName}</Text>
                      <Text style={styles.productCell}>{categoryMap[product.category]}</Text>
                      <Text style={styles.productCell}>{product.units}</Text>
                      <Text style={styles.productCell}>
                        {(product.pricePerUnit * product.units).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

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
  spendingRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff200',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  detailsContainer: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    marginTop: 8,
    borderRadius: 4,
  },
  detailText: {
    fontSize: 12,
    marginBottom: 8,
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e9ecef',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  productHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  productCell: {
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

export default TopSpendingsInAPeriod;