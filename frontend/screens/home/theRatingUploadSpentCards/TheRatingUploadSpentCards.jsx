import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import SpendingsLimit from './spendingsLimit/SpendingsLimit';

const TheRatingUploadSpentCards = ({ lastThirtyDaysSpendingsSum, uploadedBillsOnThePastThirtyDays }) => {
    const [userId, setUserId] = useState(null);
    const [myUserEmail, setMyUserEmail] = useState(null);
    const [myUserPassword, setMyUserPassword] = useState(null);
    const [myUserSpendingsLimits, setMyUserSpendingsLimits] = useState(null);
    const [thisMonthSpendingLimit, setThisMonthSpendingLimit] = useState(0);
    const [limitSet, setLimitSet] = useState(false);
    const [aiRating, setAiRating] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("auth");
                if (!storedData) return;

                const { email, password } = JSON.parse(storedData);
                const userResponse = await axios.get(`http://10.0.2.2:8080/users/byEmail/${email}`, {
                    headers: { 'Content-Type': 'application/json' },
                    auth: { username: email, password: password }
                });

                setUserId(userResponse.data.id);
                setMyUserEmail(email);
                setMyUserPassword(password);
                setMyUserSpendingsLimits(userResponse.data.spendingLimits);

                const currentMonth = new Date().getMonth();
                const currentMonthLimit = userResponse.data.spendingLimits.find(limit =>
                    new Date(limit.startDate).getMonth() === currentMonth
                );

                setThisMonthSpendingLimit(currentMonthLimit ? currentMonthLimit.spendingLimit : 0);
            } catch (error) {
                console.error("Eroare la preluarea userului:", error);
            }
        };

        fetchUserData();
    }, [limitSet]);

    const sendSpendingLimitToBackend = async (limit) => {
        const today = new Date();
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const spendingLimitData = {
            spendingLimit: limit,
            startDate: today.toISOString().split('T')[0],
            endDate: endOfMonth.toISOString().split('T')[0],
            userId: userId
        };

        try {
            const response = await axios.post("http://10.0.2.2:8080/spendingLimits", spendingLimitData, {
                headers: { "Content-Type": "application/json" },
                auth: { username: myUserEmail, password: myUserPassword }
            });

            if (response.status === 200 || response.status === 201) {
                ToastAndroid.show("Limita de cheltuieli setată cu succes!", ToastAndroid.SHORT);
                setLimitSet(true);
            }
        } catch (error) {
            console.error("Failed to set spending limit:", error.response?.data || error.message);
        }
    };

    const handleGenerateReport = async (retryCount = 0) => {
        if (!userId) {
            console.error("User ID-ul nu este setat!");
            return;
        }

        try {
            const credentials = btoa(`${myUserEmail}:${myUserPassword}`);
            const headers = { Authorization: `Basic ${credentials}`, "Content-Type": "application/json" };

            const response = await axios.post(`http://10.0.2.2:8080/api/report/nota_ai/${userId}`, {}, { headers });

            const aiScore = response.data.response;
            if (!isNaN(Number(aiScore))) {
                setAiRating(aiScore);
                await AsyncStorage.setItem('aiRating', aiScore.toString());
                await AsyncStorage.setItem('lastReportExecution', new Date().getTime().toString());
            } else if (retryCount < 3) {
                setTimeout(() => handleGenerateReport(retryCount + 1), 2000);
            } else {
                setAiRating("0");
                await AsyncStorage.setItem('aiRating', "0");
            }
        } catch (error) {
            console.error("Eroare la generarea raportului:", error);
            setAiRating("0");
            await AsyncStorage.setItem('aiRating', "0");
        }
    };

    const hasSpendingLimitForCurrentMonth = myUserSpendingsLimits?.some(limit => {
        const currentMonth = new Date().getMonth();
        const limitMonth = new Date(limit.startDate).getMonth();
        return currentMonth === limitMonth;
    });

    const getWarningIconColor = () => {
        if (thisMonthSpendingLimit === 0) return 'green';

        const percentageSpent = (lastThirtyDaysSpendingsSum / thisMonthSpendingLimit) * 100;

        let red, green;

        if (percentageSpent < 80) {
            red = Math.min(255, Math.round((percentageSpent / 85) * 200));
            green = 255;
        } else {
            red = 255;
            green = Math.max(0, Math.round(255 - ((percentageSpent - 85) / 15) * 255));
        }

        return `rgb(${red}, ${green}, 0)`;
    };


    useEffect(() => {
        const checkReportExecution = async () => {
            if (userId) {
                const lastExecution = await AsyncStorage.getItem('lastReportExecution');
                const now = new Date().getTime();

                if (!lastExecution || now - parseInt(lastExecution) > 12 * 60 * 60 * 1000) {
                    handleGenerateReport();
                }
            }
        };
        checkReportExecution();
    }, [userId]);

    const storedAiRating = AsyncStorage.getItem('aiRating') || "0";


    return (
        <>
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
                            <Text style={styles.value}>{storedAiRating}/10</Text>
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

                            <Text style={styles.value}>{uploadedBillsOnThePastThirtyDays === undefined ? '0' : uploadedBillsOnThePastThirtyDays}</Text>
                        </View>
                    </View>

                    {/* Bani cheltuiti */}
                    <View style={[styles.statBox, styles.thirdCard]}>
                        <Text style={styles.title}>Bani cheltuiti (Martie)</Text>
                        <View style={styles.bottomSection}>
                            <Svg width={24} height={24} viewBox="0 0 512 512">
                                <Path d="M448 183.8v-123A44.66 44.66 0 00403.29 16H280.36a30.62 30.62 0 00-21.51 8.89L13.09 270.58a44.86 44.86 0 000 63.34l117 117a44.84 44.84 0 0063.33 0l245.69-245.61A30.6 30.6 0 00448 183.8zM352 144a32 32 0 1132-32 32 32 0 01-32 32z" fill="rgb(68, 255, 0)" />
                            </Svg>
                            <ImageBackground
                                style={styles.thirdCardImage}
                                source={require('../../../assets/img-card3.png')}
                            />
                            <Svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                style={{ fill: getWarningIconColor(), transition: 'fill 0.3s ease', top: -25, right: 23 }}
                            >
                                <Path d="M256 32L20 464h472L256 32zM256 176c10.7 0 19.6 8.6 19.6 19.2V320c0 10.6-8.9 19.2-19.6 19.2s-19.6-8.6-19.6-19.2V195.2c0-10.6 8.9-19.2 19.6-19.2zm0 192c14.2 0 25.6 11.4 25.6 25.6s-11.4 25.6-25.6 25.6-25.6-11.4-25.6-25.6 11.4-25.6 25.6-25.6z" />
                            </Svg>
                            <Text style={styles.value}>
                                {lastThirtyDaysSpendingsSum === (undefined) ? '0' : lastThirtyDaysSpendingsSum} RON
                            </Text>
                            <Text style={styles.moneyLimit}>
                                {myUserSpendingsLimits && myUserSpendingsLimits.length > 0
                                    ? `${myUserSpendingsLimits[0].spendingLimit} RON`
                                    : '0 RON'}
                            </Text>

                        </View>
                    </View>
                </View>
            </View>
            {!hasSpendingLimitForCurrentMonth && (<SpendingsLimit onLimitaConfirm={sendSpendingLimitToBackend} />)}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 65,
        right: 4,
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
        borderRadius: 20,
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
    moneyLimit: {
        position: 'relative',
        bottom: 25,
        left: -78,
        fontSize: 17,
        fontWeight: '700',
    },
});

export default TheRatingUploadSpentCards;