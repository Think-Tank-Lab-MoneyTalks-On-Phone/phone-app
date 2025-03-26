import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import ScreensBackground from '../components/screens-background/ScreensBackground';
import SideBar from '../components/sideBar/SideBar';

const GenerateReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportContent, setReportContent] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      setReportContent(`Raport generat pentru: ${type}`);
      setSelectedReport(type);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <ScreensBackground />
      <SideBar/>
      <View style={styles.container}>
        {!selectedReport ? (
          <ScrollView>
            <View style={styles.grid}>
              {['Buget vs Cheltuieli', 'Abonamente', 'Economii Potențiale', 'Cheltuieli Impulsive', 'Investitii', 'Cheltuieli Necesare vs Lux'].map((item, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleGenerateReport(item)}>
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.customInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Introduceți cerința pentru raport personalizat..."
                value={customInput}
                onChangeText={setCustomInput}
              />
              <TouchableOpacity
                style={[styles.button, !customInput.trim() && styles.disabledButton]}
                onPress={() => handleGenerateReport('Custom')}
                disabled={!customInput.trim()}
              >
                <Text style={styles.buttonText}>Generează raport</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.reportContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#FFD700" />
            ) : (
              <Text style={styles.reportText}>{reportContent}</Text>
            )}
            {!isLoading && (
              <TouchableOpacity style={styles.backButton} onPress={() => setSelectedReport(null)}>
                <Text style={styles.buttonText}>Înapoi</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  grid: {
    flexDirection: 'colomn',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    height: 60,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  customInputContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#f7f2a3',
  },
  reportContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  reportText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
  },
});

export default GenerateReports;
