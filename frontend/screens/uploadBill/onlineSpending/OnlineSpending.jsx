import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spendingCategories } from './SpendingCategories';
import { Picker } from '@react-native-picker/picker';

const API_BASE_URL = 'http://10.0.2.2:8080';

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

const OnlineSpending = () => {
    const [companyName, setCompanyName] = useState('');
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([{ itemName: '', pricePerUnit: '', units: '', category: '' }]);
    const [inputGroups, setInputGroups] = useState([]);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleAddItem = () => {
        if (inputGroups.length < 10) {
            const newId = Date.now();
            setInputGroups([...inputGroups, newId]);
            setItems([...items, { id: newId, itemName: '', units: '', pricePerUnit: '', category: '' }]);
        }
    };

    const handleItemChange = (id, field, value) => {
        const updatedItems = items.map(item =>
            item.id === id
                ? {
                    ...item,
                    [field]: field === "pricePerUnit" || field === "units"
                        ? value === "" ? 0 : Number(value)
                        : value
                }
                : item
        );
        setItems(updatedItems);
    };


    const handleSubmit = async () => {
        if (!companyName || !date || !description || items.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Eroare',
                text2: 'Toate câmpurile trebuie completate!',
                visibilityTime: 5000
            });
            return;
        }

        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const now = new Date();
        const fullDateTime = `${formattedDate}T${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`;
        const formattedItems = items
            .filter(item =>
                item.itemName.trim() !== "" &&
                item.category.trim() !== "" &&
                !isNaN(item.pricePerUnit) &&
                !isNaN(item.units)
            )
            .map(item => ({
                itemName: item.itemName,
                pricePerUnit: Number(item.pricePerUnit),
                units: Number(item.units),
                category: item.category
            }));


        const totalPrice = formattedItems.reduce((sum, item) => sum + (item.pricePerUnit * item.units), 0);

        try {
            const storedData = await AsyncStorage.getItem("auth");
            if (!storedData) return;
            const { email, password } = JSON.parse(storedData);

            const userResponse = await axios.get(`${API_BASE_URL}/users/byEmail/${email}`, {
                headers: { 'Content-Type': 'application/json' },
                auth: { username: email, password }
            });

            const userId = userResponse.data.id;

            /*
            console.log("Datele trimise:", {
                userId: userId,
                companyName: companyName,
                totalPrice: totalPrice,
                date: fullDateTime,
                products: formattedItems,
                description: description
            });
            */

            const response = await axios.post(`${API_BASE_URL}/spending`, {
                userId: userId,
                companyName: companyName,
                totalPrice: totalPrice,
                date: fullDateTime,
                products: formattedItems,
                description: description
            }, {
                headers: { 'Content-Type': 'application/json' },
                auth: { username: email, password }
            });

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Succes',
                    text2: 'Cheltuiala înregistrată!',
                    visibilityTime: 2000
                });
            }
        } catch (error) {
            console.error('Eroare:', error);
            Toast.show({
                type: 'error',
                text1: 'Eroare',
                text2: error.response?.data || error.message
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>Adăugare manuală a cheltuielilor</Text>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Numele companiei"
                    placeholderTextColor="#666"
                    value={companyName}
                    onChangeText={setCompanyName}
                />

                <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={styles.dateText}>
                        {date ? date.toLocaleDateString('ro-RO') : 'Selectează data'}
                    </Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={date || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                        locale="ro-RO"
                    />
                )}
            </View>

            <View style={styles.section}>

                {inputGroups.map(id => (
                    <View key={id} style={styles.itemRow}>
                        <TextInput
                            style={[styles.itemInput, { width: '30%' }]}
                            placeholder="Nume produs"
                            onChangeText={(text) => handleItemChange(id, 'itemName', text)}
                        />
                        <TextInput
                            style={[styles.itemInput, { width: '20%' }]}
                            placeholder="Cantitate"
                            keyboardType="numeric"
                            onChangeText={(text) => handleItemChange(id, 'units', text)}
                        />
                        <TextInput
                            style={[styles.itemInput, { width: '20%' }]}
                            placeholder="Pret/unitate"
                            keyboardType="numeric"
                            onChangeText={(text) => handleItemChange(id, 'pricePerUnit', text)}
                        />
                        <Picker
                            style={[styles.itemInput, { width: '25%' }]}
                            onValueChange={(value) => handleItemChange(id, 'category', value)}>
                            <Picker.Item label="Categorie" value="" />
                            {spendingCategories.map((category) => (
                                <Picker.Item
                                    key={category}
                                    label={categoryMap[category]}
                                    value={category}
                                />
                            ))}
                        </Picker>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddItem}
                    disabled={inputGroups.length >= 10}
                >
                    <Text style={styles.addButtonText}>Adaugă produs</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.descriptionContainer}>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Scrie o scurtă descriere..."
                    placeholderTextColor="#888"
                    multiline
                    numberOfLines={3}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>Încarcă cheltuiala</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    card: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#FFF',
        fontSize: 16
    },
    dateInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#FFF',
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 16,
        color: '#666'
    },
    section: {
        marginBottom: 25
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#2D3436',
        textAlign: "center",

    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    itemInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 6,
        paddingHorizontal: 10,
        backgroundColor: '#FFF'
    },
    addButton: {
        backgroundColor: '#FFF9E1',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#FFE484'
    },
    addButtonText: {
        color: '#CCA000',
        fontWeight: '600'
    },
    descriptionContainer: {
        marginBottom: 25
    },
    descriptionInput: {
        height: 100,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 15,
        textAlignVertical: 'top',
        backgroundColor: '#FFF'
    },
    submitButton: {
        backgroundColor: '#FFD700',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 30
    },
    submitButtonText: {
        fontWeight: '700',
        color: '#2D3436',
        fontSize: 16
    }
});

export default OnlineSpending;