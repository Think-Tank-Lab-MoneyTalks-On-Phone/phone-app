import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, PanResponder, Animated } from "react-native";
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import HomeIcon from "../icons/Home_custom_icon.json";
import TutorialIcon from "../icons/Play pause_custom_icon.json";


export default function LoginRegisterMenu() {
    const navigation = useNavigation();
    const route = useRoute();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const pan = useRef(new Animated.Value(-250)).current;
    const swipeThreshold = 100;
    const minSwipeDistance = 5;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                const { dx, dy } = gestureState;
                const isHorizontal = Math.abs(dx) > Math.abs(dy * 2);

                if (!sidebarVisible) {
                    const isRightSwipe = dx > minSwipeDistance;
                    const isNearLeftEdge = gestureState.moveX < 30;
                    return isHorizontal && isRightSwipe && isNearLeftEdge;
                }
                return isHorizontal && Math.abs(dx) > minSwipeDistance;
            },
            onPanResponderMove: (_, gestureState) => {
                if (!sidebarVisible) {
                    const newX = Math.min(gestureState.dx - 250, 0);
                    pan.setValue(newX);
                } else {
                    const clampedDX = Math.min(gestureState.dx, 0);
                    pan.setValue(clampedDX);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (!sidebarVisible) {
                    if (gestureState.dx > swipeThreshold) {
                        openSidebar();
                    } else {
                        resetSidebarPosition();
                    }
                } else {
                    if (gestureState.dx < -swipeThreshold) {
                        closeSidebar();
                    } else {
                        resetSidebarPosition();
                    }
                }
            },
        })
    ).current;

    const openSidebar = () => {
        Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
        }).start(() => setSidebarVisible(true));
    };

    const closeSidebar = () => {
        Animated.spring(pan, {
            toValue: -250,
            useNativeDriver: true,
        }).start(() => setSidebarVisible(false));
    };

    const resetSidebarPosition = () => {
        Animated.spring(pan, {
            toValue: sidebarVisible ? 0 : -250,
            useNativeDriver: true,
        }).start();
    };


    const menuItems = [
        { id: "sideBarOptionWelcome", path: "Bun venit!", label: "Bun venit!", icon: HomeIcon },
        { id: "sideBarOptionAuth", path: "LoginForm", label: "Autentificare", icon: HomeIcon },
        { id: "sideBarOptionRegister", path: "Inregistrare", label: "Inregistrare", icon: TutorialIcon },
    ];
    return (
        <>
            <Animated.View
                style={[styles.sideBarContainer, { transform: [{ translateX: pan }] }]}
                {...panResponder.panHandlers}
            >
                {menuItems.map(({ id, path, label, icon }) => (
                    <TouchableOpacity
                        key={id}
                        style={[styles.menuItem, route.name === path && styles.activeMenuItem]}
                        onPress={() => {
                            navigation.navigate(path);
                            closeSidebar();
                        }}
                    >
                        <View style={styles.iconContainer}>
                            <LottieView source={icon} autoPlay loop style={styles.icon} />
                        </View>
                        <Text style={styles.menuItemText}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>

            {!sidebarVisible && (
                <View style={styles.leftEdgeDetector} {...panResponder.panHandlers} />
            )}

            {sidebarVisible && (
                <View
                    style={styles.fullScreenOverlay}
                    {...panResponder.panHandlers}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    sideBarContainer: {
        width: 250,
        padding: 20,
        backgroundColor: "white",
        flexDirection: "column",
        gap: 12,
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.09,
        shadowRadius: 15,
        elevation: 5,
    },
    menuItem: {
        fontWeight: "500",
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        gap: 12,
        borderRadius: 8,
    },
    activeMenuItem: {
        backgroundColor: "#eff6ff",
        borderColor: "#93c5fd",
        borderWidth: 1,
    },
    iconContainer: {
        width: 35,
        height: 35, // Adăugăm înălțime fixă
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 35,
        height: 35,
    },
    menuItemText: {
        fontSize: 16,
        color: "black",
    },
    leftEdgeDetector: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 30,
        backgroundColor: 'transparent',
        zIndex: 999,
    },
    fullScreenOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 998,
    },
});