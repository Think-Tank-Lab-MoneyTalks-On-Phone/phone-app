import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const ViewAllSpendingsTable = ({ spendings, onSpendingDeleted }) => {
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

    const [selectedSpendingId, setSelectedSpendingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const itemsPerPage = 15;
    const currentDate = new Date().toISOString().split('T')[0];

    const minEndDate = startDate
        ? new Date(new Date(startDate).getTime() + 86400000).toISOString().split('T')[0]
        : "";

    const filterByPrice = (spending) => {
        if (!minPrice && !maxPrice) return true;
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        return spending.totalPrice >= min && spending.totalPrice <= max;
    };

    const filterByCompany = (spending) => {
        if (!selectedCompany) return true;
        return spending.companyName === selectedCompany;
    };

    const parseEuropeanDate = (dateString) => {
        return new Date(dateString);
    };

    const filterByDate = (spending) => {
        if (!startDate && !endDate) return true;

        const purchaseDate = parseEuropeanDate(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);

        if (start && end) return purchaseDate >= start && purchaseDate <= end;
        if (start) return purchaseDate >= start;
        if (end) return purchaseDate <= end;
        return true;
    };

    const filteredSpendings = (spendings?.filter(spending =>
        filterByPrice(spending) &&
        filterByCompany(spending) &&
        filterByDate(spending)
    ) || [])
        .sort((a, b) => {
            const dateA = parseEuropeanDate(a.date);
            const dateB = parseEuropeanDate(b.date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

    useEffect(() => {
        setCurrentPage(1);
    }, [minPrice, maxPrice, selectedCompany, startDate, endDate, sortOrder]);

    const totalPages = Math.ceil(filteredSpendings.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpendings = filteredSpendings.slice(indexOfFirstItem, indexOfLastItem);

    const companies = [...new Set(spendings?.map(s => s.companyName) || [])];

    const goToNextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
    const goToPreviousPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

    const handleDelete = async (spendingId) => {
        const storedData = localStorage.getItem("auth");
        if (!storedData) return;

        const { email, password } = JSON.parse(storedData);
        try {
            const userEmail = email;

            const response = await axios.delete(`http://10.0.2.2:8080/spending/${spendingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: email,
                    password: password,
                }
            });

            Toast.show({
                type: 'success',
                text1: 'Șters cu succes!',
                text2: 'Cheltuiala a fost ștearsă cu succes!',
                visibilityTime: 2000
            });
            onSpendingDeleted();
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleDetails = (spendingId) => {
        setSelectedSpendingId(prev => prev === spendingId ? null : spendingId);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.row}
                onPress={() => handleToggleDetails(item.spendingId)}
            >
                <Text style={styles.cell}>{item.companyName}</Text>
                <Text style={styles.cell}>{item.products.length}</Text>
                <Text style={styles.cell}>{item.totalPrice.toFixed(2)}</Text>
                <Text style={styles.cell}>
                    {parseEuropeanDate(item.date).toLocaleDateString('ro-RO')}{'\n'}
                    {parseEuropeanDate(item.date).toLocaleTimeString('ro-RO')}
                </Text>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => handleToggleDetails(item.spendingId)}
                >
                    <Text style={styles.buttonText}>
                        {selectedSpendingId === item.spendingId ? 'Ascunde' : 'Detalii'}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>

            {selectedSpendingId === item.spendingId && (
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>
                        {`Achiziție făcută la ${parseEuropeanDate(item.date).toLocaleDateString('ro-RO')}, ora ${parseEuropeanDate(item.date).toLocaleTimeString('ro-RO')}`}
                    </Text>
                    {item.description && (
                        <Text style={styles.detailsText}>Descriere: {item.description}</Text>
                    )}
                    <Text style={styles.subHeader}>Produse:</Text>
                    {item.products.map((product, index) => (
                        <View key={index} style={styles.productRow}>
                            <Text style={styles.productCell}>{product.itemName}</Text>
                            <Text style={styles.productCell}>{categoryMap[product.category]}</Text>
                            <Text style={styles.productCell}>{product.units}</Text>
                            <Text style={styles.productCell}>{(product.pricePerUnit * product.units).toFixed(2)}</Text>
                        </View>
                    ))}
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDelete(item.spendingId)}
                    >
                        <Text style={styles.deleteButtonText}>Șterge Cheltuiala</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    if (!spendings || !Array.isArray(spendings) || spendings.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    Nu există cheltuieli de afișat.{'\n'}
                    Scanează bonuri, facturi, sau încarcă manual o cheltuială online pentru a începe!
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Filtre - Folosim ScrollView separat cu orientare orizontală */}
            {/* Filtre */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersScrollContainer}
            >
                <View style={styles.filtersContainer}>
                    {/* Rândul cu prețuri */}
                    <View style={styles.filterRow}>
                        <View style={styles.filterGroup}>
                            <Text>Preț minim:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={minPrice}
                                onChangeText={setMinPrice}
                                placeholder="Preț minim"
                            />
                        </View>

                        <View style={styles.filterGroup}>
                            <Text>Preț maxim:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={maxPrice}
                                onChangeText={setMaxPrice}
                                placeholder="Preț maxim"
                            />
                        </View>
                    </View>

                    {/* Rândul cu date */}
                    <View style={styles.filterRow}>
                        <View style={styles.filterGroup}>
                            <Text>De la:</Text>
                            <TextInput
                                style={styles.input}
                                value={startDate}
                                onChangeText={setStartDate}
                                placeholder="YYYY-MM-DD"
                            />
                        </View>

                        <View style={styles.filterGroup}>
                            <Text>Până la:</Text>
                            <TextInput
                                style={styles.input}
                                value={endDate}
                                onChangeText={setEndDate}
                                placeholder="YYYY-MM-DD"
                            />
                        </View>
                    </View>

                    {/* Rândul cu companie și sortare */}
                    <View style={styles.companyRow}>
                        <View style={{ flex: 1 }}>
                            <Text>Companie:</Text>
                            <View style={styles.companyInput}>
                                <Picker
                                    selectedValue={selectedCompany}
                                    style={styles.picker}
                                    onValueChange={setSelectedCompany}
                                >
                                    <Picker.Item label="Toate companiile" value="" />
                                    {companies.map(company => (
                                        <Picker.Item key={company} label={company} value={company} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.sortButton}
                            onPress={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                        >
                            <Text style={styles.sortButtonText}>
                                Sortare ({sortOrder === 'desc' ? '↓' : '↑'})
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Antet tabel */}
            <View style={styles.header}>
                <Text style={styles.headerCell}>Companie</Text>
                <Text style={styles.headerCell}>Produse</Text>
                <Text style={styles.headerCell}>Preț</Text>
                <Text style={styles.headerCell}>Dată</Text>
                <Text style={styles.headerCell}>Acțiuni</Text>
            </View>

            {/* Lista principală cu dimensiune fixă */}
            <View style={styles.listContainer}>
                <FlatList
                    data={currentSpendings}
                    renderItem={renderItem}
                    keyExtractor={item => item.spendingId.toString()}
                    contentContainerStyle={styles.listContent}
                    ListFooterComponent={
                        <View style={styles.pagination}>
                            <TouchableOpacity
                                style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
                                onPress={goToPreviousPage}
                                disabled={currentPage === 1}
                            >
                                <Text>⬅</Text>
                            </TouchableOpacity>

                            <Text style={styles.pageText}>{currentPage}/{totalPages}</Text>

                            <TouchableOpacity
                                style={[styles.pageButton, currentPage === totalPages && styles.disabledButton]}
                                onPress={goToNextPage}
                                disabled={currentPage === totalPages}
                            >
                                <Text>➡</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    removeClippedSubviews
                    windowSize={5}
                />
            </View>

            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    filtersScrollContainer: {
        paddingBottom: 15,
        justifyContent: 'center',
    },
    filtersContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        width: '100%',
        left: 10,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    filterGroup: {
        width: '30%',
        marginRight: 45,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        fontSize: 14,
        width: '150%',
    },
    companyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '105%',
        marginTop: 12,
        left: 8,
    },
    companyInput: {
        right: 25, 
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        overflow: 'hidden',
        transform: [{scale: 0.75}],
    },
    picker: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 25,
        marginRight: 12,
    },
    sortButton: {
        backgroundColor: '#fff200',
        padding: 10,
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        top: 12,
        right: 16,
    },
    sortButtonText: {
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#fff200',
        padding: 12,
        marginVertical: 8,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,
    },
    detailsButton: {
        backgroundColor: '#fff200',
        padding: 6,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    buttonText: {
        fontSize: 12,
    },
    detailsContainer: {
        padding: 12,
        backgroundColor: '#f8f9fa',
        marginTop: 8,
    },
    detailsText: {
        fontSize: 12,
        marginBottom: 4,
    },
    subHeader: {
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 4,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    productCell: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
    },
    deleteButton: {
        backgroundColor: '#d65353',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 12,
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    pageButton: {
        backgroundColor: '#fff200',
        padding: 10,
        borderRadius: 4,
        marginHorizontal: 8,
    },
    disabledButton: {
        backgroundColor: '#e6e6e6',
    },
    pageText: {
        marginHorizontal: 12,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 16,
    },
});

export default ViewAllSpendingsTable;