import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const UploadSpending = () => {
  return (
    <View style={styles.container}>
      {/* Header - Zona de upload */}
      <View style={styles.header}>
        <Svg width={100} height={100} viewBox="0 0 24 24" fill="none">
          <Path
            d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
        <Text style={styles.headerText}>Browse File to upload!</Text>
      </View>

      {/* Footer - Buton de selectare fișier */}
      <TouchableOpacity style={styles.footer} activeOpacity={0.7}>
        <Svg width={24} height={24} viewBox="0 0 32 32">
          <Path d="M15.331 6H8.5v20h15V14.154h-8.169z" fill="royalblue" />
          <Path d="M18.153 6h-.009v5.342H23.5v-.002z" fill="royalblue" />
        </Svg>

        <Text style={styles.footerText}>Not selected file</Text>

        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
            stroke="#000"
            strokeWidth={2}
          />
          <Path d="M19.5 5H4.5" stroke="#000" strokeWidth={2} strokeLinecap="round" />
          <Path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000" strokeWidth={2} />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    bottom: 150,
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 110, 255, 0.041)',
    padding: 10,
    gap: 5,
    elevation: 5,
    transform: [{ scale: 1.15 }],
  },
  header: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'royalblue',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: 'rgba(0, 110, 255, 0.075)',
    borderRadius: 10,
    padding: 8,
    gap: 8,
  },
  footerText: {
    flex: 1,
    color: '#000',
    textAlign: 'center',
  },
});

export default UploadSpending;
