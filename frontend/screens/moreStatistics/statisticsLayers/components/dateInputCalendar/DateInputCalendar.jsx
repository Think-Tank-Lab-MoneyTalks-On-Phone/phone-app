import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInputCalendar = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartDateChange = (event, date) => {
    setShowStartPicker(false);
    if (date) {
      setStartDate(date.toISOString().split('T')[0]);
    }
  };

  const handleEndDateChange = (event, date) => {
    setShowEndPicker(false);
    if (date) {
      setEndDate(date.toISOString().split('T')[0]);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.dateButton}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={styles.buttonText}>
          {startDate ? formatDate(startDate) : 'De la data'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.dateButton}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={styles.buttonText}>
          {endDate ? formatDate(endDate) : 'Până la data'}
        </Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={startDate ? new Date(startDate) : new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          maximumDate={endDate ? new Date(endDate) : new Date()}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate ? new Date(endDate) : new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          minimumDate={startDate ? new Date(startDate) : undefined}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    margin: 25,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DateInputCalendar;
