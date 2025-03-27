import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import WelcomePageLayer1 from '../welcomePageLayer1/WelcomePageLayer1.jsx';
import WelcomePageLayer2 from '../welcomePageLayer2/WelcomePageLayer2';
import WelcomePageLayer3 from '../welcomePageLayer3/WelcomePageLayer3';

const WelcomePageThreeButtonsAnimation = () => {
    const [selectedLayer, setSelectedLayer] = useState(1);
    const intervalRef = useRef(null);
    const [animation] = useState(new Animated.Value(0));  // pentru animație

    useEffect(() => {
        startInterval();

        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setSelectedLayer(prevLayer => (prevLayer % 3) + 1);
        }, 15000);
    };

    const handleRadioChange = (layer) => {
        setSelectedLayer(layer);
        clearInterval(intervalRef.current);
        startInterval();
    };

    const animateLayerTransition = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const getLayerStyle = (layerId) => {
        return selectedLayer === layerId
            ? [styles.layer, styles.active]
            : [styles.layer, { opacity: 0 }];
    };

    return (
        <WelcomePageLayer1 />
        /*
        <View style={styles.wrapper}>
            <View style={styles.radioInputWrapper}>
                {[1, 2, 3].map((layer) => (
                    <TouchableOpacity
                        key={layer}
                        style={[styles.radioInput, selectedLayer === layer && styles.checked]}
                        onPress={() => handleRadioChange(layer)}
                    >
                        <Text style={styles.radioText}>Layer {layer}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.layerContent}>
                <View style={getLayerStyle(1)}>
                    <WelcomePageLayer1 />
                </View>
                <View style={getLayerStyle(2)}>
                    <WelcomePageLayer2 />
                </View>
                <View style={getLayerStyle(3)}>
                    <WelcomePageLayer3 />
                </View>
            </View>
        </View>
        */
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '97%',
        overflow: 'hidden',
    },
    radioInputWrapper: {
        flexDirection: 'row',
        gap: 10,
        position: 'absolute',
        bottom: 200,
        zIndex: 10,
        left: '46%',
    },
    radioInput: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        boxShadow: '0 1px 1px rgba(255, 255, 255, 0.15), inset 0 0 0 1px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'hsla(0,0%,0%,.2)',
        backgroundImage: 'radial-gradient(hsla(200,100%,90%,1) 0%, hsla(200,100%,70%,1) 15%, hsla(200,100%,60%,.3) 28%, hsla(200,100%,30%,0) 70%)',
        transition: 'background-position .15s cubic-bezier(.8, 0, 1, 1)',
    },
    checked: {
        backgroundPosition: '0 0',
    },
    radioText: {
        fontSize: 16,
        textAlign: 'center',
    },
    layerContent: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    layer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        transition: 'opacity 2s ease-in-out, transform 1s ease-in-out',
        transform: 'translateX(-100%)',
    },
    active: {
        opacity: 1,
        transform: 'translateX(0)',
    },
});

export default WelcomePageThreeButtonsAnimation;
