import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import WelcomePageLayer1 from '../welcomePageLayer1/WelcomePageLayer1';
import WelcomePageLayer2 from '../welcomePageLayer2/WelcomePageLayer2';
import WelcomePageLayer3 from '../welcomePageLayer3/WelcomePageLayer3';

const WelcomePageThreeButtonsAnimation = () => {
    const [selectedLayer, setSelectedLayer] = useState(1);

    const fadeAnim1 = useRef(new Animated.Value(1)).current; 
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const fadeAnim3 = useRef(new Animated.Value(0)).current;

    const intervalRef = useRef();

    useEffect(() => {
        startInterval();
        return () => clearInterval(intervalRef.current);
    }, []);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            changeLayer((selectedLayer % 3) + 1);
        }, 15000);
    };

    const changeLayer = (nextLayer) => {
        if (nextLayer === 1) {
            Animated.sequence([
                Animated.timing(fadeAnim2, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim3, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim1, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else if (nextLayer === 2) {
            Animated.sequence([
                Animated.timing(fadeAnim1, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim3, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim2, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else if (nextLayer === 3) {
            Animated.sequence([
                Animated.timing(fadeAnim1, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim2, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim3, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        setSelectedLayer(nextLayer);
    };

    const handleRadioChange = (layer) => {
        clearInterval(intervalRef.current);
        changeLayer(layer);
        startInterval();
    };

    return (
        <View>
            {/* Layer 1 */}
            <Animated.View style={[styles.container, { opacity: fadeAnim1 }]}>
                {selectedLayer === 1 && <WelcomePageLayer1 />}
            </Animated.View>

            {/* Layer 2 */}
            <Animated.View style={[styles.container, { opacity: fadeAnim2 }]}>
                {selectedLayer === 2 && <WelcomePageLayer2 />}
            </Animated.View>

            {/* Layer 3 */}
            <Animated.View style={[styles.container, { opacity: fadeAnim3 }]}>
                {selectedLayer === 3 && <WelcomePageLayer3 />}
            </Animated.View>

            {/* Control buttons */}
            <View style={styles.controls}>
                {[1, 2, 3].map((layer) => (
                    <TouchableOpacity
                        key={layer}
                        style={[
                            styles.radioButton,
                            selectedLayer === layer && styles.radioButtonActive,
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
        zIndex: 500,
    },
    radioButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 350,
    },
    radioButtonActive: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
    },
});

export default WelcomePageThreeButtonsAnimation;
