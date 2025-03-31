import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateInputCalendar from '../components/dateInputCalendar/DateInputCalendar';

const TopShopsAttended = ({ userSpendings, startDate, setStartDate, endDate, setEndDate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredSpendings = userSpendings.filter(spending => {
        const spendingDate = new Date(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    });

    const shopFrequency = useMemo(() => {
        const frequency = {};
        filteredSpendings.forEach(spending => {
            const shopName = spending.companyName;
            if (frequency[shopName]) {
                frequency[shopName].count += 1;
                frequency[shopName].totalPrice += spending.totalPrice;
                frequency[shopName].totalItems += spending.products.reduce((sum, product) => sum + product.units, 0);
            } else {
                frequency[shopName] = {
                    count: 1,
                    totalPrice: spending.totalPrice,
                    totalItems: spending.products.reduce((sum, product) => sum + product.units, 0),
                };
            }
        });

        return Object.keys(frequency)
            .map(key => ({
                name: key,
                count: frequency[key].count,
                totalPrice: frequency[key].totalPrice,
                totalItems: frequency[key].totalItems,
            }))
            .sort((a, b) => b.totalPrice - a.totalPrice);
    }, [filteredSpendings]);

    const totalPages = Math.ceil(shopFrequency.length / itemsPerPage);
    const indexOfLastShop = currentPage * itemsPerPage;
    const indexOfFirstShop = indexOfLastShop - itemsPerPage;
    const currentShops = shopFrequency.slice(indexOfFirstShop, indexOfLastShop);

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return (
        <ScrollView style={styles.container}>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            {(!startDate || !endDate) ? (
                <Text style={styles.message}>Selectează un interval de date pentru a vedea topul magazinelor frecventate.</Text>
            ) : filteredSpendings.length === 0 ? (
                <Text style={styles.message}>Nu există cheltuieli în această perioadă.</Text>
            ) : (
                <View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.headerText}>Magazin</Text>
                        <Text style={styles.headerText}>Nr. Cheltuieli</Text>
                        <Text style={styles.headerText}>Preț Total</Text>
                        <Text style={styles.headerText}>Nr. Produse</Text>
                    </View>

                    {currentShops.map((shop, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.cell}>{shop.name}</Text>
                            <Text style={styles.cell}>{shop.count}</Text>
                            <Text style={styles.cell}>{shop.totalPrice.toFixed(2)}</Text>
                            <Text style={styles.cell}>{shop.totalItems}</Text>
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

                        <Text style={styles.paginationInfo}>Pagina {currentPage} din {totalPages}</Text>

                        <TouchableOpacity
                            style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
                            onPress={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.paginationText}>Pagina următoare ➡</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
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

export default TopShopsAttended;