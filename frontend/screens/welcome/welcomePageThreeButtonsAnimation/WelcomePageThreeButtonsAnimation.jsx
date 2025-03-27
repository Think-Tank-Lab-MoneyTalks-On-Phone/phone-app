import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WelcomePageLayer1 from '../welcomePageLayer1/WelcomePageLayer1';
import WelcomePageLayer2 from '../welcomePageLayer2/WelcomePageLayer2';
import WelcomePageLayer3 from '../welcomePageLayer3/WelcomePageLayer3';

const WelcomePageThreeButtonsAnimation = () => {
    const [selectedLayer, setSelectedLayer] = useState(1);
    const intervalRef = useRef();

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setSelectedLayer(prev => (prev % 3) + 1);
        }, 15000);
    };

    const handleRadioChange = (layer) => {
        clearInterval(intervalRef.current);
        setSelectedLayer(layer);
        startInterval();
    };

    return (
        <View>
            {/* Conținutul layer-ului curent */}
            <View style={styles.container}>
                {selectedLayer === 1 && <WelcomePageLayer1 />}
                {selectedLayer === 2 && <WelcomePageLayer2 />}
                {selectedLayer === 3 && <WelcomePageLayer3 />}
            </View>

            {/* Butoanele de control */}
            <View style={styles.controls}>
                {[1, 2, 3].map((layer) => (
                    <TouchableOpacity
                        key={layer}
                        style={[
                            styles.radioButton,
                            selectedLayer === layer && styles.radioButtonActive
                        ]}
                        onPress={() => handleRadioChange(layer)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        left: 25,
    },
    controls: {
        bottom: 30,
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 12,
        zIndex: 500
    },
    radioButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top:350,
    },
    radioButtonActive: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
    }
});

export default WelcomePageThreeButtonsAnimation;