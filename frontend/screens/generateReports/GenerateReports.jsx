import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import ScreensBackground from '../components/screens-background/ScreensBackground';
import SideBar from '../components/sideBar/SideBar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const GenerateReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportContent, setReportContent] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('auth');
        if (!storedData) return;

        const { email, password } = JSON.parse(storedData);
        setEmail(email);
        setPassword(password);
        setIsLoading(true);

        const userResponse = await axios.get(`http://10.0.2.2:8080/users/byEmail/${email}`, {
          headers: { "Content-Type": "application/json" },
          auth: { username: email, password },
        });

        if (userResponse.data?.id) {
          setUserId(userResponse.data.id);
        }
      } catch (error) {
        console.error('Eroare la preluarea userului:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleGenerateReport = async (reportType) => {
    if (!userId) {
      Alert.alert('Eroare', 'User ID nu este setat!');
      return;
    }

    setIsLoading(true);
    setSelectedReport(reportType);

    try {
      const credentials = btoa(`${email}:${password}`);
      const headers = { Authorization: `Basic ${credentials}`, "Content-Type": "application/json" };

      const response = await axios.post(
        `http://10.0.2.2:8080/api/report/${reportType === 'custom' ? 'custom' : reportType}/${userId}`,
        reportType === 'custom' ? { description: customInput } : {},
        { headers }
      );

      setReportContent(processReportContent(response.data.response));
    } catch (error) {
      console.error('Eroare la generarea raportului:', error);
      setReportContent('Eroare la conexiunea cu serverul');
    }
    setIsLoading(false);
  };

  const processReportContent = (content) => {
    if (!content) return 'Raportul nu conține date.';
    return content
      .replace(/\$\$?[\s\S]+?\$\$?/g, '')
      .replace(/\\text{.*?}/g, '')
      .replace(/\*\*/g, '')
      .replace(/###|####/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
      .split('\n\n')
      .map(p => p.trim());
  };

  return (
    <>
      <ScreensBackground />
      <SideBar />
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
          <View style={styles.reportResults}>
            <ScrollView
              style={styles.reportContentBox}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                Array.isArray(reportContent) ? (
                  reportContent.map((paragraph, index) => (
                    <View key={index} style={{ marginBottom: 24 }}>
                      {paragraph.split('\n').map((line, lineIndex, arr) => (
                        <React.Fragment key={lineIndex}>
                          <Text>{line}</Text>
                          {lineIndex !== arr.length - 1 && <Text>{'\n'}</Text>}
                          {line.trim().endsWith('.') && <View style={{ height: 12 }} />}
                        </React.Fragment>
                      ))}
                    </View>
                  ))
                ) : (
                  <Text>{reportContent}</Text>
                )
              )}

              { !isLoading &&
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  setSelectedReport(null);
                  setReportContent('');
                  setCustomInput('');
                }}
              >
                <Text style={styles.buttonText}>← Înapoi la Rapoarte</Text>
              </TouchableOpacity>
              }


            </ScrollView>
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
