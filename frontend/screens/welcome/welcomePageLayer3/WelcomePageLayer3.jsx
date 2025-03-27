import React from 'react';
import WelcomePageLayer3Logo from "./welcomePageLayer3Logo/WelcomePageLayer3Logo";
import WelcomePageLayer3Image from "./welcomePageLayer3Image/WelcomePageLayer3Image";
import WelcomePageLayer3Image2 from "./welcomePageLayer3Image2/WelcomePageLayer3Image2";
import WelcomePageLayer3Writing from "./welcomePageLayer3Writing/WelcomePageLayer3Writing";
import RaiffeisenLogoImage from "./raiffeisenLogoImage/RaiffeisenLogoImage";
import CsUBBLogoImage from "./csUBBLogoImage/CsUBBLogoImage.jsx";
import { View, StyleSheet } from "react-native";

export default function WelcomePageLayer3() {
    return (
        <View>
            <WelcomePageLayer3Logo />
            <WelcomePageLayer3Image />
            <WelcomePageLayer3Writing />
            <WelcomePageLayer3Image2 />
            <RaiffeisenLogoImage />
            <CsUBBLogoImage />
        </View>
    );
}
