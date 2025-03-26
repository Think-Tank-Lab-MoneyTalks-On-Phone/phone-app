import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const TheRatingUploadSpentCards = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Nota AI pentru gestionare buget */}
                <View style={[styles.statBox, styles.firstCard]}>
                    <Text style={styles.title}>Nota AI pentru gestionare buget</Text>
                    <View style={styles.bottomSection}>
                        <Svg width={24} height={24} viewBox="0 0 24 24">
                            <Path d="M17.56 21a1 1 0 0 1-.46-.11L12 18.22l-5.1 2.67a1 1 0 0 1-1.45-1.06l1-5.63-4.12-4a1 1 0 0 1-.25-1 1 1 0 0 1 .81-.68l5.7-.83 2.51-5.13a1 1 0 0 1 1.8 0l2.54 5.12 5.7.83a1 1 0 0 1 .81.68 1 1 0 0 1-.25 1l-4.12 4 1 5.63a1 1 0 0 1-.4 1 1 1 0 0 1-.62.18z" fill="gold" />
                        </Svg>
                        <ImageBackground
                            style={styles.firstCardImage}
                            source={require('../../../assets/img-card1.png')}
                        />
                        <Text style={styles.value}>0/10</Text>
                    </View>
                </View>

                {/* Bonuri incarcate */}
                <View style={[styles.statBox, styles.secondCard]}>
                <ImageBackground
                            style={[styles.secondCardImage, styles.card]}
                            source={require('../../../assets/img-card2.png')}
                        />
                    <Text style={styles.title}>Bonuri incarcate (30 zile)</Text>
                    <View style={styles.bottomSection}>
                        <Svg width={27} height={27} viewBox="0 0 24 24">
                            <Path d="M2 10h4v12H2zM22 11a3 3 0 0 0-3-3h-5.68l.93-4.42.02-.18a1.5 1.5 0 0 0-.44-1.06L13 2l-6.29 6.29a1 1 0 0 0-.29.71V19a2 2 0 0 0 2 2h7.35a3 3 0 0 0 2.82-2.06l2.26-7.26A2.85 2.85 0 0 0 22 11z" fill="blueviolet" />
                        </Svg>
                        
                        <Text style={styles.value}>0</Text>
                    </View>
                </View>

                {/* Bani cheltuiti */}
                <View style={[styles.statBox, styles.thirdCard]}>
                    <Text style={styles.title}>Bani cheltuiti (Martie)</Text>
                    <View style={styles.bottomSection}>
                        <Svg width={24} height={24} viewBox="0 0 512 512">
                            <Path d="M448 183.8v-123A44.66 44.66 0 00403.29 16H280.36a30.62 30.62 0 00-21.51 8.89L13.09 270.58a44.86 44.86 0 000 63.34l117 117a44.84 44.84 0 0063.33 0l245.69-245.61A30.6 30.6 0 00448 183.8zM352 144a32 32 0 1132-32 32 32 0 01-32 32z" fill="black" />
                        </Svg>
                        <ImageBackground
                            style={styles.thirdCardImage}
                            source={require('../../../assets/img-card3.png')}
                        />
                        <Text style={styles.value}>0 RON</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 0,
        right: 0,
    },
    card: {
        flexDirection: 'colomn',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
    },
    statBox: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: 175,
        height: 100,
        transform: [{ scale: 1.5 }],
        borderRadius: 20,
        padding: 15,
        backgroundColor: '#f1f1f1',
        marginBottom: 10,
        overflow: 'hidden',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
        position: 'relative',
        top: -10,
    },
    bottomSection: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 10,
    },
    value: {
        fontSize: 18,
        fontWeight: '700',
    },
    firstCardImage: {
        position: 'absolute', 
        top: -15,
        left: 45,
        right: 0,
        bottom: 0,
        borderRadius: 20,
        width: 45,
        height: 45,
        resizeMode: 'cover', 
    },
    secondCardImage: {
        position: 'absolute', 
        top: -50,
        left: -30,
        right: 0,
        bottom: 0,
        borderRadius:20,
        width: 250,
        height: 250,
        resizeMode: 'cover', 
    },
    thirdCardImage: {
        position: 'absolute', 
        top: -60,
        left: 105,
        right: 0,
        bottom: 0,
        borderRadius: 20,
        width: 55,
        height: 55,
        resizeMode: 'cover', 
    },
});

export default TheRatingUploadSpentCards;
